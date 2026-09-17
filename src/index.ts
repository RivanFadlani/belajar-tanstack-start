import { createServerOnlyFn } from '@tanstack/react-start'
import 'dotenv/config'
import { defineRelations } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '#/db/schema'

// export const db = drizzle(process.env.DATABASE_URL!)

const relations = defineRelations(schema)

const connectDatabase = createServerOnlyFn(() =>
  drizzle(process.env.DATABASE_URL!, { relations }),
)

export const db = connectDatabase()
