import { useCartStore } from "../store/useCartStore";

export interface CartItemProps {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size?: string;
  image: string;
}

export function useCartItem(item: CartItemProps) {
  const increc = useCartStore((state) => state.increc);
  const decrec = useCartStore((state) => state.decrec);
  const remove = useCartStore((state) => state.remove);

  const total = item.price * item.quantity;

  const handleIncrease = () => increc(item.id, item.color, item.size);
  const handleDecrease = () => {
    if (item.quantity > 1) {
      decrec(item.id, item.color, item.size);
    }
  };
  const handleRemove = () => remove(item.id, item.color, item.size);

  return {
    total,
    handleIncrease,
    handleDecrease,
    handleRemove,
  };
}