import { LoginForm } from '#/components/login-form'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Field } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm">
          <LoginForm>
            <Card.Content>
              <form>
                <Field.Group>
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
                    <div className="flex items-center">
                      <Field.Label htmlFor="password">Password</Field.Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter Password"
                      required
                    />
                  </Field.Root>
                  <Field.Root>
                    <Button type="submit">Sign In</Button>

                    <Field.Description className="text-center">
                      Don&apos;t have an account?{' '}
                      <Link to="/sign-up">Sign Up</Link>
                    </Field.Description>
                  </Field.Root>
                </Field.Group>
              </form>
            </Card.Content>
          </LoginForm>
        </div>
      </div>
    </>
  )
}
