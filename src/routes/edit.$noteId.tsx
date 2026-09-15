import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/$noteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  return <div>Hello {params.noteId}!</div>
}
