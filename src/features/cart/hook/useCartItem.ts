import { useAppDispatch } from "../../../store/hooks";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../store/cartSlice";

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
  stock?: number; 
}

export function useCartItem(item: CartItemProps) {
  const dispatch = useAppDispatch();

  const total = item.price * item.quantity;
  const maxStock = item.stock ?? 99;

  const handleIncrease = () => {
    if (item.quantity < maxStock) {
      dispatch(increaseQuantity({ id: item.id, color: item.color, size: item.size }));
    }
  };

  const handleDecrease = () => 
    dispatch(decreaseQuantity({ id: item.id, color: item.color, size: item.size }));

  const handleRemove = () => 
    dispatch(removeFromCart({ id: item.id, color: item.color, size: item.size }));

  // لمعرفة ما إذا تم الوصول للحد الأقصى للمخزون (مفيد لتعطيل زر الـ + في الواجهة)
  const isMaxStock = item.quantity >= maxStock;

  return {
    total,
    handleIncrease,
    handleDecrease,
    handleRemove,
    isMaxStock,
  };
}