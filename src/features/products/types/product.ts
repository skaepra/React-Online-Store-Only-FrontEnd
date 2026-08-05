export interface Product {
  id: number;
  Name: string;
  Images: string[];
  ImageAlt?: string;
  Price: number;
  Category: "Electronics" | "Apparel" | "Accessories" | "Footwear"; // فئات محددة لمزيد من الأمان البرمجي
  Colors?: string[];
  Sizes?: string[];
  Description: string;
  IsFeatured?: boolean;
}