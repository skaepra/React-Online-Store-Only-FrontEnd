import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/CartItem";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

interface Cartinformation {
  id: string;
  color: string;
  size: string;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size,
      );

      if (existingItem) {
        // التأكد من أن الإجمالي لا يتجاوز المخزون المخزن
        const maxStock = action.payload.stock ?? existingItem.stock ?? 99;
        const newQuantity = existingItem.quantity + action.payload.quantity;
        existingItem.quantity = Math.min(newQuantity, maxStock);
        if (action.payload.stock !== undefined) {
          existingItem.stock = action.payload.stock;
        }
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart(state, action: PayloadAction<Cartinformation>) {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size
          ),
      );
    },

    clearCart(state) {
      state.items = [];
    },

    increaseQuantity(state, action: PayloadAction<Cartinformation>) {
      state.items = state.items.map((item) => {
        if (
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
        ) {
          const maxStock = item.stock ?? 99;
          // منع تجاوز المخزون عند الضغط على زر الزيادة (+)
          if (item.quantity < maxStock) {
            return { ...item, quantity: item.quantity + 1 };
          }
        }
        return item;
      });
    },

    decreaseQuantity(state, action: PayloadAction<Cartinformation>) {
      state.items = state.items.map((item) =>
        item.id === action.payload.id &&
        item.color === action.payload.color &&
        item.size === action.payload.size &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;