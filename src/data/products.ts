import { Product } from "../features/products/types/product";

const homeProducts: Product[] = [
  {
    id: "564534",
    Name: "Air Pods",
    Category: "Electronics",
    Images: ["products/3.jfif", "products/311.jfif"],
    Price: 25,
    Variant: [
      {
        id: "v1-1",
        colorName: "white",
        colorHex: "#ffffff",
        Images: ["products/3.jfif"],
        stock: 10,
      },
      {
        id: "v1-2",
        colorName: "black",
        colorHex: "#000000",
        Images: ["products/311.jfif"],
        stock: 15,
      },
    ],
    Description:
      "Wireless earbuds for everyday listening. Available in white and black.",
    IsFeatured: true,
  },
  {
    id: "743534",
    Name: "Head Phones",
    Category: "Electronics",
    Images: ["products/211.jfif", "products/212.jfif", "products/213.jfif"],
    Price: 55,
    Variant: [
      {
        id: "v2-1",
        colorName: "black",
        colorHex: "#000000",
        Images: ["products/211.jfif"],
        stock: 8,
      },
      {
        id: "v2-2",
        colorName: "white",
        colorHex: "#ffffff",
        Images: ["products/212.jfif"],
        stock: 12,
      },
      {
        id: "v2-3",
        colorName: "red",
        colorHex: "#ff0000",
        Images: ["products/213.jfif"],
        stock: 5,
      },
    ],
    Description:
      "Over-ear headphones for everyday listening. Available in black, white, and red.",
  },
  {
    id: "98765",
    Name: "Apple Watch",
    Category: "Electronics",
    Images: ["products/شوفو وش شترولي❤️.jfif", "products/111.jfif"],
    Price: 700,
    Variant: [
      {
        id: "v3-1",
        colorName: "white",
        colorHex: "#ffffff",
        Images: ["products/شوفو وش شترولي❤️.jfif"],
        stock: 6,
      },
      {
        id: "v3-2",
        colorName: "gold",
        colorHex: "#d6ac6c",
        Images: ["products/111.jfif"],
        stock: 4,
      },
    ],
    Description:
      "A smartwatch with a white sport band and an additional gold-tone color option. See the product images for its finish and design.",
  },
  {
    id: "98745",
    Name: "Hik Vision",
    Category: "Electronics",
    Images: ["products/239887117644111066.jfif"],
    Price: 1350,
    Description:
      "A Hikvision camera for monitoring a home or workplace. Check the product images for the model and included components.",
  },
  {
    id: "2654",
    Name: "Rolex",
    Category: "Accessories",
    Images: ["products/12666442696243758.jfif"],
    Price: 6700,
    Description:
      "A gold-tone wristwatch shown in the product photo. Review the images for its finish and styling.",
  },
  {
    id: "8656",
    Name: "Puri fier",
    Category: "Accessories",
    Images: ["products/Cosmetic lotion cream jar container mockup.jfif"],
    Price: 20,
    Description:
      "A jar of moisturizing lotion. Refer to the product image for the container and label details.",
  },
  {
    id: "132765",
    Name: "Atop Ring",
    Category: "Accessories",
    Images: ["products/13299761394220174.jfif"],
    Price: 300,
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
      "products/33333.jfif"
      ,
    ],
    Price: 1100,
    Variant: [
      {
        id: "v8-1",
        colorName: "black",
        colorHex: "#000000",
        Images: ["products/1111111.jfif"],
        stock: 0,
      },
      {
        id: "v8-2",
        colorName: "white",
        colorHex: "#ffffff",
        Images: ["products/422564377559090130.jfif","products/13299761394220174.jfif","products/33333.jfif","products/239887117644111066.jfif","products/111.jfif"],
        stock: 7,
      },
    ],
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