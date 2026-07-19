import { Api } from "../../../shared/api/api-delivery";

export const getOrders = async () => {
  const res = await Api.get("/api/orders/my");
  return res.data;
};

export const editStatusOrders = async (id: string) => {
  const res = await Api(`/api/orders/${id}/delivered`, { method: 'PATCH' }); // تأكد من استخدام PATCH حسب توثيق الـ API الخاص بك
  return res.data;
};