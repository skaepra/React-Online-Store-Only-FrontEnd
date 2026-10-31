export type OrderItemType = {
  id: string | number;
  productName: string;
  color?: string | string[];
  size?: string; 
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type orderType = {
  id: string;
  Country: string;
  City: string;
  fullName: string;
  phone: string;
  email: string;
  building: string;
  dropoffLatitude: number;
  dropoffLongitude: number;
  paymentMethod: number;
  paymentStatus: number; // مثلاً: 0 معلق، 1 مدفوع
  status: number;
  Notes?: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItemType[];
};