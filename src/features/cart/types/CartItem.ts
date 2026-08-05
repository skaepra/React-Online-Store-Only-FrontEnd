export type CartItem = {
  id: string | number;
  name: string;
  quantity: number;
  color: string;
  size: string;
  price: number; // السعر للعرض المحلي السريع
  image: string;
  title?: string;
};

