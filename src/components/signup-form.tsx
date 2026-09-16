import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from './ui/separator'
import { Link } from '@tanstack/react-router'
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
      <Card.Content>
        <form>
          <Field.Group>
            <Field.Root>
              <Field.Label htmlFor="name">Full Name</Field.Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field.Root>
            <Field.Root>
              <Field.Label htmlFor="email">Email</Field.Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field.Root>
            <Field.Root>
              <Field.Label htmlFor="password">Password</Field.Label>
              <Input id="password" type="password" required />
              <Field.Description>
                Must be at least 8 characters long.
              </Field.Description>
            </Field.Root>
            <Field.Root>
              <Field.Label htmlFor="confirm-password">
                Confirm Password
              </Field.Label>
              <Input id="confirm-password" type="password" required />
              <Field.Description>
                Please confirm your password.
              </Field.Description>
            </Field.Root>
            <Field.Group>
              <Field.Root>
                <Button type="submit">Create Account</Button>

                <Field.Description className="px-6 text-center">
                  Already have an account? <Link to="/sign-in">Sign In</Link>
                </Field.Description>
              </Field.Root>
            </Field.Group>
          </Field.Group>
        </form>
      </Card.Content>
    </Card.Root>
  )
}
