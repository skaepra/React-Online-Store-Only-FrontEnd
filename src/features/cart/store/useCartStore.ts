import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string | number;
  quantity: number;
  color: string;
  image: string | number;
}

interface CartState {
  // State
  storitems: CartItem[];
  Totals: number;
  AllQuantity: number;
  carId: { id?: string | number };

  // Actions
  checkCar: (id: string | number) => void;
  increcTotal: (tot: number) => void;
  decrecTotal: (tot: number) => void;
  Quantity: (id: string | number, itemColor?: string) => number;
  add: (id: string | number, price: number, color: string, image: string | number) => void;
  increc: (id: string | number, color: string) => void;
  decrec: (id: string | number, color: string) => void;
  remove: (id: string | number, Tota: number, quantity: number, color: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      storitems: [],
      Totals: 0,
      AllQuantity: 0,
      carId: {},

      checkCar: (id) => set({ carId: { id } }),

      increcTotal: (tot) => set((state) => ({ Totals: state.Totals + tot })),
      decrecTotal: (tot) => set((state) => ({ Totals: state.Totals - tot })),

      Quantity: (id, itemColor) => {
        const items = get().storitems;
        if (itemColor) {
          return items.find((item) => item.id === id && item.color === itemColor)?.quantity || 0;
        }
        return items.find((item) => item.id === id)?.quantity || 0;
      },

      add: (id, price, color, image) =>
        set((state) => {
          const isExist = state.storitems.some((item) => item.id === id && item.color === color);
          if (isExist) return state;

          return {
            storitems: [...state.storitems, { id, quantity: 1, color, image }],
            AllQuantity: state.AllQuantity + 1,
            Totals: state.Totals + price,
          };
        }),

      increc: (id, itemColor) =>
        set((state) => {
          const isExist = state.storitems.some((item) => item.id === id && item.color === itemColor);
          if (!isExist) return state;

          return {
            storitems: state.storitems.map((item) =>
              item.id === id && item.color === itemColor
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            AllQuantity: state.AllQuantity + 1,
          };
        }),

      decrec: (id, itemColor) =>
        set((state) => {
          const targetItem = state.storitems.find((item) => item.id === id && item.color === itemColor);
          if (!targetItem || targetItem.quantity <= 1) return state;

          return {
            storitems: state.storitems.map((item) =>
              item.id === id && item.color === itemColor
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
            AllQuantity: state.AllQuantity - 1,
          };
        }),

      remove: (id, Tota, quantity, itemColor) =>
        set((state) => ({
          storitems: state.storitems.filter((item) => item.id !== id || item.color !== itemColor),
          Totals: state.Totals - Tota,
          AllQuantity: state.AllQuantity - quantity,
        })),
    }),
    {
      name: 'shopping-cart-storage',
    }
  )
);