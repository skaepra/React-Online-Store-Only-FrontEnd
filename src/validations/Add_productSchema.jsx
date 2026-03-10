import { z } from "zod";

export const Add_productSchema = z.object({
  Name: z.string().min(1, { message: "Name is required" }),
  Description: z.string(),
  ImageAlt: z.string(),
  Quantity: z.coerce.number().positive(),
  Price: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const cleaned = val.replace(/,/g, "");
        return Number(cleaned);
      }
      return val;
    },
    z.number({ required_error: "Price is required" })
      .min(1, { message: "Price must be at least 1" })
      .max(999999, { message:"The Price is expensive" })
  ),
  Variants: z.array(
    z.object({
      color: z.string().min(1, { message: "Color is required" }),
      image: z.any({ required_error: "Image is required" })
    })
  ).nonempty({ message: "At least one variant is required" })
});
