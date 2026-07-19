import { z } from "zod";

// PASSWORD VALIDATION RULES
// Ensures the password is at least 8 characters and contains an uppercase letter.
const passwordSchema = z
  .string()
  .min(8)
  .refine(val => /[A-Z]/.test(val), {
    message: "Password must contain an uppercase letter",
  });

// REGISTRATION INPUT SCHEMA
// Defines the required fields and validation constraints for user signup.
export const registerSchema = z.object({
  firstName: z.string().min(3, "First name is required").max(20, "First name must be less than 20 characters"),
  middleName: z.string().min(3, "Middle name is required").max(20, "Middle name must be less than 20 characters").optional(),
  lastName: z.string().min(3, "Last name is required").max(20, "Last name must be less than 20 characters"),
  email: z.string().min(5, "Email is required").max(254, "Email must be less than 254 characters").email("Invalid email"),
  password: passwordSchema,
});
