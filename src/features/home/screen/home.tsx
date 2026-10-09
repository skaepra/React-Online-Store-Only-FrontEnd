import { motion } from "framer-motion";
import {
  IoArrowForward,
} from "react-icons/io5";
import products from "../../../data/products";
import { Product } from "../../products/types/product";
import { ProductCard } from "../../shop/components/ProductCard";
import { useShoppingScreen } from "../../shop/hook/useShoppingScreen";
import { AddedToast } from "../../shop/components/AddedToast";
import { useNavigate } from "react-router-dom";
import Contener from "../../../shared/childern/contener";



export default function Home() {
  const { state, actions } = useShoppingScreen();
  const navigate = useNavigate();

  const handleShopCollection = () => {
    navigate("/shop");
  };

  return (
    <Contener>
      <div className="min-h-screen bg-white transition-colors duration-200 dark:bg-zinc-900">
        <AddedToast message={state.addedToast} />

        {/* 1. Hero Section */}
        <section className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6">
          <div className="grid min-h-[300px] overflow-hidden rounded-xl bg-[#0071ce] text-white md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative z-10 flex flex-col items-start justify-center gap-4 p-7 sm:p-9 lg:p-14">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs font-bold uppercase text-[#ffe08a]"
              >
                Welcome to Bazaar
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-xl text-3xl font-semibold leading-tight sm:text-5xl"
              >
                Everyday finds, all in one place.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-lg text-sm leading-6 text-white/90 sm:text-base"
              >
                Shop tech, accessories, and personal care from one store.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button
                  onClick={handleShopCollection}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#ffc220] px-6 py-3 text-sm font-bold transition-colors hover:bg-[#fac73b] "
                >
                  <span className="text-white">Shop now</span>
                  <IoArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
            <div className="hidden min-h-[240px] items-center justify-center  md:flex">
              <img
                src="offer.png"
                alt="A selection of featured store products"
                className="h-full max-h-[380px] w-full "
              />
            </div>
          </div>
        </section>

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
                onQuickAdd={actions.handleQuickAdd}
              />
            ))}
          </div>
        </div>
      </div>
    </Contener>
  );
}
