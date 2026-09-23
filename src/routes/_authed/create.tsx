import Main from '#/components/layout/main'
import { Navbar } from '#/components/navbar'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { MoveLeft } from 'lucide-react'
import z from 'zod'
import { useState, useTransition } from 'react'
import NoteForm from '#/components/note-form'
import { noteSchema, type FieldErrors } from '#/schemas/note-schema'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { notesTable } from '#/db/schema'
import { db } from '#/index'

const createNote = createServerFn({ method: 'POST' })
  .validator(noteSchema)
  .handler(async ({ data }) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    await db.insert(notesTable).values({
      title: data.title,
      note: data.note,
    })

    throw redirect({
      to: '/',
    })
  })

export const Route = createFileRoute('/_authed/create')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Create Note' }],
  }),
})

function RouteComponent() {
  const createNoteFn = useServerFn(createNote)

  // Uncontrolled Approach (formData, name)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isPending, startTransition] = useTransition()

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

    // CREATE
    startTransition(async () => {
      try {
        await createNoteFn({
          data: result.data,
        })
      } catch {
        console.log('Something went wrong. Please try again!')
      }
    })
  }

  return (
    <>
      <Navbar.Root>
        <Navbar.Header>Create Note</Navbar.Header>
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
            title: '',
            note: '',
          }}
          isLoading={isPending}
        />
      </Main>
    </>
  )
}
