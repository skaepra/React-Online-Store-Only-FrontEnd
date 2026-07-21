import products from "../../../data/products";
import { useProductUiStore } from "../store/useProductUiStore";
// 1. استيراد useProductUiStore بدلاً من Context


interface ProductItem {
  id: string | number;
  Name: string;
  Description: string;
  Price: number;
  Colors: string[];
  Images: string[];
}

export const Color = () => {
  // 2. سحب البيانات والدوال المطلوبة
  const show = useProductUiStore((state) => state.show);
  const setImagenumper = useProductUiStore((state) => state.setImagenumper);

  const item = products.find((i) => i.id === show.id) as ProductItem | undefined;

  const chickcolor = (index: number) => {
    setImagenumper(index);
  };

  if (!item) return null;

  return (
    <div className={styles.container}>
      {item.Colors.map((cor, index) => (
        <div key={index}>
          <button
            type="button"
            onClick={() => chickcolor(index)}
            style={{ backgroundColor: cor }}
            className={styles.colorButton}
          />
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: "flex -space-x-4 rtl:space-x-reverse absolute mt-[200px] ml-[15px]",
  colorButton: "w-10 h-10 transition-all rounded-full block ring-[#3b3838] ring-1 focus:ring-4 ring-offset-1 cursor-pointer",
};