import { z } from "zod";

export const checkoutSchema = z.object({
  // بيانات الشحن والعنوان
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  phone: z.string().min(8, { message: "Phone number is invalid" }),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  addressLine1: z.string().min(3, { message: "Street address is required" }),
  addressLine2: z.string().optional(),
  notes: z.string().optional(),

  // طريقة الدفع
  paymentMethod: z.enum(["COD", "Card"], {
    message: "Please select a valid payment method",
  }),

  // حقول البطاقة
  cardType: z.enum(["Visa", "MasterCard", "Mada"]).optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),

  // الإحداثيات الجغرافية
  latitude: z.number().optional(),
  longitude: z.number().optional(),
}).superRefine((data, ctx) => {
  // إذا اختار المستخدم الدفع بالبطاقة، نتحقق من كل حقل على حدة ونضيف الخطأ المخصص له
  if (data.paymentMethod === "Card") {
    
    // 1. التحقق من Card Number
    const cleanCardNum = data.cardNumber ? data.cardNumber.replace(/\s/g, "") : "";
    const isNumOnly = /^\d+$/.test(cleanCardNum);
    if (!cleanCardNum || !isNumOnly || cleanCardNum.length < 15 || cleanCardNum.length > 19) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid card number (15-19 digits).",
        path: ["cardNumber"],
      });
    }

    // 2. التحقق من Expiry Date (الصيغة + انتهاء الصلاحية)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!data.cardExpiry || !expiryRegex.test(data.cardExpiry)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid expiry date format (use MM/YY).",
        path: ["cardExpiry"],
      });
    } else {
      // فحص إذا كان التاريخ قديماً ومنتهياً
      const [expMonthStr, expYearStr] = data.cardExpiry.split("/");
      const expMonth = parseInt(expMonthStr, 10);
      const expYear = 2000 + parseInt(expYearStr, 10);

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card has already expired.",
          path: ["cardExpiry"],
        });
      }
    }

    // 3. التحقق من CVV
    const cvvRegex = /^\d{3,4}$/;
    if (!data.cardCvv || !cvvRegex.test(data.cardCvv)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CVV must be 3 or 4 digits.",
        path: ["cardCvv"],
      });
    }
  }
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;