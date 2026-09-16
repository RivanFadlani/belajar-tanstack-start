import z from 'zod'

export const signInSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
  password: z.string().min(1, { error: 'Please enter a password' }),
})

export const signUpSchema = z
  .object({
    name: z.string().min(2, { error: 'Must be at least 2 characters long' }),
    email: z.email({ error: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { error: 'Must be at least 8 characters long' }),
    confirmPassword: z
      .string()
      .min(1, { error: 'Please enter a confirm password' }),
  })
  .refine(
    (data) => {
      if (!data.confirmPassword) return true
      return data.password === data.confirmPassword
    },
    {
      message: 'The passwords you entered do not match. Please try again.',
      path: ['confirmPassword'],
    },
  )

export type SignIn = z.infer<typeof signInSchema>
export type SignUp = z.infer<typeof signUpSchema>

export type SignInFieldErrors = z.core.$ZodFlattenedError<SignIn>['fieldErrors']
export type SignUpFieldErrors = z.core.$ZodFlattenedError<SignUp>['fieldErrors']
