import { Product } from "../../products/types/product";

export interface ShopCategory {
  name: string;
  count: number;
  image?: string;
}

export function getCategories(products: Product[]): ShopCategory[] {
  const categories = new Map<string, ShopCategory>();

  products.forEach((product) => {
    const name = product.Category || "General";
    const category = categories.get(name);

    if (category) {
      category.count += 1;
    } else {
      categories.set(name, {
        name,
        count: 1,
        image: product.Images?.[0],
      });
    }
  });

  return [
    {
      name: "All",
      count: products.length,
      image: products[0]?.Images?.[0],
    },
    ...categories.values(),
  ];
}
