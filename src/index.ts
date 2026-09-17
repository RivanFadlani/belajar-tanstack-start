import { createServerOnlyFn } from '@tanstack/react-start'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

// export const db = drizzle(process.env.DATABASE_URL!)

const connectDatabase = createServerOnlyFn(() =>
  drizzle(process.env.DATABASE_URL!),
)

export const db = connectDatabase()
