import Main from '#/components/layout/main'
import { Navbar } from '#/components/navbar'
import { Separator } from '#/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import { MoveLeft } from 'lucide-react'

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar.Root>
        <Navbar.Header>Create Note</Navbar.Header>
        <Navbar.Navigation>
          <MoveLeft /> <span className="hidden sm:inline">Back</span>
        </Navbar.Navigation>
      </Navbar.Root>

      <Main>
        <Separator className="mb-4" />
      </Main>
    </>
  )
}
