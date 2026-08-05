import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { tokens } from "../../../../../packages/shared-styles/src/tokens";

// 1. استيراد الخريطة الخاصة بك
import LocationPickerMap from "../../checkout/components/LocationPickerMap";

// 2. استيراد دالة postLocation التي تعتمد على الـ Api الجديد الخاص بك
import { postLocation } from "../services/LocationService"; // تأكد من مطابقة مسار الملف لديك


export default function AddAddressScreen() {
  const navigation = useNavigation<any>();

  // التحكم بظهور الخريطة
  const [showMap, setShowMap] = useState(false);

  // حفظ بيانات الموقع المختار من الخريطة
  const [deliveryLocation, setDeliveryLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);

  // حالات التحميل والأخطاء
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // دالة التحقق من وجود الموقع
  const validateFields = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!deliveryLocation) {
      tempErrors.location = "يرجى تحديد موقع العنوان على الخريطة أولاً";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 🚀 دالة إرسال الموقع للباك إند والانتقال للخطوة التالية عند الضغط على الزر
  const handleNextStep = async () => {
  if (!validateFields() || !deliveryLocation) return;

  try {
    setIsLoading(true);

    // الخطوة 1: إنشاء العنوان المبدئي بالإحداثيات
    const locationResponse = await postLocation({
      latitude: deliveryLocation.latitude,
      longitude: deliveryLocation.longitude,
    });

    const addressId = locationResponse?.id;

    if (!addressId) {
      throw new Error("لم يتم إرجاع معرف العنوان من السيرفر.");
    }

    // 🎉 الخطوة 2: التوجيه إلى شاشة التعديل المتوفرة لديك مع تمرير البيانات البدئية للـ Hook
    navigation.navigate("EditAddress", {
      addressToEdit: {
        id: addressId,
        isTemporary: true, // 🌟 لتفعيل دالة patchMyAddressComplete داخل الـ Hook تلقائياً
        label: "",
        buildingName: "",
        floor: "",
        doorInfo: "",
        notes: "",
        addressType: 1,
      },
    });

  } catch (error: any) {
    console.error("Error posting location:", error);
    Alert.alert(
      "خطأ في الاتصال",
      error?.response?.data?.message || "حدث خطأ أثناء تحديد الموقع، يرجى المحاولة مرة أخرى."
    );
  } finally {
    setIsLoading(false);
  }
};

  // إذا كانت الخريطة مفتوحة، يتم عرضها بكامل الشاشة
  if (showMap) {
    return (
      <LocationPickerMap
        onConfirm={(location) => {
          setDeliveryLocation(location); // تعيين الـ latitude والـ longitude والـ address من الخريطة
          setShowMap(false); // إغلاق الخريطة والعودة
          if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
        }}
      />
    );
  }

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 40 }}
    >

      {/* قسم تحديد الموقع من الخريطة */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>حدد موقعك على الخريطة</Text>

     {deliveryLocation ? (
                   // إذا اختار الموقع تظهر تفاصيله وزر التغيير
                   <View style={{ marginBottom: 10 }}>
                     <View style={styles.contenerAddress}>
                       <Ionicons
                         name="location"
                         size={18}
                         color={tokens.colors.primary}
                       />
                       <Text style={styles.address}>{deliveryLocation.address}</Text>
                     </View>
                     <Pressable
                       style={styles.buttonChangLocation}
                       onPress={() => setShowMap(true)}
                     >
                       <Text style={styles.buttonText}> تغيير الموقع المتجر</Text>
                     </Pressable>
                   </View>
                 ) : (
                   // إذا لم يختبر بعد يظهر زر واضح لفتح الخريطة
                   <View style={{ marginVertical: 8 }}>
                     <Pressable
                       style={[
                         styles.button,
                         !!(errors.latitude || errors.longitude) && {
                           borderColor: tokens.colors.dangerRose,
                           borderWidth: 1,
                         },
                       ]}
                       onPress={() => setShowMap(true)}
                     >
                       <Text style={styles.buttonText}>
                          اضغط هنا لاظهار الخريطة 📍
                       </Text>
                     </Pressable>
                     {/* عرض خطأ التحقق في حال نسي تحديد الموقع */}
                     {!!(errors.latitude || errors.longitude) && (
                       <Text
                         style={{
                           color: tokens.colors.dangerRose,
                           marginTop: 4,
                           marginLeft: 15,
                         }}
                       >
                         يرجى تحديد موقع المتجر على الخريطة أولاً
                       </Text>
                     )}
                   </View>
                 )}
      </View>

      {/* زر إرسال الموقع والانتقال لشاشة التفاصيل */}
      <Pressable
        style={[styles.saveButton, isLoading && { opacity: 0.7 }]}
        onPress={handleNextStep}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.saveButtonText}>التالي: إكمال التفاصيل </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color="#fff"
              style={{ marginRight: 5 }}
            />
          </View>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: tokens.colors.background, direction: "rtl" },

  section: {
    backgroundColor: tokens.colors.background,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: tokens.colors.text,
    marginBottom: 12,
  },
  contenerAddress: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: tokens.colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: tokens.colors.textMuted,
  },
  address: {
    flex: 1,
    fontSize: 14,
    color: tokens.colors.text,
    marginRight: 8,
  },
  errorText: { color: "red", marginTop: 4, textAlign: "right", fontSize: 13 },
  saveButton: {
    backgroundColor: tokens.colors.primary,
    marginHorizontal: 16,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
    button: {
    alignItems: "center",
    backgroundColor: tokens.colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: tokens.colors.surface,
    height: 45,
    position: "relative",
    justifyContent: "center",
  },
  buttonChangLocation: {
    marginTop: 16,
    alignItems: "center",
    backgroundColor: tokens.colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: tokens.colors.surface,
    height: 45, // الارتفاع الثابت للحقول العادية
    position: "relative",
    justifyContent: "center",
  },
  buttonText: {
    color: tokens.colors.textMuted,
    fontWeight: "600",
    fontSize: 14,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
