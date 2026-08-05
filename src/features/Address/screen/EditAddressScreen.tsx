import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BaseInput from "../../../shared/components/input/BaseInput";
import { tokens } from "../../../../../packages/shared-styles/src/tokens";
import { useEditAddress } from "../hooks/useEditAddress"; // استيراد الـ Hook

export default function EditAddressScreen() {
  const {
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
  } = useEditAddress();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.sectionTitle}>تعديل معلومات التوصيل</Text>

      {/* حقل اسم مخصص للعنوان */}
      <BaseInput
        icon="bookmark-outline"
        placeholder="اسم العنوان مثال: بيتي، العمل، منزل جدي..."
        value={label}
        onChangeText={setLabel}
      />

      {/* نوع العنوان (منزل / عمل) */}
      <View style={styles.typeContainer}>
        <Text style={styles.labelTitle}>نوع الموقع:</Text>
        <View style={styles.buttonGroup}>
          <Pressable
            style={[styles.typeButton, addressType === 1 && styles.activeButton]}
            onPress={() => setAddressType(1)}
          >
            <Ionicons
              name="home-outline"
              size={18}
              color={addressType === 1 ? tokens.colors.white : tokens.colors.textMuted}
            />
            <Text style={[styles.typeText, addressType === 1 && styles.activeText]}>
              منزل
            </Text>
          </Pressable>

          <Pressable
            style={[styles.typeButton, addressType === 2 && styles.activeButton]}
            onPress={() => setAddressType(2)}
          >
            <Ionicons
              name="briefcase-outline"
              size={18}
              color={addressType === 2 ? tokens.colors.white : tokens.colors.textMuted}
            />
            <Text style={[styles.typeText, addressType === 2 && styles.activeText]}>
              العمل
            </Text>
          </Pressable>
        </View>
      </View>

      {/* تفاصيل البناء والسكن */}
      <BaseInput
        icon="business-outline"
        placeholder="اسم البناء / رقم المبنى"
        value={buildingName}
        onChangeText={setBuildingName}
      />

      <View style={styles.row}>
        <View style={styles.flexFieldInput}>
          <BaseInput
            icon="layers-outline"
            placeholder="الطابق"
            value={floor}
            onChangeText={setFloor}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.flexField}>
          <BaseInput
            icon="enter-outline"
            placeholder="رقم الباب"
            value={doorInfo}
            onChangeText={setDoorInfo}
          />
        </View>
      </View>

      {/* ملاحظات إضافية للمندوب */}
      <BaseInput
        icon="document-text-outline"
        placeholder="ملاحظات إضافية للموقع (اختياري)..."
        value={notes}
        onChangeText={setNotes}
      />

      {/* زر الحفظ */}
      <Pressable
        style={[styles.saveButton, isSaving && styles.disabledButton]}
        onPress={handleSaveChanges}
        disabled={isSaving}
      >
        {isSaving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>حفظ التعديلات</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
    padding: 20,
    direction: "rtl",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: tokens.colors.text,
    marginBottom: 20,
    marginTop: 10,
  },
  labelTitle: {
    fontSize: 14,
    color: tokens.colors.text,
    marginBottom: 12,
  },
  typeContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  typeButton: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: tokens.colors.textMuted,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: tokens.colors.surface,
  },
  activeButton: {
    backgroundColor: tokens.colors.primary,
    borderColor: tokens.colors.primary,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  typeText: {
    fontSize: 14,
    color: tokens.colors.textMuted,
    marginHorizontal: 5,
  },
  row: {
    flexDirection: "row-reverse",
  },
  flexField: {
    flex: 1,
  },
  flexFieldInput: {
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: tokens.colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});