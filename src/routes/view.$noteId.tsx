import Main from '#/components/layout/main'
import { Navbar } from '#/components/navbar'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { useDeleteStore } from '#/stores/delete-store'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { MoveLeft } from 'lucide-react'
import { db } from '..'

const getNotes = createServerFn({ method: 'GET' })
  // 2)
  .validator((noteId: string) => noteId)
  .handler(async ({ data: noteId }) => {
    const note = await db.query.notesTable.findFirst({
      where: { id: noteId },
    })

    return note
  })

export const Route = createFileRoute('/view/$noteId')({
  component: RouteComponent,
  // 1)
  loader: async ({ params }) => {
    const note = await getNotes({ data: params.noteId })
    if (!note) {
      throw notFound()
    }
    return { note }
  },
  notFoundComponent: () => {
    return (
      <div>
        Note not found.{' '}
        <Link to="/" className="underline">
          Back to home
        </Link>
      </div>
    )
  },
  errorComponent: () => {
    return <div>Error Boundary</div>
  },
})

function RouteComponent() {
  const params = Route.useParams()
  // 3)
  const { note } = Route.useLoaderData()
  const setBeingDeleted = useDeleteStore((state) => state.setBeingDeleted)

  return (
    <>
      <Navbar.Root>
        <Navbar.Header>View '{note?.title}'</Navbar.Header>
        <Navbar.Navigation>
          <Button
            variant="default"
            nativeButton={false}
            render={
              <Link to="/">
                <MoveLeft /> <span className="hidden sm:inline">Back</span>
              </Link>
            }
            className="size-12 sm:w-48 sm:px-4 sm:py-2"
          />
        </Navbar.Navigation>
      </Navbar.Root>

      <Main>
        <Separator className="mb-4" />

        <header className="mt-6 mb-8 border-l-3 border-zinc-700 ps-4 leading-none tracking-tight">
          <h1 className="inline font-sans text-sm font-medium text-zinc-400 capitalize">
            Note Title
          </h1>
          <br />
          <h2 className="inline text-2xl font-medium capitalize">
            {note?.title}
          </h2>
        </header>

        <article className="mb-8">
          <h1 className="font-sans text-sm font-medium text-zinc-400 capitalize">
            Note Content
          </h1>
          <p>{note?.note}</p>
        </article>

        <div className="mb-8">
          <h1 className="font-sans text-sm font-medium text-zinc-400 capitalize">
            Created At
          </h1>
          <h2>{note.createdAt.toLocaleDateString()}</h2>
        </div>

        <div>
          <h1 className="font-sans text-sm font-medium text-zinc-400 capitalize">
            Created At
          </h1>
          <h2>{note.createdAt.toLocaleDateString()}</h2>
        </div>

        <Separator className="my-6" />
      </Main>

      <footer className="flex gap-2.5">
        <Button
          nativeButton={false}
          variant="outline"
          render={
            <Link to="/edit/$noteId" params={{ noteId: params.noteId }}>
              Edit
            </Link>
          }
          className="flex-1"
        />
        <Button
          variant="destructive"
          className="flex-1"
          onClick={() =>
            setBeingDeleted({
              id: params.noteId,
              title: 'Belajar Tanstack Start',
            })
          }
        >
          Delete
        </Button>
      </footer>
    </>
  )
}
