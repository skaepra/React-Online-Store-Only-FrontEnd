import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Allproducts, {
  productsMap as allProductsMap,
} from "../../../data/Allproducts";
import homeProducts, {
  productsMap as homeProductsMap,
} from "../../../data/products";

import { Product } from "../types/product";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addToCart } from "../../cart/store/cartSlice";
import { selectWishlistItems } from "../store/WishlisSelectors";
import { toggleWishlist } from "../store/WishlistSlice";

const combinedAllProducts = [...Allproducts, ...homeProducts];

export function useProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product: Product | undefined = id
    ? allProductsMap[id] || homeProductsMap[id]
    : undefined;

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "details" | "reviews"
  >("description");
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlistItems);
  
  // جلب محتويات السلة من Redux (تأكدي أن اسم الـ slice هو cart)
  const cartItems = useAppSelector((state: any) => state.cart?.items || []);

  const isWishlisted = product
    ? wishlist.some((item: Product) => item.id === product.id)
    : false;

  // جلب المتغير الحالي بناءً على اللون
  const currentVariant = product?.Variant?.find(
    (v) => v.colorName === selectedColor
  );

  // إجمالي المخزون المتاح لهذا المتغير
  const currentStock =
    product?.Variant && product.Variant.length > 0
      ? currentVariant?.stock ?? 0
      : 99;

  // البحث عما إذا كان هذا المنتج (بنفس اللون والمقاس) موجوداً مسبقاً في السلة
  const existingCartItem = cartItems.find(
    (item: any) =>
      item.id === product?.id &&
      item.color === selectedColor &&
      item.size === selectedSize
  );

  const quantityInCart = existingCartItem ? existingCartItem.quantity : 0;

  // المخزون الحقيقي المتبقي للإضافة (المخزون الكلي مطروحاً منه ما تم وضعه في السلة)
  const remainingStock = Math.max(0, currentStock - quantityInCart);

  // الصور والسعر الحالي
  const currentImages =
    currentVariant?.Images && currentVariant.Images.length > 0
      ? currentVariant.Images
      : product?.Images || [];

  const currentPrice = currentVariant?.Price ?? product?.Price ?? 0;

  // تهيئة القيم عند تحميل المنتج أو تغيير الـ id
  useEffect(() => {
    if (product) {
      if (product.Variant && product.Variant.length > 0) {
        const firstVariant = product.Variant[0];
        setSelectedColor(firstVariant.colorName);
        setSelectedImage(
          firstVariant.Images?.[0] || product.Images?.[0] || ""
        );
        setSelectedSize(firstVariant.Sizes?.[0] || "");
      } else {
        setSelectedColor("");
        setSelectedImage(product.Images?.[0] || "");
        setSelectedSize("");
      }
      setQuantity(1);
    }
  }, [id, product]);

  // عند تغير اللون، نعيد ضبط الكمية المختارة لتلائم المتبقي
  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
    if (product?.Variant) {
      const variant = product.Variant.find((v) => v.colorName === colorName);
      if (variant) {
        if (variant.Images && variant.Images.length > 0) {
          setSelectedImage(variant.Images[0]);
        }
        if (variant.Sizes && variant.Sizes.length > 0) {
          setSelectedSize(variant.Sizes[0]);
        } else {
          setSelectedSize("");
        }
      }
    }
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!product || remainingStock <= 0) return;

    // التأكد من أن الكمية المضافة لا تتجاوز المتبقي في المخزون
    const finalQuantityToAdd = Math.min(quantity, remainingStock);

    dispatch(
      addToCart({
        id: product.id,
        name: product.Name,
        price: currentPrice,
        image: selectedImage,
        color: selectedColor,
        size: selectedSize,
        quantity: finalQuantityToAdd,
        stock: currentStock,
      })
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
    
    // إعادة ضبط العداد للمتبقي إن وجد
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    if (product) {
      dispatch(toggleWishlist(product));
    }
  };

  // التحكم بالكمية بحيث لا تتجاوز المخزون المتبقي الفعلي
  const incrementQuantity = () =>
    setQuantity((q) => (q < remainingStock ? q + 1 : q));
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const relatedProducts = product
    ? combinedAllProducts.filter(
        (p) => p.Category === product.Category && p.id !== product.id
      )
    : [];

  return {
    product,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor: handleColorSelect,
    selectedSize,
    setSelectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    activeTab,
    setActiveTab,
    addedToast,
    isWishlisted,
    handleAddToCart,
    handleToggleWishlist,
    relatedProducts,
    currentImages,
    currentPrice,
    currentStock: remainingStock, 
    navigate,
  };
}