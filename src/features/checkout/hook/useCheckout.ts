import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCartItems,
  selectCartQuantity,
  selectCartTotalPrice,
} from "../../cart/store/cartSelectors";
import { clearCart } from "../../cart/store/cartSlice";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../order/services/orderService";
import { AddressFormValues } from "../types/addressType";
import { CartItem } from "../../cart/types/CartItem";
import { checkoutSchema } from "../schemas/paymentSchema"; // 💡 تأكد من مسار الـ schema الصحيح لديك

const initialValues: AddressFormValues = {
  country: "Syria",
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  notes: "",
  paymentMethod: "COD",
  cardType: "Visa",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
};

export function useCheckout() {
  const navigate = useNavigate();
  const getTotals = useAppSelector(selectCartTotalPrice);
  const getAllQuantity = useAppSelector(selectCartQuantity);
  const cartItems = useAppSelector(selectCartItems) as CartItem[];
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<AddressFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({}); // 💡 كائن حفظ أخطاء الحقول
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

  const totals = getTotals;
  const totalQuantity = getAllQuantity;
  const shippingFee = totalQuantity * 4;
  const allTotal = totals + shippingFee;

  // دالة تحديث القيم ومسح الخطأ الخاص بالحقل فوراً أثناء الكتابة
  const onChangeHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    let { name, value } = event.target;

    // 1. تنسيق تاريخ الانتهاء تلقائياً (MM/YY)
    if (name === "cardExpiry") {
      // إزالة أي أحرف غير أرقام
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      
      // إضافة "/" تلقائياً بعد أول رقمين (الشهر)
      if (cleaned.length >= 3) {
        value = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      } else {
        value = cleaned;
      }
    }

    // 2. تنسيق رقم البطاقة تلقائياً (فصل كل 4 أرقام بمسافة - اختياري لزيادة الجمالية)
    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      value = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }

    // 3. تحديث القيم في الـ State
    setValues((prev) => ({ ...prev, [name]: value }));

    // مسح خطأ الحقل عند التعديل عليه
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLocationConfirm = (locationData: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setValues((prev) => ({
      ...prev,
      addressLine1: locationData.address || prev.addressLine1,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    }));
    
    // مسح خطأ العنوان إن وجد
    if (errors.addressLine1) {
      setErrors((prev) => ({ ...prev, addressLine1: "" }));
    }
    setShowMapModal(false);
  };

  // دالة التحقق عبر Zod Schema
  const validateForm = (): boolean => {
    const result = checkoutSchema.safeParse(values);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      const fieldErrors = result.error.flatten().fieldErrors;

      // 1. تجميع أخطاء الحقول الفردية
      Object.entries(fieldErrors).forEach(([key, messages]) => {
        if (Array.isArray(messages) && messages[0]) {
          formattedErrors[key] = messages[0];
        }
      });

      // 2. معالجة أخطاء الـ refine الخاصة بالبطاقة
      const rootErrors = result.error.format()._errors;
      if (rootErrors && rootErrors.length > 0 && !formattedErrors.cardNumber) {
        formattedErrors.cardNumber = rootErrors[0];
      }

      setErrors(formattedErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // 1. التحقق من أن السلة ليست فارغة
    if (!cartItems || cartItems.length === 0) {
      alert("السلة فارغة، يرجى إضافة منتجات إلى السلة أولاً.");
      return;
    }

    // 2. التحقق من البيانات باستخدام Zod
    const isValid = validateForm();
    if (!isValid) {
      return; // توقف الإرسال لوجود أخطاء في الحقول
    }

    try {
      setLoading(true);

      // 3. تجهيز عناصر الطلب
      const formattedItems = cartItems.map((item: CartItem) => ({
        productId: item.id,
        productName: item.name || (item as any).title,
        color: item.color,
        size: item.size,
        unitPrice: item.price,
        quantity: item.quantity,
      }));

      // 4. بناء الطلب النهائي
      const newOrder = {
        Country: values.country,
        City: values.city,
        FullName: values.fullName,
        Phone: values.phone,
        Email: values.email,
        Building: `${values.addressLine1}${
          values.addressLine2 ? ` - ${values.addressLine2}` : ""
        }`,
        DropoffLatitude: values.latitude || 0,
        DropoffLongitude: values.longitude || 0,
        PaymentMethod: values.paymentMethod === "COD" ? 0 : 1,
        PaymentStatus: values.paymentMethod === "Card" ? 1 : 0,
        TotalAmount: allTotal,
        Notes: values.notes || "",
        Items: formattedItems,
        PaymentInfo:
          values.paymentMethod === "Card"
            ? {
                cardType: values.cardType,
                cardNumber: values.cardNumber,
                cardExpiry: values.cardExpiry,
                cardCvv: values.cardCvv,
              }
            : null,
      };

      // 5. استدعاء API الـ Checkout الموحد
      await CreateOrder(newOrder as any);

      dispatch(clearCart());
      console.log("Order Processed Successfully:", newOrder);
      alert("Order and payment processed successfully!");
      navigate("/order");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    errors, // 💡 تم إرجاع كائن الأخطاء لاستخدامه في الواجهة
    loading,
    totalQuantity,
    totals,
    shippingFee,
    allTotal,
    showMapModal,
    setShowMapModal,
    onChangeHandler,
    handleLocationConfirm,
    onSubmit,
  };
}