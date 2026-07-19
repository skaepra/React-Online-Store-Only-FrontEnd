export type UserAddressResponse= {
  id: string;
  userId: string;
  label: string; // تعادل الـ title سابقاً (مثل: منزلي، العمل)
  addressType: number;
  latitude: number;
  longitude: number;
  buildingName: string;
  floor: string;
  doorInfo: string;
  notes: string;
  isDefault: boolean;
  isTemporary: boolean;
  isActive: boolean;
  createdAt: string;
}