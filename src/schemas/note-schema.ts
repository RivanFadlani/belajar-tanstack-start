import z from 'zod'

export const noteSchema = z.object({
  title: z.string().min(1, { error: 'Title is required' }),
  note: z.string().min(8, { error: 'Must be at least 8 characters long' }),
})

export type Note = z.infer<typeof noteSchema>

export type FieldErrors = z.core.$ZodFlattenedError<Note>['fieldErrors']
