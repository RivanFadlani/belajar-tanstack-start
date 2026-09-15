import Main from '#/components/layout/main'
import { Navbar } from '#/components/navbar'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { useDeleteStore } from '#/stores/delete-store'
import { createFileRoute, Link } from '@tanstack/react-router'
import { MoveLeft } from 'lucide-react'

export const Route = createFileRoute('/view/$noteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const setBeingDeleted = useDeleteStore((state) => state.setBeingDeleted)

  return (
    <>
      <Navbar.Root>
        <Navbar.Header>View {params.noteId}</Navbar.Header>
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
            Belajar Tanstack Start
          </h2>
        </header>

        <article className="mb-8">
          <h1 className="font-sans text-sm font-medium text-zinc-400 capitalize">
            Note Title
          </h1>
          <p>
            Hari ini aku belajar 'Tanstack Start'. Tapi tidak hanya itu, aku
            juga belajar Design Pattern yaitu 'Compound Component' menggunakan
            shadcn/ui
          </p>
        </article>

        <div>
          <h1 className="font-sans text-sm font-medium text-zinc-400 capitalize">
            Created At
          </h1>
          <h2>3 Days Ago</h2>
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
