import { Api } from "../../../shared/api/api-delivery";

// تحديث الـ Interface ليتطابق مع الـ Schema المتوقعة من الباك إند
export interface LocationPayload {
  latitude: number;
  longitude: number;
}

export async function postLocation(payload: LocationPayload) {
  // الاعتماد على مثيل Api وتمرير المسار الصحيح والـ payload في الـ Body
  const res = await Api.post("/api/addresses/location", payload);
  return res.data;
}