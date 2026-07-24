import { useEffect } from "react";
// 1. استيراد useProductUiStore بدلاً من Context

import products from "../../../data/products";
import { useProductUiStore } from "../store/useProductUiStore";

interface ProductItem {
  id: string | number;
  Name: string;
  Description: string;
  Price: number;
  Colors: string[];
  Images: string[];
}

export const Image = () => {
  // 2. سحب البيانات والدوال المطلوبة من useProductUiStore
  const imagenumper = useProductUiStore((state) => state.imagenumper);
  const show = useProductUiStore((state) => state.show);
  const image = useProductUiStore((state) => state.image);
  const setImage = useProductUiStore((state) => state.setImage);
  const setColor = useProductUiStore((state) => state.setColor);

  const item = products.find((i) => i.id === show.id) as ProductItem | undefined;

  useEffect(() => {
    if (!item) return;

    const currentImage = item.Images[imagenumper];
    if (currentImage !== undefined) {
      setImage(currentImage);
    }

    const currentColor = item.Colors[imagenumper];
    if (currentColor !== undefined) {
      setColor(currentColor);
    }
  }, [imagenumper, show.id, setImage, setColor]);

  if (!item) return null;

  return (
    <img
      src={typeof image === "number" ? String(image) : image}
      alt={item.Name}
      className=" aspect-square w-52 rounded-e bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80   "
    />
  );
};