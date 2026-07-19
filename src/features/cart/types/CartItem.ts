export type CartItem = {
  id: string; // productId_variantId
  productId: string;
  CategoryId: string; // يمثل هنا الـ merchantCategoryId (القسم)
  merchantId: string;  // 🌟 المعرف الفريد للمطعم نفسه (UUID)
  name: string;
  description: string;
  price: number;
  note: string;
  quantity: number;
  total: number;
  variantName?: string;
  variantId: string | null;
  imageUrl?: string;
};

