import React from "react";
import products from "../../../data/products";
import { useGg } from "../../../context/gg";

// تعريف واجهة بيانات المنتج المجلوب
interface ProductItem {
  id: string | number;
  Name: string;
  Description: string;
  Price: number;
  Colors: string[];
  Images: string[];
}

export const Color = () => {
  const { show, setimagenumper } = useGg();
  
  // البحث عن المنتج وتحديد نوعه بأمان
  const item = products.find((i) => i.id === show.id) as ProductItem | undefined;

  // تحديد نوع المعامل index كـ number
  const chickcolor = (index: number) => {
    setimagenumper(index);
  };

  // شرط حماية: إذا لم يتم العثور على المنتج، لا تعرض أزرار الألوان
  if (!item) return null;

  return (
    <div className="flex -space-x-4 rtl:space-x-reverse absolute mt-[200px] ml-[15px]">
      {item.Colors.map((cor, index) => (
        <div key={index}>
          <button
            type="button" // تصحيح القيمة هنا إلى button بدلاً من checkbox
            onClick={() => chickcolor(index)}
            style={{ backgroundColor: cor }}
            className="bg-neutral-800 w-10 h-10 transition-all rounded-full block ring-[#3b3838] ring-1 focus:ring-4 ring-offset-1"
          ></button>
        </div>
      ))}
    </div>
  );
};