import { useCartStore } from "../store/useCartStore";
import { CartItem } from "../types/CartItem";



export function useShoppingCart() {
  const storitems = useCartStore((state) => state.storitems);
  const getTotals = useCartStore((state) => state.getTotals);
  const getAllQuantity = useCartStore((state) => state.getAllQuantity);

  const totals = getTotals();
  const totalQuantity = getAllQuantity();
  const shippingFee = totalQuantity * 4;
  const allTotal = totals + shippingFee;
  const isEmpty = storitems.length === 0;

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  //  إنشاء معرف فريد ومستقر لكل عنصر في قائمة السلة
  const getItemKey = (item: CartItem) =>
    `${String(item.id)}-${item.color}-${item.size || "default"}`;

  return {
    storitems,
    totals,
    shippingFee,
    allTotal,
    isEmpty,
    handleCheckout,
    getItemKey,
  };
}