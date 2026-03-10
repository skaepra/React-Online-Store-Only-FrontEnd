import { useEffect } from "react";
import { useGg } from "../context/gg";
import products from "../data/products";

export const Image = () => {
  const { imagenumper, show, setimage, image, setcolor } = useGg();
  const item = products.find((i) => i.id === show.id);

 useEffect(() => { 
    item.Images.map((img, index) => {
      if (index == imagenumper) {
        setimage(img);
      }
    });

    item.Colors.map((color, index) => {
      if (index == imagenumper) {
        setcolor(color);
      }
    });
  }, [imagenumper, show.id]);
  return (
    <>
      <img
        src={image}
        className="ml-[345px] aspect-square w-52 rounded-e bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
    </>
  );
};
