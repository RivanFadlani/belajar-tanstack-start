import { getCurrentUserFn } from '#/auth'
import { createMiddleware } from '@tanstack/react-start'

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await getCurrentUserFn()

  if (!user) {
    console.log('Unauthorized')
    throw new Error('Unauthorized')

    // === test redirect
    // throw redirect({
    //   to: '/sign-in',
    // })
  }

  return next({
    context: { user },
  })
})
