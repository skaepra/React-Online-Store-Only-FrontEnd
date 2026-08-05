import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductUiStore } from "../../features/products/store/useProductUiStore";

// 2. تعريف نوع البيانات الخاص بالمنتج
interface Product {
  id: string | number;
  Name: string;
  Colors?: string[];
  Images?: string[];
}

export const ProductLists = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const hand = useProductUiStore((state) => state.hand);

  // 🔴 3. تعديل نوع id ليقبل string أو number
  const handleProductClick = (id: string | number) => {
    if (hand) hand(id);
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product List</h1>
      
      <div className={styles.grid}>
        {products.map((product) => (                    
          <div key={product.id} className={styles.card} >
            <h2 className={styles.cardTitle}>{product.Name}</h2>
            
            {/* 🔴 4. استخدام Optional Chaining حمايةً لعدم وجود مصفوفة الألوان */}
            <div className={styles.colorsContainer}>
              {product.Colors?.map((color, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: color }}
                  className={styles.colorBadge}
                />
              ))}
            </div>
            
            {/* 🔴 5. استخدام Optional Chaining حمايةً لعدم وجود مصفوفة الصور */}
            <div className={styles.imagesContainer} >
              {product.Images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.Name} ${i}`}
                  className={styles.productImage}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. فصل جميع كلاسات Tailwind في كائن styles خارجي
const styles = {
  container: "p-4",
  title: "text-2xl font-bold mb-4",
  grid: "grid grid-cols-1 md:grid-cols-3 gap-6",
  
  card: "border p-4 rounded shadow bg-white dark:bg-zinc-900 dark:border-zinc-800",
  cardTitle: "text-xl font-semibold dark:text-white",
  
  colorsContainer: "flex gap-2 mt-2",
  colorBadge: "w-6 h-6 rounded-full border border-gray-300 dark:border-zinc-700",
  
  imagesContainer: "flex flex-wrap gap-2 mt-2",
  productImage: "w-[140px] h-[80px] object-contain rounded bg-gray-50 dark:bg-zinc-800",
};
