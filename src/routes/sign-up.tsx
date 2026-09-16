import { SignupForm } from '#/components/signup-form'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Field } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm">
          <SignupForm>
            <Card.Content>
              <form>
                <Field.Group>
                  <Field.Root>
                    <Field.Label htmlFor="name">Full Name</Field.Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
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
                        Already have an account?{' '}
                        <Link to="/sign-in">Sign In</Link>
                      </Field.Description>
                    </Field.Root>
                  </Field.Group>
                </Field.Group>
              </form>
            </Card.Content>
          </SignupForm>
        </div>
      </div>
    </>
  )
}
