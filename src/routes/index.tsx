import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-medium">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <Button variant="secondary" className="mt-4 px-4 py-2">
        Get Started
      </Button>
    </div>
  )
}
