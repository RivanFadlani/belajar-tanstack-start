import { getCurrentUserFn } from '#/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
  beforeLoad: async () => {
    const user = await getCurrentUserFn()

    // kalau sudah login, maka tidak bisa kembali ke sigin/signup page, kecuali log out
    if (user) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
