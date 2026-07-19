import React, { useEffect } from "react";
import { useGg } from "../../../context/gg";
import products from "../../../data/products";

interface ProductItem {
  id: string | number;
  Name: string;
  Description: string;
  Price: number;
  Colors: string[];
  Images: string[];
}

export const Image = () => {
  const { imagenumper, show, setimage, image, setcolor } = useGg();

  // البحث عن المنتج وعمل كاستينج لنوعه
  const item = products.find((i) => i.id === show.id) as ProductItem | undefined;

  useEffect(() => {
    // شرط حماية: تأكد أولاً من وجود المنتج
    if (!item) return;

    // الوصول المباشر للعنصر بالفهرس (Index)
    const currentImage = item.Images[imagenumper];
    if (currentImage !== undefined) {
      setimage(currentImage);
    }

    const currentColor = item.Colors[imagenumper];
    if (currentColor !== undefined) {
      setcolor(currentColor);
    }
    // إزالة 'item' من هنا لمنع حلقات الريندر اللانهائية (Infinite Loops)
  }, [imagenumper, show.id, setimage, setcolor]);

  // إذا لم يتم العثور على المنتج، لا تعرض الصورة
  if (!item) return null;

  return (
    <img
      src={typeof image === "number" ? String(image) : image}
      alt={item.Name}
      className="ml-[345px] aspect-square w-52 rounded-e bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
    />
  );
};