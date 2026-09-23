import { authenticateUser } from '#/auth'
import { LoginForm } from '#/components/login-form'
import { Alert } from '#/components/ui/alert'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Field } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'
import { useAppSession } from '#/lib/session'
import { signInSchema, type SignInFieldErrors } from '#/schemas/auth-schema'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { XCircleIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import z from 'zod'

const sigIn = createServerFn({ method: 'POST' })
  .validator(signInSchema)
  .handler(async ({ data }) => {
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return {
        error: 'Invalid credentials',
      }
    }

    const session = await useAppSession()
    await session.update({
      userId: user.id,
    })

    throw redirect({
      to: '/',
    })
  })

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const signInFn = useServerFn(sigIn)

  const [errors, setErrors] = useState<SignInFieldErrors>({})
  const [signInError, setSignInError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

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

    setErrors({})

    startTransition(async () => {
      try {
        setSignInError(null)

        const sigInRes = await signInFn({
          data: result.data,
        })

        if (sigInRes.error) {
          setSignInError(sigInRes.error)
        }
      } catch {
        setSignInError('Something went wrong. Please try again!')
      }
    })
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm">
          <LoginForm>
            <Card.Content>
              <form onSubmit={handleSubmit} noValidate>
                {signInError && (
                  <Alert.Root
                    variant="destructive"
                    className="border-destructive bg-destructive/10 mb-6 border-2"
                  >
                    <XCircleIcon />
                    <Alert.Title>Error!</Alert.Title>
                    <Alert.Description>{signInError}</Alert.Description>
                  </Alert.Root>
                )}

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
                    <Button type="submit" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Spinner /> <span>Please Wait...</span>
                        </>
                      ) : (
                        <span>Sign In</span>
                      )}
                    </Button>

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
