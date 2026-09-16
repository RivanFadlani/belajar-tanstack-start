import { cn } from 'cn'

import { Card } from '@/components/ui/card'
import { Separator } from './ui/separator'
import type React from 'react'

export function LoginForm({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & { children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <Card.Root size="default" className="border-2 border-zinc-100">
        <Card.Header>
          <Card.Title>Login to your account</Card.Title>
          <Card.Description>
            Enter your email below to login to your account
          </Card.Description>
          <Separator className="mt-4" />
        </Card.Header>

        {children}
      </Card.Root>
    </div>
  )
}
