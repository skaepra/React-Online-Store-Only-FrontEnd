import { useState, ChangeEvent, FormEvent } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectCartItems, selectCartQuantity, selectCartTotalPrice } from "../../cart/store/cartSelectors";
import { clearCart } from "../../cart/store/cartSlice";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../order/services/orderService";
import { AddressFormValues } from "../types/addressType";

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
};

export function useCheckout() {
  const navigate = useNavigate();
  const getTotals = useAppSelector(selectCartTotalPrice);
  const getAllQuantity = useAppSelector(selectCartQuantity);
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<AddressFormValues>(initialValues);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

  const totals = getTotals;
  const totalQuantity = getAllQuantity;
  const shippingFee = totalQuantity * 4;
  const allTotal = totals + shippingFee;

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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
    setShowMapModal(false);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // 1. التحقق من السلة
    if (!cartItems || cartItems.length === 0) {
      alert("السلة فارغة، يرجى إضافة منتجات إلى السلة أولاً.");
      return;
    }

    // 2. التحقق من البيانات المدخلة
    if (!values.fullName || !values.phone || !values.addressLine1) {
      alert("Please fill in all required fields (Name, Phone, and Address).");
      return;
    }

    try {
      setLoading(true);

     const formattedItems = cartItems.map((item: any) => ({
        productName: item.name,
        color: item.color,
        unitPrice: item.price,
        quantity: item.quantity,
      }));

     const newOrder = {
        Country: values.country,
        City: values.city,
        FullName: values.fullName,
        Phone: values.phone,
        Email: values.email,
        Building: values.addressLine1 || values.addressLine2, // أو دمجهم حسب ما يناسب نموذجك
        DropoffLatitude: values.latitude || 0,
        DropoffLongitude: values.longitude || 0,
        PaymentMethod: values.paymentMethod === "COD" ? 0 : 1, // 0 للدفع عند الاستلام، 1 للبطاقة
        Notes: values.notes || "",
        Items: formattedItems,
      };

      await CreateOrder(newOrder as any);

      if (clearCart) 
        dispatch(clearCart());
      alert("Order placed successfully!");
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