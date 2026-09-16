import { SignupForm } from '#/components/signup-form'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Field } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { signUpSchema, type SignUpFieldErrors } from '#/schemas/auth-schema'
import { createFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from 'react'
import z from 'zod'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  const [errors, setErrors] = useState<SignUpFieldErrors>({})

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const SignUpInput = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    }

    const result = signUpSchema.safeParse(SignUpInput)

    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors)
      return
    }

    // console.log(signUpSchema.safeParse(SignUpInput))
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm">
          <SignupForm>
            <Card.Content>
              <form onSubmit={handleSubmit} noValidate>
                <Field.Group>
                  <Field.Root data-invalid={!!errors.name}>
                    <Field.Label htmlFor="name">Full Name</Field.Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      aria-invalid={!!errors.name}
                      placeholder="John Doe"
                    />
                    <Field.Error>{errors.name}</Field.Error>
                  </Field.Root>
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
                  <Field.Root data-invalid={!!errors.password}>
                    <Field.Label htmlFor="password">Password</Field.Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      aria-invalid={!!errors.password}
                    />
                    <Field.Description>
                      Must be at least 8 characters long.
                    </Field.Description>
                    <Field.Error>{errors.password}</Field.Error>
                  </Field.Root>
                  <Field.Root data-invalid={!!errors.confirmPassword}>
                    <Field.Label htmlFor="confirm-password">
                      Confirm Password
                    </Field.Label>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      aria-invalid={!!errors.confirmPassword}
                    />
                    <Field.Description>
                      Please confirm your password.
                    </Field.Description>
                    <Field.Error>{errors.confirmPassword}</Field.Error>
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
