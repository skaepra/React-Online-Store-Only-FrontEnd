
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

  const chickcolor = (index: number) => {
    setimagenumper(index);
  };

  // شرط حماية: إذا لم يتم العثور على المنتج، لا تعرض أزرار الألوان
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

// فصل كلاسات Tailwind في كائن منظم خارجي
const styles = {
  container: "flex -space-x-4 rtl:space-x-reverse absolute mt-[200px] ml-[15px]",
  colorButton: "w-10 h-10 transition-all rounded-full block ring-[#3b3838] ring-1 focus:ring-4 ring-offset-1 cursor-pointer",
};