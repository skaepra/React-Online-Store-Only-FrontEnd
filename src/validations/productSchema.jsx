import { z } from "zod"; 

export const productSchema = z.object({
      Product:z.string().min(1,{message:"prodect is requaeid "}),

     Price: z.preprocess(
  (val) => { 
    if (typeof val === "string") {//يتحقق من نوع القيمة المدخاة
      const cleaned = val.replace(/,/g, ""); //حذف الفواصل
      return Number(cleaned);//يحول القيمة المدخلة الى رقم 
    }
    return val;
  },
  z.number({ required_error: "Price is required" })
    .min(1, { message: "Price must be at least 1" })
    .max(999999, { message:"The Price is expensive" })
)
    })