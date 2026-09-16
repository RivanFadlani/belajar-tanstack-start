import { Button } from '#/components/ui/button'
import { Field } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import type { FieldErrors } from '#/schemas/note-schema'
import type { Form } from '@base-ui/react/form'
import type React from 'react'

const NoteForm = ({
  onSubmit,
  errors,
  datas,
}: React.ComponentProps<typeof Form> & {
  errors: FieldErrors
  datas: { title?: string; note?: string }
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Field.Set>
        <Field.Group>
          {/* errors.title awalnya ga punya data (errors.title -> undefined (falsy)), jadi === falsy */}
          {/* lalu diberi double bang (!!) untuk ubah non-bool (errors.title) menjadi ke boolean, jadi === false */}
          {/* supaya awal form di-load, status field tidak langsung data-invalid='true' */}
          <Field.Root data-invalid={!!errors.title}>
            <Field.Label htmlFor="title">Title</Field.Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Input a Title Here!"
              className="bg-zinc-50 placeholder:text-zinc-400"
              aria-invalid={!!errors.title}
              defaultValue={datas?.title}
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
              defaultValue={datas?.note}
            />
            <Field.Error>{errors.note}</Field.Error>
          </Field.Root>
        </Field.Group>
      </Field.Set>
      <Button type="submit" variant="outline" className="mt-6 w-full">
        {datas?.title ? 'Update Note' : 'Create Note'}
      </Button>
    </form>
  )
}

export default NoteForm
