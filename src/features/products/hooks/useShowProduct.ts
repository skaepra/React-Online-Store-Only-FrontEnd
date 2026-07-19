import { useState, useMemo } from "react";
import { useProductActions } from "./useProductActions";
import { useQuantity } from "./useQuantity";
import { VariantType } from "../types/VariantsType";

export const useShowProduct = (
  id: string,          
  price: number,
  CategoryId: string,
  merchantId: string,
  meta: { name: string; description: string },
  initialVariants: VariantType[] = [], 
  options?: {
    cartItemId?: string; 
    initialQuantity?: number;
    initialNote?: string;
    initialVariantName?: string;
    initialVariantId?: string | null; // 🌟 استقبال الـ ID البدئي
  }
) => {
  const { quantity, increase, decrease } = useQuantity(options?.initialQuantity ?? 1);
  const { addProductToCart } = useProductActions();
  const { name, description } = meta;

  const [note, setNote] = useState(options?.initialNote ?? "");
  

  const sortedVariants = useMemo(() => {
    return [...initialVariants]
      .filter((v) => v.productId === id && v.isActive) 
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [initialVariants, id]);

 // 🌟 تحديث منطق التعيين البدئي للـ ID
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(() => {
    // 1. إذا كان الـ ID قادماً مباشرة من السلة، نلتزم به فوراً
    if (options?.initialVariantId) return options.initialVariantId;
    
    // 2. إذا لم يأتِ، نبحث بالاسم
    if (options?.initialVariantName) {
      const matchByName = sortedVariants.find((v) => v.variantName === options.initialVariantName);
      if (matchByName) return matchByName.id;
    }
    
    // 3. خيار احتياطي بناءً على السعر أو أول عنصر
    const matchByPrice = sortedVariants.find((v) => v.basePrice === price);
    return matchByPrice?.id ?? sortedVariants[0]?.id ?? null;
  });

  const selectVariant = (variantId: string) => { 
    setSelectedVariantId(variantId);
  };

  const selectedVariant = useMemo(
    () => sortedVariants.find((v) => v.id === selectedVariantId),
    [sortedVariants, selectedVariantId],
  );

  const finalPrice = selectedVariant?.basePrice ?? price;
  const total = finalPrice * quantity;

  // 🌟 تعديل بناء البيانات المرسلة لتشمل الـ ID والاسم معاً
 const buildCartPayload = () => {
  return {
    productId: id,
    CategoryId, // هذا هو الـ merchantCategoryId (القسم)
    merchantId,  // 🌟 نرسل الـ merchantId الصريح للمطعم
    name,
    description,
    price: finalPrice,
    note: note.replace(/\n/g, " "),
    quantity,
    total,
    variantName: selectedVariant?.variantName || options?.initialVariantName, 
    variantId: selectedVariantId || options?.initialVariantId || null, 
  };
};

  const addToCart = async (force = false) => {
    const payload = buildCartPayload();
    const result = await addProductToCart(payload, force, options?.cartItemId);
    return result; 
  };

  return {
    variants: sortedVariants, 
    selectedVariantId,
    selectVariant,
    quantity,
    increase,
    decrease,
    note,
    setNote,
    selectedVariant,
    finalPrice,
    total,
    addToCart,
  };
};