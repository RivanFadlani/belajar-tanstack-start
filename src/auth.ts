import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'
import { useAppSession } from './lib/session'
import { db } from '.'
import { redirect } from '@tanstack/react-router'
import bcrypt from 'bcryptjs'

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const userId = session.data.userId

    if (!userId) {
      return null
    }

    const user = await db.query.usersTable.findFirst({
      where: { id: userId },
    })

    return user ? { id: user.id, name: user.name, email: user.email } : null
  },
)

export const authenticateUser = createServerOnlyFn(
  async (email: string, password: string) => {
    const user = await db.query.usersTable.findFirst({
      where: { email },
    })

    if (!user) return null

    const isValid = await bcrypt.compare(password, user.password)

    return isValid ? user : null
  },
)

export const logOut = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()

  throw redirect({
    to: '/sign-in',
  })
})
