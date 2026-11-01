import Allproducts from "../../../data/Allproducts";
import { Product } from "../../products/types/product";

export const SHOP_PAGE_SIZE = 20;

export function getProducts(): Product[] {
  return Allproducts;
}

export function getProductPage(
  products: Product[],
  page: number,
  pageSize = SHOP_PAGE_SIZE,
): Product[] {
  const end = Math.max(0, Math.floor(page) * pageSize);
  return products.slice(0, end);
}
