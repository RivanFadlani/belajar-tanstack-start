import Main from '#/components/layout/main'
import { Navbar } from '#/components/navbar'
import { Button } from '#/components/ui/button'
import { Field } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'
import { Textarea } from '#/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { MoveLeft } from 'lucide-react'
import { useState } from 'react'
import z from 'zod'

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

const noteSchema = z.object({
  title: z.string().min(1, { error: 'Title is required' }),
  note: z.string().min(8, { error: 'Note minimal character is 8' }),
})

type Note = z.infer<typeof noteSchema>

type FieldErrors = z.core.$ZodFlattenedError<Note>['fieldErrors']

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
          <MoveLeft /> <span className="hidden sm:inline">Back</span>
        </Navbar.Navigation>
      </Navbar.Root>

      <Main>
        <Separator className="mb-4" />

        <form onSubmit={handleSubmit}>
          <Field.Set>
            <Field.Group>
              <Field.Root data-invalid={!!errors.title}>
                <Field.Label htmlFor="title">Title</Field.Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Input a Title Here!"
                  className="bg-zinc-50 placeholder:text-zinc-400"
                  aria-invalid={!!errors.title}
                />
                <Field.Error>{errors.title}</Field.Error>
              </Field.Root>
              <Field.Root data-invalid={!!errors.note}>
                <Field.Label htmlFor="note">Note</Field.Label>
                <Textarea
                  id="note"
                  name="note"
                  placeholder="Input Your Note Here!"
                  rows={5}
                  className="bg-zinc-50 placeholder:text-zinc-400"
                  aria-invalid={!!errors.note}
                />
                <Field.Error>{errors.note}</Field.Error>
              </Field.Root>
            </Field.Group>
          </Field.Set>
          <Button type="submit" variant="outline" className="mt-6 w-full">
            Create
          </Button>
        </form>
      </Main>
    </>
  )
}
