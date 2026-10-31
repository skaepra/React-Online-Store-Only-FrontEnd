import { OrderItemType, orderType } from "../../order/types/orderType";

// البيانات التي يرسلها العميل من واجهة الـ Checkout
export type CheckoutPayload = {
  Country: string;
  City: string;
  fullName: string;
  phone: string;
  email: string;
  building: string;
  dropoffLatitude: number;
  dropoffLongitude: number;
  paymentMethod: number;
  Notes?: string;
  items: OrderItemType[];
  totalAmount: number;
  // بيانات البطاقة الوهمية (تستخدم فقط للـ Simulation إذا كانت طريقة الدفع بطاقة)
  paymentInfo?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
};

// الرد الذي يعود به الـ API الموحد عند النجاح
export type CheckoutResponse = {
  success: boolean;
  message: string;
  order: orderType; // يعود الطلب كاملاً مع الـ ID وتاريخ الإنشاء
};

export interface AddressFormValues {
  country: string;
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  notes?: string;
  paymentMethod: "COD" | "Card";
  cardType?: "Visa" | "MasterCard" | "Mada";
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  latitude?: number;
  longitude?: number;
}