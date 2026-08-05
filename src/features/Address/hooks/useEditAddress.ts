import { useState } from "react";
import { Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { UserAddressResponse } from "../../google-map/types/UserAddressResponse";
import {
  getMyAddress,
  patchMyAddressComplete,
  patchMyAddressDetails,
} from "../services/AddressService";
import { useLocationStore } from "../../google-map/hooks/useLocationStore";

export function useEditAddress() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  // استقبال بيانات العنوان الممررة من الباراميترز
  const { addressToEdit } = route.params as {
    addressToEdit: UserAddressResponse;
  };

  // حالات إدارة المدخلات (Form States) مأخوذة من القيمة البدئية للعنوان
  const [label, setLabel] = useState(addressToEdit?.label || "");
  const [buildingName, setBuildingName] = useState(
    addressToEdit?.buildingName || "",
  );
  const [floor, setFloor] = useState(addressToEdit?.floor || "");
  const [doorInfo, setDoorInfo] = useState(addressToEdit?.doorInfo || "");
  const [notes, setNotes] = useState(addressToEdit?.notes || "");
  const [addressType, setAddressType] = useState<number>(
    addressToEdit?.addressType || 1,
  );
  const [isSaving, setIsSaving] = useState(false);

  // دالة الحفظ وإرسال التعديلات للباك إند
  const handleSaveChanges = async () => {
    if (
      !label.trim() ||
      !buildingName.trim() ||
      !floor.trim() ||
      !doorInfo.trim()
    ) {
      Alert.alert("تنبيه", "يرجى ملء جميع الحقول الأساسية قبل الحفظ.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        label,
        addressType,
        buildingName,
        floor,
        doorInfo,
        notes: notes.trim() ? notes : undefined,
      };

      // الفحص الديناميكي لنوع العنوان (مؤقت أم دائم)
      if (
        addressToEdit?.isTemporary === true ||
        String(addressToEdit?.isTemporary) === "true"
      ) {
        await patchMyAddressComplete(addressToEdit.id, payload);
      } else {
        await patchMyAddressDetails(addressToEdit.id, payload);
      }

      // تحديث الـ Zustand Store محلياً فوراً
      const updatedAddresses = await getMyAddress();
      const setAddresses = useLocationStore.getState().setAddresses;
      if (setAddresses) {
        setAddresses(updatedAddresses);
      }

      Alert.alert("نجاح", "تم حفظ بيانات العنوان بنجاح.", [
        {
          text: "حسنًا",
          onPress: () => navigation.popToTop(),
        },
      ]);
    } catch (error) {
      console.error("Error saving address changes:", error);
      Alert.alert(
        "خطأ",
        "حدث خطأ أثناء حفظ التعديلات، يرجى المحاولة مرة أخرى.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    label,
    setLabel,
    buildingName,
    setBuildingName,
    floor,
    setFloor,
    doorInfo,
    setDoorInfo,
    notes,
    setNotes,
    addressType,
    setAddressType,
    isSaving,
    handleSaveChanges,
  };
}
