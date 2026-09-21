import { notesTable } from '#/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

export const noteSchema = createInsertSchema(notesTable, {
  title: (schema) => schema.min(1, { error: 'Title is required' }),
  note: (schema) =>
    schema.min(8, { error: 'Must be at least 8 characters long' }),
})

export const updateNoteSchema = noteSchema.extend({
  id: z.uuid({ error: 'Invalid UUID' }),
})

export const deleteNoteSchema = z.object({
  id: z.uuid(),
})

export const noteSelectSchema = createSelectSchema(notesTable)

export type Note = z.infer<typeof noteSchema>
export type NoteSelect = z.infer<typeof noteSelectSchema>

export type FieldErrors = z.core.$ZodFlattenedError<Note>['fieldErrors']
