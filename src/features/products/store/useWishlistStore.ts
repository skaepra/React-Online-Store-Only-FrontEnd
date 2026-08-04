import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";


interface WishlistState {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      // إضافة أو حذف المنتج إذا كان موجوداً مسبقاً
      toggleWishlist: (product) => {
        const { wishlist } = get();
        const exists = wishlist.some((item) => item.id === product.id);

        if (exists) {
          set({
            wishlist: wishlist.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            wishlist: [...wishlist, product],
          });
        }
      },

      // التحقق مما إذا كان المنتج في المفضلات
      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId);
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "wishlist-storage", // الاسم الذي سيُحفظ به في LocalStorage
    }
  )
);