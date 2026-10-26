import { Product } from "../features/products/types/product";

const Allproducts: Product[] = [
  {
    id: "1",
    Name: "Minimalist Leather Backpack",
    Category: "Accessories",
    Price: 120,
    Images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    ],
    Variant: [
      {
        id: "v1-1",
        colorName: "Dark Brown",
        colorHex: "#4A2E2B",
        Images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 10,
      },
      {
        id: "v1-2",
        colorName: "Black",
        colorHex: "#1E1E1E",
        Images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 15,
      },
      {
        id: "v1-3",
        colorName: "Tan",
        colorHex: "#D2B48C",
        Images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 8,
      },
    ],
    Description:
      "Handcrafted from full-grain leather, designed for daily commutes and modern professionals.",
    IsFeatured: true,
  },
  {
    id: "2",
    Name: "Wireless Noise-Canceling Headphones",
    Category: "Electronics",
    Price: 249,
    Images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    ],
    Variant: [
      {
        id: "v2-1",
        colorName: "Matte Black",
        colorHex: "#1E1E1E",
        Images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 20,
      },
      {
        id: "v2-2",
        colorName: "Silver",
        colorHex: "#E5E5E5",
        Images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 12,
      },
    ],
    Description:
      "Immersive sound experience with active noise cancellation and 30-hour battery life.",
    IsFeatured: true,
  },
  {
    id: "3",
    Name: "Classic Oversized Cotton Hoodie",
    Category: "Apparel",
    Price: 65,
    Images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    ],
    Variant: [
      {
        id: "v3-1",
        colorName: "Beige",
        colorHex: "#F5F5DC",
        Images: [
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
        ],
        Sizes: ["S", "M", "L", "XL"],
        stock: 25,
      },
      {
        id: "v3-2",
        colorName: "Dark Slate",
        colorHex: "#36454F",
        Images: [
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
        ],
        Sizes: ["M", "L", "XL"],
        stock: 18,
      },
      {
        id: "v3-3",
        colorName: "Maroon",
        colorHex: "#800020",
        Images: [
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
        ],
        Sizes: ["S", "M", "L"],
        stock: 10,
      },
    ],
    Description:
      "Made with 100% heavy organic cotton for ultimate comfort and relaxed street style.",
    IsFeatured: false,
  },
  {
    id: "4",
    Name: "Urban Knit Sneakers",
    Category: "Footwear",
    Price: 110,
    Images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    ],
    Variant: [
      {
        id: "v4-1",
        colorName: "Red",
        colorHex: "#E63946",
        Images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        ],
        Sizes: ["40", "41", "42", "43", "44"],
        stock: 14,
      },
      {
        id: "v4-2",
        colorName: "Navy Blue",
        colorHex: "#1D3557",
        Images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        ],
        Sizes: ["41", "42", "43", "44"],
        stock: 20,
      },
      {
        id: "v4-3",
        colorName: "Off White",
        colorHex: "#F1FAEE",
        Images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        ],
        Sizes: ["40", "42", "43"],
        stock: 9,
      },
    ],
    Description:
      "Breathable mesh upper with ultra-responsive cushioning for everyday active wear.",
    IsFeatured: true,
  },
  {
    id: "5",
    Name: "Smart Fitness Watch V2",
    Category: "Electronics",
    Price: 180,
    Images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    ],
    Variant: [
      {
        id: "v5-1",
        colorName: "White",
        colorHex: "#FFFFFF",
        Images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 15,
      },
      {
        id: "v5-2",
        colorName: "Black",
        colorHex: "#000000",
        Images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 22,
      },
      {
        id: "v5-3",
        colorName: "Light Pink",
        colorHex: "#FFB6C1",
        Images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 7,
      },
    ],
    Description:
      "Track your workouts, heart rate, and sleep quality with crisp OLED display.",
    IsFeatured: false,
  },
  {
    id: "6",
    Name: "Polarized Retro Sunglasses",
    Category: "Accessories",
    Price: 45,
    Images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    ],
    Variant: [
      {
        id: "v6-1",
        colorName: "Gold Frame",
        colorHex: "#FFD700",
        Images: [
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 16,
      },
      {
        id: "v6-2",
        colorName: "Black Frame",
        colorHex: "#1E1E1E",
        Images: [
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
        ],
        stock: 25,
      },
    ],
    Description:
      "UV400 protection with classic frame aesthetics that suit all face shapes.",
    IsFeatured: false,
  },
];

export const productsMap: Record<string, Product> = Allproducts.reduce(
  (acc, product) => {
    acc[product.id] = product;
    return acc;
  },
  {} as Record<string, Product>,
);

export default Allproducts;