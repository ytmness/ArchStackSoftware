import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(8),
});
