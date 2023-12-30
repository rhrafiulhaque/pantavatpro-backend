import { z } from 'zod'
const logInZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
  }),
})
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

export const authValidation = {
  logInZodSchema,
  refreshTokenZodSchema,
}
