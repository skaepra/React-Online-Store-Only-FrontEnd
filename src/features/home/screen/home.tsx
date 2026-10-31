import { motion } from "framer-motion";
import products from "../../../data/products";
import { Product } from "../../products/types/product";

import { useShoppingScreen } from "../../shop/hook/useShoppingScreen";
import { AddedToast } from "../../shop/components/AddedToast";
import Contener from "../../../shared/childern/contener";
import { ProductCard } from "../../products/components/ProductCard";
import HomeAdsSection from "../components/HomeAdsSection";

export default function Home() {
  const { state, actions } = useShoppingScreen();

  return (
    <Contener>
      <div className="min-h-screen bg-white transition-colors duration-200 dark:bg-zinc-900">
        <AddedToast message={state.addedToast} />

        {/* 1. Hero Section */}

        <div>
          <HomeAdsSection/>
        </div>

        {/* 3. Products Section */}
        <div
          id="products-section"
          className="mx-auto max-w-[1440px]  bg-[#f6f5fa] dark:bg-[#1c1c20] px-4 py-10 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 flex flex-col items-start gap-1"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Shop our products
            </h2>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Browse the current product selection.
            </p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {(products as Product[]).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFav={actions.isProductInWishlist(product.id)}
                onProductClick={actions.handleProductClick}
                onToggleWishlist={actions.handleToggleWishlist}
              />
            ))}
          </div>
        </div>
      </div>
    </Contener>
  );
}
