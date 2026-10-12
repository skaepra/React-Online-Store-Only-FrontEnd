import Api from "../../../shared/api/apis";
import { orderType } from "../types/orderType";


export type CreateOrderPayload = {
  country: string;
  city: string;
  fullName: string;
  phone: string;
  email: string;
  building: string;
  dropoffLatitude: number;
  dropoffLongitude: number;
  paymentMethod: number;
  notes?: string;
  items: {
    productName: string;
    color?: string[];
    unitPrice: number;
    quantity: number;
  }[];
};

// جلب قائمة الطلبات
export const getOrders = async () => {
  const res = await Api.get<orderType[]>("/api/orders");
  return res.data;
};

// إنشاء طلب جديد
export const CreateOrder = async (data: CreateOrderPayload) => {
  const res = await Api.post<orderType>("/api/createOrder", data);
  return res.data;
};