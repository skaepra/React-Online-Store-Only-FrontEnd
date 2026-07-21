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

  // التأكد من وجود شو وتطابق المعرف
  const item = show.id 
    ? (products.find((i) => Number(i.id) === Number(show.id)) as ProductItem | undefined)
    : undefined;

  const addcart = (id: string | number) => {
    if (item) {
      add(id, item.Price);
      hand(id);
    }
  };

  // 🔴 نقطة فحص مهمة: إذا كانت visbil تساوي false لن يظهر شيء
  if (!visbil || !item || !show.id) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div 
        onClick={() => hand(show.id!)} 
        className={styles.overlay}
      ></div>
      
      <div className={styles.modalCard}>
        <span className={styles.productName}>
          {item.Name}.
        </span>
        
        <h1 className={styles.productDescription}>
          {item.Description}
        </h1>

        <Color />
        
        <button
          onClick={() => addcart(show.id!)}
          className={styles.addToCartBtn}
        >
          Add To Cart
        </button>
        
        <span className={styles.productPrice}>
          ${item.Price}
        </span>

        <Image />
      </div>
    </div>
  );
};

// كائن التنسيقات الخارجي
const styles = {
  container: "w-full h-full flex justify-center",
  
  // خلفية الشفافية المظلمة
  overlay: "bg-black w-full h-full fixed top-0 left-0 right-0 opacity-75 z-40 cursor-pointer",
  
  // النافذة المنبثقة (مهم: تمت إزالة relative لتستقر التموضعات المطلقة بالداخل)
  modalCard: "bg-[#e4e1e1] rounded w-[550px] h-[320px] fixed top-[80px] dark:bg-zinc-900 z-50 shadow-2xl",
  
  // النصوص
  productName: "text-zinc-700 dark:text-white text-4xl absolute ml-3 mt-1",
  productDescription: "text-zinc-800 dark:text-white text-justify absolute mt-[50px] ml-2 w-80 p-1",
  productPrice: "text-zinc-800 text-xl dark:text-white absolute mt-[265px] ml-[265px] w-80",
  
  // زر الإضافة للسلة
  addToCartBtn: "absolute mt-[260px] ml-4 w-32 h-11 text-white font-semibold bg-gradient-to-r bg-blue-700 hover:bg-blue-800 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer",
} as const;