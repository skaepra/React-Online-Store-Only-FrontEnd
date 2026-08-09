import { motion } from "framer-motion";
import { IoSparkles } from "react-icons/io5";
import products from "../../../data/products";
import { Product } from "../../products/types/product";
import { ProductCard } from "../../shop/components/ProductCard";
import { useShoppingScreen } from "../../shop/hook/useShoppingScreen";
import { AddedToast } from "../../shop/components/AddedToast";

export default function Home() {
  const { state,actions } = useShoppingScreen();

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors duration-200 min-h-screen">
      <AddedToast message={state.addedToast} />
      {/* 1. Hero Header */}
      <div className="relative w-full h-[420px] sm:h-[480px] bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop')] bg-center bg-cover bg-no-repeat flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <div className="relative z-10 text-center px-4 max-w-2xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20"
          >
            <IoSparkles className="text-amber-400" />
            <span>New Collection Available</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Elevate Your Everyday Style
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-200 font-light max-w-lg mx-auto"
          >
            Discover our handpicked selection of premium products crafted for
            quality and perfection.
          </motion.p>
        </div>
      </div>

      {/* 2. Products Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-10 text-center space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Customers Also Purchased
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {(products as Product[]).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFav={actions.isProductInWishlist(product.id)}
              onProductClick={actions.handleProductClick}
              onToggleWishlist={actions.handleToggleWishlist}
              onQuickAdd={actions.handleQuickAdd}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
