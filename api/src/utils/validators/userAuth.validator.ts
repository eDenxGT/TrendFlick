import { z } from "zod";

export const userRegisterSchema = z.object({
  firstName: z
    .string()
    .trim()
    .regex(/^[A-Za-z\s]+$/, "First name can only contain letters and spaces")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name can't be longer than 30 characters"),

  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z\s]+$/, "Last name can only contain letters and spaces")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name can't be longer than 30 characters"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[@$!%*?&]/, "Must include at least one special character"),

  dob: z.coerce.date({ required_error: "Date of birth is required" }),

  preferences: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one category"),
});

export const userLoginSchema = z
  .object({
    loginMethod: z.enum(["email", "phone"], {
      required_error: "Login method is required",
    }),

    identifier: z.string().min(1, "Identifier is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[@$!%*?&]/, "Must include at least one special character"),
  })
  .superRefine((data, ctx) => {
    if (data.loginMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.identifier)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email format",
          path: ["identifier"],
        });
      }
    }

    if (data.loginMethod === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(data.identifier)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number must be exactly 10 digits",
          path: ["identifier"],
        });
      }
    }
  });
