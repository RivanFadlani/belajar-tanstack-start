import { getCurrentUserFn, logOut } from '#/auth'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { LogOut } from 'lucide-react'

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
  const logOutFn = useServerFn(logOut)

  const { user } = Route.useRouteContext()

  return (
    <div>
      <nav className="mt-4 mb-6 flex items-center justify-between">
        <span className="font-sans text-xl leading-none font-medium">
          <strong className="text-zinc-400">Hi—</strong> <br />
          <em className="text-zinc-950">{user.name}!</em>
        </span>
        <div>
          <Button variant="destructive" size="sm" onClick={() => logOutFn()}>
            <LogOut />
            Log Out
          </Button>
        </div>
      </nav>

      <Separator />

      <Outlet />
    </div>
  )
}
