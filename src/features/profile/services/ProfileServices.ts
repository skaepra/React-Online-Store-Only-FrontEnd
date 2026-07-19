import { Api } from "../../../shared/api/api-delivery";

export interface UserProfileResponse {
  userId: string;
  publicId: string;
  phone: string;
  email: string;
  fullName: string;
  photoUrl: string | null;
  birthDate: string;
  isProfileComplete: boolean;
  customerAverageRating: number;
  customerRatingsCount: number;
}

// الواجهة الخاصة بالبيانات المرسلة للتعديل بناءً على الـ Swagger الخاص بك
export interface UpdateProfileInput {
  fullName?: string | null;
  birthDate?: string | null;
  photoUrl?: string | null;
  phone?: string | null;
  currentPassword?: string | null;
  newPassword?: string | null;
}

export const getMyProfile = async (): Promise<UserProfileResponse> => {
  const res = await Api.get("/api/identity/my-profile");
  return res.data;
};

// تحديث الدالة هنا لاستقبال الداتا
export const putMyProfile = async (data: UpdateProfileInput): Promise<UserProfileResponse> => {
  const res = await Api.put("/api/identity/my-profile", data);
  return res.data;
};