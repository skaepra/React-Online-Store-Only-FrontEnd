export type OrderItemType = {
  id: string;
  productName: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  customerNote: string;
};

export type orderType = {
  id: string;
  publicId: string;
  orderType: number;
  customerId: string;
  merchantId: string; // بديل لـ restaurantId
  pickupLatitude: number;
  pickupLongitude: number;
  dropoffLatitude: number;
  dropoffLongitude: number;
  distanceKm: number;
  itemsTotal: number;
  deliveryFee: number;
  tipAmount: number;
  totalAmount: number; // بديل لـ totalPrice
  paymentMethod: number; // رقمي من السيرفر
  paymentStatus: number;
  status: number; // الرقم الحالي لحالة الطلب (بديل لـ orderState)
  requiredDriversCount: number;
  createdAt: string;
  deliveredAt: string | null;
  items: OrderItemType[];
};