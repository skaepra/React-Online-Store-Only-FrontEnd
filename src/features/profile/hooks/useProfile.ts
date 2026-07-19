import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getMyProfile, UserProfileResponse } from "../services/ProfileServices";
import { postLogout } from "../../auth/services/LogoutService";
import { getCustomDeviceID } from "../../../app/helper/getCustomDeviceID";
import { useAuthStore } from "../../auth/store/useAuthStore";
// إستيراد دالة مسح التوكن لو عندك (مثال: AsyncStorage أو SecureStore)
// import AsyncStorage from '@react-native-async-storage/async-storage';

export function useProfile() {
  const navigation = useNavigation<any>();
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. استخراج دالة clearAuthData من الـ Store
  const clearAuthData = useAuthStore((state) => state.clearAuthData);

  // جلب بيانات البروفايل
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const data = await getMyProfile();
        setProfile(data);
      } catch (error) {
        console.error("Fetch Profile Error:", error);
        Alert.alert("خطأ", "فشل في تحميل بيانات الملف الشخصي");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // تسجيل الخروج المحدث
  const handleLogout = async () => {
    try {
      setIsLoading(true); // تشغيل مؤشر التحميل أثناء الطلب

      // 1. إرسال الطلب للسيرفر
      await postLogout({
        deviceID: await getCustomDeviceID(),
        clientType: 1,
      });

      // 2. احذف التوكن أو بيانات الجلسة من الهاتف هنا
      await clearAuthData();

      Alert.alert("تم", "تم تسجيل الخروج بنجاح", [
        {
          text: "موافق",
          onPress: () => {
            // 3. توجيه المستخدم إلى صفحة تسجيل الدخول وتنظيف تاريخ الملاحة
            navigation.navigate("Login");
          },
        },
      ]);
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("خطأ", "فشل تسجيل الخروج، يرجى المحاولة مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert("تسجيل الخروج", "هل أنت متأكد أنك تريد تسجيل الخروج؟", [
      { text: "إلغاء", style: "cancel" },
      { text: "تأكيد", onPress: handleLogout },
    ]);
  };

  const settings = [
  
    {
      name: "سياسة الخصوصية و الأمان",
      onPress: () => {
        navigation.navigate("PrivacyPolicy");
      },
    },
    {
      name: "انضمام لنا كتاجر",
      onPress: () => {
        navigation.navigate("SignUpMarchant");
      },
    },
    { name: "تسجيل خروج", onPress: confirmLogout }, // هنا يتم استدعاء التنبيه ثم handleLogout
  ];

  return {
    profile,
    isLoading,
    settings,
  };
}
