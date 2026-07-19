import React from "react";
import { useGg } from "../../../context/gg";
import products from "../../../data/products";
import { Color } from "../components/color";
import { Image } from "../components/image";

interface ProductItem {
  id: string | number;
  Name: string;
  Description: string;
  Price: number;
  Colors: string[];
  Images: string[];
}

export const Buylist = () => {
  const { visbil, hand, show, add } = useGg();

  // 1. حل مشكلة المعرف الاختياري: نتحقق أولاً من وجود show.id، إن لم يوجد لا نبحث في المنتجات
  const item = show.id 
    ? (products.find((i) => i.id === show.id) as ProductItem | undefined)
    : undefined;

  const addcart = (id: string | number) => {
    if (item) {
      add(id, item.Price);
      hand(id); // 2. حل المشكلة الأولى: تمرير الـ id المطلوب لدالة hand هنا بأمان
    }
  };

  // شرط حماية يضمن عدم إكمال الرندر إذا كانت النافذة مغلقة أو المنتج غير موجود
  if (!visbil || !item || !show.id) {
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center">
      {/* 3. حل المشكلة الثانية: استدعاء دالة hand عبر arrow function وتمرير show.id لمنع تمرير الـ Event */}
      <div 
        onClick={() => hand(show.id!)} 
        className="bg-black w-full h-full fixed top-0 left-0 right-0 opacity-75 z-40"
      ></div>
      
      <div className="bg-[#e4e1e1] rounded w-[550px] h-[320px] fixed top-[80px] dark:bg-zinc-900 z-50">
        <span className="text-zinc-700 dark:text-white text-4xl absolute ml-3 mt-1">
          {item.Name}.
        </span>
        <h1 className="text-zinc-800 dark:text-white text-justify absolute mt-[50px] ml-2 w-80 p-1">
          {item.Description}
        </h1>
        <Color />
        
        {/* حل مشكلة show.id الاختياري: نمرر المعرف المتأكدين من وجوده بفضل شرط الحماية العلوي */}
        <button
          onClick={() => addcart(show.id!)}
          className="absolute mt-[260px] ml-4 w-32 h-11 text-white font-semibold bg-gradient-to-r bg-blue-700 hover:bg-blue-800 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:cursor-pointer"
        >
          Add To Cart
        </button>
        
        <span className="text-zinc-800 text-xl dark:text-white absolute mt-[265px] ml-[265px] w-80">
          ${item.Price}
        </span>
        <Image />
      </div>
    </div>
  );
};