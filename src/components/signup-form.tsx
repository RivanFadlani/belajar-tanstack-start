import { Card } from '@/components/ui/card'
import { Separator } from './ui/separator'
import React from 'react'

export function SignupForm({
  children,
  ...props
}: React.ComponentProps<typeof Card.Root> & { children: React.ReactNode }) {
  return (
    <Card.Root className="border-2 border-zinc-100" {...props}>
      <Card.Header>
        <Card.Title>Create an account</Card.Title>
        <Card.Description>
          Enter your information below to create your account
        </Card.Description>

        <Separator className="mt-4" />
      </Card.Header>

      {children}
    </Card.Root>
  )
}
