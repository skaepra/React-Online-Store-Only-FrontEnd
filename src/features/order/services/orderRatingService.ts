import { Api } from "../../../shared/api/api-delivery";

// دالة إرسال التقييم إلى السيرفر
export const createOrderRating = async (orderId: string, ratingData: { stars: number; comment: string }) => {
  const res = await Api.post(`/api/ratings/orders/${orderId}`, ratingData);
  return res.data;
};