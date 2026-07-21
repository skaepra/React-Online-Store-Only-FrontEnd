import { Buylist } from "../../products/screen/buy-list";
import products from "../../../data/products";
// 1. استيراد useProductUiStore بدلاً من Context

import { motion } from "framer-motion";
import { useProductUiStore } from "../../products/store/useProductUiStore";

interface Product {
  id: number;
  Name: string;
  Images: string[];
  ImageAlt: string;
  Price: number;
  Colors: string[];
  Description: string;
}

export default function Home() {
  // 2. استخدام دالة hand من الـ UI Store لفتح تفاصيل المنتج
  const hand = useProductUiStore((state) => state.hand);

  return (
    <>
      <div className={styles.cardHeader} />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className={styles.heading}>
              Customers also purchased
            </h2>
          </motion.div>

          <div className={styles.grid}>
            {(products as Product[]).map((product, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  onClick={() => hand(product.id)}
                  className={styles.productCard}
                >
                  <img
                    alt={product.ImageAlt || product.Name}
                    src={product.Images[0]}
                    className={styles.productImage}
                  />
                  
                  <div className={styles.productDetailsWrapper}>
                    <div>
                      <h3 className={styles.productTitle}>
                        {product.Name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500" />
                    </div>
                    <p className={styles.productPrice}>
                      ${product.Price}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <Buylist />
    </>
  );
}

// 1. فصل جميع كلاسات Tailwind في كائن منظم خارج المكون
const styles = {
  cardHeader: "bg-[url(/toje.jpg)] w-full h-[450px] bg-center bg-cover bg-no-repeat",
  wrapper: "bg-white dark:bg-zinc-800 h-full",
  container: "mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 pt-10 pb-8",
  heading: "flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white",
  grid: "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 px-4 mt-10",
  productCard: "group relative cardan cursor-pointer",
  productImage: "aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-85 lg:aspect-auto lg:h-80 imageReveal",
  productDetailsWrapper: "mt-4 flex justify-between",
  productTitle: "text-sm text-gray-700 dark:text-white",
  productPrice: "text-sm font-medium text-gray-900 dark:text-white",
};