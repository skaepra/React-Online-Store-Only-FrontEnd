import { z } from "zod";

export const loginSchema = z.object({
  phone: z
  .string()
  .trim()
  .transform((value) => value.replace(/\s+/g, ""))
  .refine((value) => /^9\d{8}$/.test(value), {
      message: "Phone must be 9 digits and start with 9",
    }),
    countryCode: z.string().refine((val) => val === "SY", {
      message: "Only Syria is supported currently",
    }),
      callingCode: z.string().min(1),

    password: z
  .string()
  .trim()

  .min(8, {
    message: "Password must be at least 8 characters",
  })

  .max(64, {
    message: "Password must be less than 64 characters",
  })

  // حرف كبير
  .regex(/[A-Z]/, {
    message:
      "Password must contain at least one uppercase letter",
  })

  // حرف صغير
  .regex(/[a-z]/, {
    message:
      "Password must contain at least one lowercase letter",
  })

  // رقم
  .regex(/[0-9]/, {
    message:
      "Password must contain at least one number",
  })

  // رمز خاص واحد على الأقل
  .regex(/[!@#$%^&*()]/, {
    message:
      "Password must contain at least one special character (!@#$%^&*())",
  })

  // السماح فقط بالمحارف المحددة
  .regex(/^[A-Za-z0-9!@#$%^&*()]+$/, {
    message:
      "Password can contain only uppercase letters, lowercase letters, numbers and !@#$%^&*() symbols",
  }),
});

// استخراج نوع TypeScript تلقائي من الـ schema
export type LoginFormData = z.infer<typeof loginSchema>;
