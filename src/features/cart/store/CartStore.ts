import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "../types/CartItem";

// 2. واجهة الـ Store
type CartState = {
  cart: CartItem[];
  addToCart: (
    product: CartItem,
    force?: boolean,
  ) => { success: boolean; error?: string };
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateCartItem: (itemId: string, updatedFields: Partial<CartItem>) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

// 3. مهايئ Expo Secure Store
const secureStorageAdapter = {
  getItem: async (name: string): Promise<string | null> => {
    return await localStorage.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await localStorage.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await localStorage.deleteItemAsync(name);
  },
};

// 4. إنشاء الـ Zustand Store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // إضافة أو تحديث منتج في السلة
      addToCart: (product, force = false) => {
        const currentCart = get().cart;

        if (
          currentCart.length > 0 &&
          currentCart[0].merchantId !== product.merchantId
        ) {
          if (!force) {
            return { success: false, error: "DIFFERENT_RESTAURANT" };
          }
          set({ cart: [] });
        }

        // 🌟 تحديث سحري: توحيد بناء الـ itemId ليعتمد على الـ variantId (UUID) وليس الاسم!
        const itemId = product.variantId
          ? `${product.productId}_${product.variantId}`
          : product.productId;

        const updatedCart = [...get().cart];
        const existingIndex = updatedCart.findIndex(
          (item) => item.id === itemId,
        );

        if (existingIndex > -1) {
          const item = updatedCart[existingIndex];
          const newQty = item.quantity + product.quantity;
          updatedCart[existingIndex] = {
            ...item,
            ...product, // ندمج البيانات الجديدة لضمان عدم ضياع الـ variantId
            id: itemId,
            quantity: newQty,
            total: (product.price || item.price) * newQty,
            note: product.note || item.note,
          };
        } else {
          // 🌟 نضمن إدراج الـ variantId وكل الحقول القادمة بشكل صريح مع الـ id الموحد
          updatedCart.push({
            ...product,
            id: itemId,
            variantId: product.variantId || null,
          });
        }

        set({ cart: updatedCart });
        return { success: true };
      },

      removeFromCart: (itemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId
              ? { ...item, quantity, total: item.price * quantity }
              : item,
          ),
        }));
      },

      // 🌟 التأكد من دمج الحقول بالكامل هنا أيضاً عند التعديل المباشر
      updateCartItem: (itemId, updatedFields) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  ...updatedFields,
                  // 🌟 تعديل صارم: لا تسمح باستبدال القيمة القديمة بـ null أو undefined
                  // طالما أن المعرف القديم موجود ولنفس العنصر
                  variantId:
                    updatedFields.variantId !== undefined
                      ? updatedFields.variantId
                      : item.variantId,

                  variantName:
                    updatedFields.variantName !== undefined
                      ? updatedFields.variantName
                      : item.variantName,
                  total:
                    (updatedFields.price ?? item.price) *
                    (updatedFields.quantity ?? item.quantity),
                }
              : item,
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce((sum, item) => sum + item.total, 0);
      },
    }),
    {
      name: "secure-cart-storage",
      storage: createJSONStorage(() => secureStorageAdapter),
    },
  ),
);
