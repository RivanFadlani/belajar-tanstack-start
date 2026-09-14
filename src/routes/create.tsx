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

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

function RouteComponent() {
  // Controlled Approach (state, onChange)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('Ini Title:', title)
    console.log('Ini Note:', note)
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
              <Field.Root>
                <Field.Label htmlFor="title">Title</Field.Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Input a Title Here!"
                  className="bg-zinc-50 placeholder:text-zinc-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor="note">Note</Field.Label>
                <Textarea
                  id="note"
                  placeholder="Input Your Note Here!"
                  rows={5}
                  className="bg-zinc-50 placeholder:text-zinc-400"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
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
