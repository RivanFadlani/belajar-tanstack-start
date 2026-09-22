import { SignupForm } from '#/components/signup-form'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Field } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'
import { signUpSchema, type SignUpFieldErrors } from '#/schemas/auth-schema'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import React, { useState, useTransition } from 'react'
import z from 'zod'
import { db } from '..'
import bcrypt from 'bcryptjs'
import { usersTable } from '#/db/schema'
import { useAppSession } from '#/lib/session'
import { Alert } from '#/components/ui/alert'
import { XCircleIcon } from 'lucide-react'

const signUp = createServerFn({ method: 'POST' })
  .validator(signUpSchema)
  .handler(async ({ data }) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const existingEmail = await db.query.usersTable.findFirst({
      where: { email: data.email },
    })

    if (existingEmail) {
      return { error: 'User already exists' }
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(data.password, 12)

    // Create User
    const [user] = await db
      .insert(usersTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      })
      .returning()

    const session = await useAppSession()
    await session.update({ userId: user.id })

    return { success: true }
  })

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  const [errors, setErrors] = useState<SignUpFieldErrors>({})
  const [signUpError, setSignUpError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

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

    setErrors({})

    startTransition(async () => {
      const signUpRes = await signUp({
        data: {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          confirmPassword: formData.get('confirm-password') as string,
        },
      })

      if (signUpRes?.error) {
        setSignUpError(signUpRes.error)
      } else {
        router.navigate({ to: '/' })
      }
    })

    setSignUpError(null)

    // console.log(signUpSchema.safeParse(SignUpInput))
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm">
          <SignupForm>
            <Card.Content>
              <form onSubmit={handleSubmit} noValidate>
                {signUpError && (
                  <Alert.Root
                    variant="destructive"
                    className="border-destructive bg-destructive/10 mb-6 border-2"
                  >
                    <XCircleIcon />
                    <Alert.Title>Error!</Alert.Title>
                    <Alert.Description>{signUpError}</Alert.Description>
                  </Alert.Root>
                )}

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
                      <Button type="submit" disabled={isPending}>
                        {isPending ? (
                          <>
                            <Spinner /> <span>Please Wait...</span>
                          </>
                        ) : (
                          <span>Create Account</span>
                        )}
                      </Button>

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
