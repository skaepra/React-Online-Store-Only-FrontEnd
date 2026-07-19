import { Api } from "../../../shared/api/api-delivery";
import { MerchantCategory } from "../types/MerchantCategory";


// 2. دالة جلب تصنيفات المتجر بناءً على الـ id
export async function getMerchantCategories(merchantId: string): Promise<MerchantCategory[]> {
  // تم إزالة /api تماشياً مع الـ Base URL الموحد لديك
  const res = await Api.get(`/api/catalog/merchants/${merchantId}/categories`);
  return res.data;
}