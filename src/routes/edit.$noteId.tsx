import Main from '#/components/layout/main'
import { Navbar } from '#/components/navbar'
import NoteForm from '#/components/note-form'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import {
  noteSchema,
  updateNoteSchema,
  type FieldErrors,
} from '#/schemas/note-schema'
import {
  createFileRoute,
  Link,
  notFound,
  redirect,
} from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { MoveLeft } from 'lucide-react'
import { useState, useTransition } from 'react'
import z from 'zod'
import { db } from '..'
import { notesTable } from '#/db/schema'
import { eq } from 'drizzle-orm'

// GET
const getNote = createServerFn({ method: 'GET' })
  .validator((noteId: string) => noteId)
  .handler(async ({ data: noteId }) => {
    const note = await db.query.notesTable.findFirst({
      where: { id: noteId },
    })

    return note
  })

// UPDATE
const updateNote = createServerFn({ method: 'POST' })
  .validator(updateNoteSchema)
  .handler(async ({ data }) => {
    await db
      .update(notesTable)
      .set({
        title: data.title,
        note: data.note,
      })
      .where(eq(notesTable.id, data.id))

    throw redirect({
      to: '/view/$noteId',
      params: {
        noteId: data.id,
      },
    })
  })

export const Route = createFileRoute('/edit/$noteId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const note = await getNote({ data: params.noteId })
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
  head: ({ loaderData }) => ({
    meta: [{ title: `Edit: ${loaderData?.note.title}` }],
  }),
})

function RouteComponent() {
  const updateFormFn = useServerFn(updateNote)

  const { note } = Route.useLoaderData()
  const [errors, setErrors] = useState<FieldErrors>({})
  const params = Route.useParams()
  const [isPending, startTransition] = useTransition()

  // Uncontrolled Approach (formData, name)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const input = {
      title: formData.get('title'),
      note: formData.get('note'),
    }

    const result = noteSchema.safeParse(input)
    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors)
      return
    }

    // console.log(input.title)
    // console.log(input.note)

    setErrors({})

    // UPDATE
    startTransition(async () => {
      try {
        await updateFormFn({
          data: {
            ...result.data,
            id: params.noteId,
          },
        })
      } catch {
        console.log('Something went wrong. Please try again!')
      }
    })
  }

  return (
    <>
      <Navbar.Root>
        <Navbar.Header>Edit '{note.title}'</Navbar.Header>
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

        <NoteForm
          onSubmit={handleSubmit}
          errors={errors}
          isLoading={isPending}
          datas={{
            title: note.title,
            note: note.note,
          }}
        />
      </Main>
    </>
  )
}
