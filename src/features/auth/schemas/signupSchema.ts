import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      // حذف الفراغات من البداية والنهاية
      .trim()
      // الحقل مطلوب
      .min(1, {
        message: "Full name is required",
      })
      // الطول
      .min(6, {
        message: "Full name must be at least 6 characters",
      })
      .max(32, {
        message: "Full name must be less than 32 characters",
      })
      // يجب أن يبدأ بحرف (إنجليزي أو عربي)
      .regex(/^[A-Za-z\u0600-\u06FF]/, {
        message: "Full name must start with a letter",
      })
      // الأحرف المسموحة فقط (إنجليزي، عربي، أرقام، فراغات، شرطات)
      .regex(/^[A-Za-z0-9\s_\-\u0600-\u06FF]+$/, {
        message: "Full name can contain only letters, numbers, spaces, - and _",
      })
      // منع الفراغات المتتالية
      .refine((value) => !/\s{2,}/.test(value), {
        message: "Full name cannot contain consecutive spaces",
      })
      // منع تكرار -- __ -_ _-
      .refine((value) => !/[-_]{2,}/.test(value), {
        message: "Full name cannot contain consecutive dashes or underscores",
      })
      // منع انتهاء الاسم بـ - أو _
      .refine((value) => !/[-_]$/.test(value), {
        message: "Full name cannot end with a dash or underscore",
      })
      // منع الاسم المؤلف فقط من أرقام
      .refine((value) => !/^\d+$/.test(value), {
        message: "Full name cannot contain only numbers",
      }),

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

    birthDate: z
      .date({
        required_error: "Birth date is required",
        invalid_type_error: "Invalid birth date",
      })
      .refine(
        (date) => {
          const today = new Date();
          return date <= today;
        },
        {
          message: "Birth date cannot be in the future",
        },
      )
      .refine(
        (date) => {
          const today = new Date();

          let age = today.getFullYear() - date.getFullYear();

          const hasHadBirthdayThisYear =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() &&
              today.getDate() >= date.getDate());

          if (!hasHadBirthdayThisYear) age--;

          return age >= 14 && age <= 100;
        },
        {
          message: "Age must be between 14 and 100",
        },
      ),

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
        message: "Password must contain at least one uppercase letter",
      })

      // حرف صغير
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })

      // رقم
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
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

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),

    photoUrl: z
      .string()
      .refine(
        (val) =>
          val === "" ||
          val.startsWith("file://") ||
          val.startsWith("http://") ||
          val.startsWith("https://") ||
          val.length > 0, // هذا ليقبل أي اسم ملف أو مسار يعيده السيرفر
        {
          message: "Invalid image file",
        },
      )
      .default(""),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = Omit<z.infer<typeof signupSchema>, "birthDate"> & {
  birthDate: Date | null;
};
