import { LoginForm } from '#/components/login-form'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Field } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { signInSchema, type SignInFieldErrors } from '#/schemas/auth-schema'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import z from 'zod'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const [errors, setErrors] = useState<SignInFieldErrors>({})

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const SignInInput = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const result = signInSchema.safeParse(SignInInput)
    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors)
      return
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm">
          <LoginForm>
            <Card.Content>
              <form onSubmit={handleSubmit} noValidate>
                <Field.Group>
                  {/* Email Field Start */}
                  <Field.Root data-invalid={!!errors.email}>
                    <Field.Label htmlFor="email">Email</Field.Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      aria-invalid={!!errors.email}
                      placeholder="m@example.com"
                    />
                    <Field.Error>{errors.email}</Field.Error>
                  </Field.Root>
                  {/* Email Field End */}

                  {/* Password Field Start */}
                  <Field.Root data-invalid={!!errors.password}>
                    <div className="flex items-center">
                      <Field.Label htmlFor="password">Password</Field.Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      aria-invalid={!!errors.password}
                      placeholder="Enter Password"
                    />
                    <Field.Error>{errors.password}</Field.Error>
                  </Field.Root>
                  {/* Password Field End */}
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
