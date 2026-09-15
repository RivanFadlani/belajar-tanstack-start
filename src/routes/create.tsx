import Main from '#/components/layout/main'
import { Navbar } from '#/components/navbar'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { createFileRoute, Link } from '@tanstack/react-router'
import { MoveLeft } from 'lucide-react'
import z from 'zod'
import { useState } from 'react'
import NoteForm from '#/components/note-form'
import { noteSchema, type FieldErrors } from '#/schemas/note'

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

function RouteComponent() {
  // Uncontrolled Approach (formData, name)
  const [errors, setErrors] = useState<FieldErrors>({})

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
            title: 'This is a title',
            note: 'This is a Note. You can fill this textarea with your ideas!',
          }}
        />
      </Main>
    </>
  )
}
