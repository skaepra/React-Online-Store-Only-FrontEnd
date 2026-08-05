import { Api } from "../../../shared/api/api-delivery";
import { UserAddressResponse } from "../../google-map/types/UserAddressResponse";

// 1. تعريف واجهات البيانات (Interfaces) لتأمين الـ Type Safety أثناء التمرير
export interface UpdateAddressDetailsPayload {
  label: string;
  addressType: number;
  buildingName: string;
  floor: string;
  doorInfo: string;
  notes?: string; // علامة الاستفهام تعني أنه اختياري
}

export interface UpdateAddressLocationPayload {
  latitude: number;
  longitude: number;
}

// 2. دالة جلب جميع عناوين المستخدم الحالية
export async function getMyAddress(): Promise<UserAddressResponse[]> {
  const res = await Api.get("/api/addresses/my");
  return res.data;
}

// 3. دالة تعديل تفاصيل العنوان (اسم البناء، الطابق، الملاحظات...)
export async function patchMyAddressDetails(
  id: string,
  payload: UpdateAddressDetailsPayload,
): Promise<any> {
  const res = await Api.patch(`/api/addresses/${id}/details`, payload);
  return res.data;
}

export async function patchMyAddressComplete(
  id: string,
  payload: UpdateAddressDetailsPayload,
): Promise<any> {
  const res = await Api.patch(`/api/addresses/${id}/complete`, payload);
  return res.data;
}

// 4. دالة تعديل الإحداثيات الجغرافية للعنوان (الخريطة)
export async function patchMyAddressLocation(
  id: string,
  payload: UpdateAddressLocationPayload,
): Promise<any> {
  const res = await Api.patch(`/api/addresses/${id}/location`, payload);
  return res.data;
}

// 5. دالة تعيين عنوان معين كعنوان افتراضي (Default) للتوصيل
export async function patchMyAddressDefault(id: string): Promise<any> {
  const res = await Api.patch(`/api/addresses/${id}/default`);
  return res.data;
}
