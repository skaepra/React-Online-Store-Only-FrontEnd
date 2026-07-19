import { create } from "zustand";
import * as Location from "expo-location";
import { postLocation } from "../../Address/services/LocationService";

// تعريف الواجهة لتطابق ما يتم التعامل معه في التطبيق
type SimplifiedLocation = {
  latitude: number;
  longitude: number;
};

type UserAddress = {
  id: string; // تغيير إلى string بناءً على البيانات لديك (UUID)
  userId: string;
  label: string;
  addressType: number;
  latitude: number;
  longitude: number;
  buildingName: string;
  floor: string;
  doorInfo: string;
  notes: string;
  isDefault: boolean;
  isTemporary: boolean; // 👈 إضافة هذا الحقل الهام
  isActive: boolean;
  createdAt: string;
};

type LocationState = {
  location: SimplifiedLocation | null;
  hasPermission: boolean;
  isPermissionDenied: boolean;
  isLoading: boolean;
  hasExistingAddress: boolean;
  userAddresses: UserAddress[]; // 👈 حفظ العناوين داخل الـ state للرجوع إليها لاحقاً
  initLocation: (userAddresses?: UserAddress[]) => Promise<void>;
  requireLocationForOrder: () => Promise<SimplifiedLocation | null>;
  setSavedLocation: (lat: number, lng: number) => Promise<void>;
  setAddresses: (addresses: UserAddress[]) => void; // دالة لتحديث العناوين
};
export const useLocationStore = create<LocationState>((set, get) => ({
  location: null,
  hasPermission: false,
  isPermissionDenied: false,
  isLoading: false,
  hasExistingAddress: false,
  userAddresses: [], // القيمة الابتدائية

  setAddresses: (addresses) => set({ userAddresses: addresses }),

  initLocation: async (userAddresses = []) => {
    try {
      set({ isLoading: true, userAddresses }); // حفظ العناوين القادمة

      if (userAddresses && userAddresses.length > 0) {
        const defaultAddress = userAddresses.find((addr) => addr.isDefault) || userAddresses[0];

        set({
          location: {
            latitude: Number(defaultAddress.latitude),
            longitude: Number(defaultAddress.longitude),
          },
          hasPermission: true,
          isPermissionDenied: false,
          hasExistingAddress: true,
          isLoading: false,
        });
        return;
      }

      

      // 2. إذا لم يكن لديه أي عنوان، نطلب إذن الموقع فوراً
      const { status } = await Location.requestForegroundPermissionsAsync();

      // إذا رفض الإذن، نغير الحالة ليتم عرض الخريطة يدوياً
      if (status !== "granted") {
        set({
          hasPermission: false,
          isPermissionDenied: true,
          isLoading: false,
          location: null,
          hasExistingAddress: false,
        });
        return;
      }

      // 3. إذا وافق على الإذن، نجلب الموقع الحالي بالـ GPS ونرسله للسيرفر
      const geoPoints = await Location.getCurrentPositionAsync({});
      
      const newLocation = {
        latitude: geoPoints.coords.latitude,
        longitude: geoPoints.coords.longitude,
      };

      set({
        location: newLocation,
        hasPermission: true,
        isPermissionDenied: false,
        isLoading: false,
        hasExistingAddress: false,
      });

      // إرسال البيانات للباك إند ليتم تخزينها كـ Address
      await postLocation(newLocation).catch((err) => 
        console.log("Background API Error:", err)
      );

    } catch (e) {
      console.log("Error in initLocation:", e);
      set({ isLoading: false, isPermissionDenied: true, location: null });
    }
  },

  requireLocationForOrder: async () => {
    if (get().location) {
      return get().location;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      set({ hasPermission: false, isPermissionDenied: true });
      return null;
    }
    const geoPoints = await Location.getCurrentPositionAsync({});
    const newLocation = {
      latitude: geoPoints.coords.latitude,
      longitude: geoPoints.coords.longitude,
    };
    set({ location: newLocation, hasPermission: true, isPermissionDenied: false });
    return newLocation;
  },

  // 4. دالة اختيار الموقع يدوياً من الخريطة (في حال رفض الإذن)
  setSavedLocation: async (lat: number, lng: number) => {
    const newLocation = {
      latitude: lat,
      longitude: lng,
    };

    set({
      location: newLocation,
      hasPermission: true,
      isPermissionDenied: false, // نغلق حالة الرفض لأن المستخدم اختار عنوانه
      isLoading: false,
    });



    // إرسال الإحداثيات المختارة يدوياً من الخريطة للباك إند لتُخزن كـ Address
    await postLocation(newLocation).catch((err) =>
      console.log("Background Sync Saved Location Error:", err)
    );
  },
}));