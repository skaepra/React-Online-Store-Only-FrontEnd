import { Product } from "../features/products/types/product";

const homeProducts: Product[] = [
  {
    id: "564534",
    Name: "Air Pods",
    Category: "Electronics",
    Images: ["products/3.jfif", "products/311.jfif"],
    ImageAlt: "Wireless earbuds",
    Price: 25,
    Colors: ["white", "black"],
    Description:
      "Wireless earbuds for everyday listening. Available in white and black.",
    IsFeatured: true,
  },
  {
    id: "743534",
    Name: "Head Phones",
    Category: "Electronics",
    Images: ["products/211.jfif", "products/212.jfif", "products/213.jfif"],
    ImageAlt: "Over-ear headphones",
    Price: 55,
    Colors: ["black", "white", "red"],
    Description:
      "Over-ear headphones for everyday listening. Available in black, white, and red.",
  },
  {
    id: "98765",
    Name: "Apple Watch",
    Category: "Electronics",
    Images: ["products/شوفو وش شترولي❤️.jfif", "products/111.jfif"],
    ImageAlt: "White smartwatch with a sport band",
    Price: 700,
    Colors: ["white", "#d6ac6c"],
    Description:
      "A smartwatch with a white sport band and an additional gold-tone color option. See the product images for its finish and design.",
  },
  {
    id: "98745",
    Name: "Hik Vision",
    Category: "Electronics",
    Images: ["products/239887117644111066.jfif"],
    ImageAlt: "Hikvision security camera",
    Price: 1350,
    Colors: [],
    Description:
      "A Hikvision camera for monitoring a home or workplace. Check the product images for the model and included components.",
  },
  {
    id: "2654",
    Name: "Rolex",
    Category: "Accessories",
    Images: ["products/12666442696243758.jfif"],
    ImageAlt: "Gold-tone wristwatch",
    Price: 6700,
    Colors: [],
    Description:
      "A gold-tone wristwatch shown in the product photo. Review the images for its finish and styling.",
  },
  {
    id: "8656",
    Name: "Puri fier",
    Category: "Accessories",
    Images: ["products/Cosmetic lotion cream jar container mockup.jfif"],
    ImageAlt: "Moisturizing lotion in a jar",
    Price: 20,
    Colors: [],
    Description:
      "A jar of moisturizing lotion. Refer to the product image for the container and label details.",
  },
  {
    id: "132765",
    Name: "Atop Ring",
    Category: "Accessories",
    Images: ["products/13299761394220174.jfif"],
    ImageAlt: "Decorative ring",
    Price: 300,
    Colors: [],
    Description:
      "A decorative ring shown in the product photo. Review the image for its design and finish.",
  },
  {
    id: "95672",
    Name: "iphone",
    Category: "Electronics",
    Images: [
      "products/1111111.jfif",
      "products/422564377559090130.jfif",
      "products/33333.jfif",
    ],
    ImageAlt: "Smartphone",
    Price: 1100,
    Colors: ["black", "white"],
    Description:
      "A smartphone shown from several angles. Review the product images for its design and included accessories.",
  },
];
export const productsMap: Record<string, Product> = homeProducts.reduce(
  (acc, product) => {
    acc[product.id] = product;
    return acc;
  },
  {} as Record<string, Product>,
);
export default homeProducts;
