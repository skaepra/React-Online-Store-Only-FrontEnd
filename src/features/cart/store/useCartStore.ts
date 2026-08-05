import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/CartItem";

export interface AddToCartInput {
  id: string | number;
  Price: number;
  PriceOverride?: number;
  Images?: string[];
  image?: string;
  Name?: string;
  quantity?: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  storitems: CartItem[];
  carId: { id?: string | number };

  // Getters لحساب القيم المشتقة تلقائياً
  getTotals: () => number;
  getAllQuantity: () => number;

  checkCar: (id: string | number) => void;
  Quantity: (id: string | number, itemColor?: string) => number;
  addToCart: (product: AddToCartInput) => void;
  increc: (id: string | number, color: string, size?: string) => void;
  decrec: (id: string | number, color: string, size?: string) => void;
  remove: (id: string | number, color: string, size?: string) => void;
  clearCart: () => void;
  
  // دالة لتحديث الأسعار عند الحصول على أحدث البيانات من الباك إند
  syncLatestPrices: (latestProducts: { id: string | number; price: number }[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      storitems: [],
      carId: {},

      checkCar: (id) => set({ carId: { id } }),

      // 1. حساب الإجمالي ديناميكياً بدلاً من حفظه
      getTotals: () => {
        return get().storitems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      // 2. حساب إجمالي الكمية ديناميكياً
      getAllQuantity: () => {
        return get().storitems.reduce((sum, item) => sum + item.quantity, 0);
      },

      Quantity: (id, itemColor) => {
        const items = get().storitems;
        if (itemColor) {
          return (
            items.find(
              (item) =>
                String(item.id) === String(id) && item.color === itemColor
            )?.quantity || 0
          );
        }
        return (
          items.find((item) => String(item.id) === String(id))?.quantity || 0
        );
      },

      addToCart: (product) =>
        set((state) => {
          const qtyToAdd = product.quantity || 1;
          const name = product.Name || "منتج بدون اسم";
          const price = product.PriceOverride ?? product.Price ?? 0;
          const color = product.selectedColor || "default";
          const size = product.selectedSize || "";
          const image = product.Images?.[0] || product.image || "";

          const existingIndex = state.storitems.findIndex(
            (item) =>
              String(item.id) === String(product.id) &&
              item.color === color &&
              item.size === size
          );

          if (existingIndex > -1) {
            const updatedItems = state.storitems.map((item, idx) =>
              idx === existingIndex
                ? { ...item, quantity: item.quantity + qtyToAdd }
                : item
            );

            return { storitems: updatedItems };
          }

          return {
            storitems: [
              ...state.storitems,
              {
                id: product.id,
                name,
                quantity: qtyToAdd,
                color,
                size,
                price,
                image,
                title: name,
              },
            ],
          };
        }),

      increc: (id, itemColor, size) =>
        set((state) => ({
          storitems: state.storitems.map((item) =>
            String(item.id) === String(id) &&
            item.color === itemColor &&
            (!size || item.size === size)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decrec: (id, itemColor, size) =>
        set((state) => ({
          storitems: state.storitems.map((item) =>
            String(item.id) === String(id) &&
            item.color === itemColor &&
            (!size || item.size === size) &&
            item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),

      remove: (id, itemColor, size) =>
        set((state) => ({
          storitems: state.storitems.filter(
            (item) =>
              !(
                String(item.id) === String(id) &&
                item.color === itemColor &&
                (!size || item.size === size)
              )
          ),
        })),

      clearCart: () => set({ storitems: [] }),

      // 3. تحديث الأسعار بالسعر الجديد من الباك إند
      syncLatestPrices: (latestProducts) =>
        set((state) => ({
          storitems: state.storitems.map((item) => {
            const freshProduct = latestProducts.find(
              (p) => String(p.id) === String(item.id)
            );
            return freshProduct ? { ...item, price: freshProduct.price } : item;
          }),
        })),
    }),
    {
      name: "shopping-cart-storage",
      // تخزين العناصر فقط واستبعاد باقي الخواص
      partialize: (state) => ({ storitems: state.storitems }),
    }
  )
);