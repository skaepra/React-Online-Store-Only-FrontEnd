import { Buylist } from "../../products/screen/buy-list";
import products from "../../../data/products";
import { useGg } from "../../../context/gg";
import { motion } from "framer-motion";

// 1. تعريف واجهة البيانات الخاصة بالمنتج (Product Interface)
// يمكنك نقل هذا الـ interface إلى ملف منفصل (مثل types.ts) واستيراده إذا كنت تستخدمه في أكثر من مكان.
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
  // TypeScript سيتعرف على نوع hand تلقائياً إذا كان معرّفاً بشكل صحيح داخل الـ Context.
  // إذا لم يكن معرّفاً هناك، سيفترض أنه (id: string | number) => void
  const { hand } = useGg();

  return (
    <>
      <div className="bg-[url(public/toje.jpg)] w-full h-[450px] bg-center bg-cover bg-no-repeat"></div>

      <div className="bg-white dark:bg-zinc-800 h-full">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 pt-10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Customers also purchased
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 px-4 mt-10">
            {/* 2. قمنا بتعريف نوع المكونات داخل الـ map لضمان الـ Type Safety */}
            {(products as Product[]).map((product, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  onClick={() => hand(product.id)}
                  className="group relative cardan"
                >
                  <img
                    alt={product.ImageAlt || product.Name}
                    src={product.Images[0]}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-85 lg:aspect-auto lg:h-80 imageReveal"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700 dark:text-white">
                        {product.Name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500"></p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
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