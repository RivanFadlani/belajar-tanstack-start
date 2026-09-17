import Main from '#/components/layout/main'
import { Navbar } from '#/components/navbar'
import NoteForm from '#/components/note-form'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { noteSchema, type FieldErrors } from '#/schemas/note-schema'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { MoveLeft } from 'lucide-react'
import { useState } from 'react'
import z from 'zod'
import { db } from '..'

const getNote = createServerFn({ method: 'GET' })
  .validator((noteId: string) => noteId)
  .handler(async ({ data: noteId }) => {
    const note = await db.query.notesTable.findFirst({
      where: { id: noteId },
    })

    return note
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
})

function RouteComponent() {
  const { note } = Route.useLoaderData()
  const [errors, setErrors] = useState<FieldErrors>({})

  // Uncontrolled Approach (formData, name)

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
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
  }

  return (
    <>
      <Navbar.Root>
        <Navbar.Header>Edit 'Nama Note'</Navbar.Header>
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
          datas={{
            title: note.title,
            note: note.note,
          }}
        />
      </Main>
    </>
  )
}
