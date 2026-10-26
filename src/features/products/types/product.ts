
export interface Product {
  id: string;
  Name: string;
  Images: string[];
  Price: number;
  Category: string; 
  Variant?:ProductVariant[];
  Description: string;
  IsFeatured?: boolean;
}
export interface ProductVariant {
  id: string;
  colorName: string; // red , black
  colorHex: string; // #000
  Images: string[];
  Price?: number;
  Sizes?: string[];
  stock:number;
}