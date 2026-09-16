import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core/columns'
import { pgTable } from 'drizzle-orm/pg-core/table'

export const notesTable = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  note: text('note').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdateFn(() => new Date())
    .defaultNow()
    .notNull(),
})
