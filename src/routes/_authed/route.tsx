import { getCurrentUserFn } from '#/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async () => {
    const user = await getCurrentUserFn()

    if (!user) {
      throw redirect({
        to: '/sign-in',
      })
    }

    return { user }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
