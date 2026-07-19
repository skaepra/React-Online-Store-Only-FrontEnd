import { useCartStore } from "../../cart/store/CartStore";

type Product = {
  productId: string;
  CategoryId: string;
  merchantId: string;
  name: string;
  description: string;
  price: number;
  note?: string;
  quantity: number;
  total: number;
  variantName?: string;
  variantId: string | null;
};

export const useProductActions = () => {
  const cart = useCartStore((state) => state.cart);
  const addToCartStore = useCartStore((state) => state.addToCart);
  const clearCartStore = useCartStore((state) => state.clearCart);
  const updateCartItemStore = useCartStore((state) => state.updateCartItem);
  const removeFromCartStore = useCartStore((state) => state.removeFromCart);

  const addProductToCart = async (
    product: Product,
    forceAdd = false,
    cartItemId?: string,
  ) => {
    // 1. التحقق من المطاعم المختلفة
    if (cart && cart.length > 0) {
    const firstItemMerchantId = cart[0].merchantId;

      if (firstItemMerchantId !== product.merchantId) {
        if (forceAdd) {
          try {
            clearCartStore();
          } catch (clearError) {
            console.log("Failed to clear cart:", clearError);
            throw new Error("حدث خطأ أثناء محاولة تفريغ السلة القديمة");
          }

          // توليد معرف مبدئي للمنتج الجديد بعد مسح السلة
          const newId = product.variantId
            ? `${product.productId}_${product.variantId}`
            : product.productId;
          // 🌟 تأكيد تمرير الـ variantId هنا أيضاً عند تبديل السلة قسرياً
          addToCartStore({
            ...product,
            id: newId,
            variantId: product.variantId,
            merchantId: product.merchantId,
            note: product.note || "",
          });
          return { success: true, clearedAndAdded: true };
        }

        return {
          success: false,
          error: "DIFFERENT_RESTAURANT",
          message: "السلة تحتوي على منتجات من مطعم آخر.",
        };
      }
    }

    // توحيد الاسم إلى targetItemId لمنع أخطاء المتغيرات غير المعرفة
    const targetItemId = product.variantId
      ? `${product.productId}_${product.variantId}`
      : product.productId;

    // 🌟 وضع التعديل (Edit Mode)
    if (cartItemId) {

      if (cartItemId !== targetItemId) {
        removeFromCartStore(cartItemId);

        addToCartStore({
          ...product,
          id: targetItemId,
          note: product.note || "",
          variantName: product.variantName,
          variantId: product.variantId,
          merchantId: product.merchantId,
        });
      } else {

        // 💡 تأكيد إرسال الحقول بالكامل هنا كإجراء احترازي
        updateCartItemStore(cartItemId, {
          price: product.price,
          quantity: product.quantity,
          note: product.note || "",
          variantName: product.variantName,
          variantId: product.variantId, // نضمن بقاءه
          total: product.total,
        });
      }
      return { success: true, updated: true };
    }

    // 3. وضع الإضافة العادية (تجميع الكميات من خارج الكتالوج)
    const existingItem = cart.find((item) => item.id === targetItemId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + product.quantity;
      updateCartItemStore(existingItem.id, {
        quantity: newQuantity,
        total: existingItem.price * newQuantity,
        // 🌟 الإصلاح الأساسي هنا:
        variantId: product.variantId ?? existingItem.variantId,
        variantName: product.variantName ?? existingItem.variantName,
        note: product.note || existingItem.note,
      });
      return { success: true, updated: true };
    }

    // إضافة منتج جديد بالكامل لأول مرة
    // 🌟 تأكيد تمرير الـ variantId عند الإضافة الطبيعية الأولى
    addToCartStore({
      ...product,
      id: targetItemId,
      variantId: product.variantId,
      merchantId: product.merchantId,
      note: product.note || "",
    });
    return { success: true, updated: false };
  };

  return { addProductToCart };
};
