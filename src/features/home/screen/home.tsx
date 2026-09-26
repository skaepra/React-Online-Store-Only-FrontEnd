import { motion } from "framer-motion";
import {
  IoSparkles,
  IoShieldCheckmarkOutline,
  IoCarOutline,
  IoRefreshOutline,
  IoArrowForward,
} from "react-icons/io5";
import products from "../../../data/products";
import { Product } from "../../products/types/product";
import { ProductCard } from "../../shop/components/ProductCard";
import { useShoppingScreen } from "../../shop/hook/useShoppingScreen";
import { AddedToast } from "../../shop/components/AddedToast";
import { useNavigate } from "react-router-dom";
import Contener from "../../../shared/childern/contener";

const FEATURES = [
  { icon: IoCarOutline, title: "Free Shipping", desc: "On all orders over $5" },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Secure Payment",
    desc: "100% secure payment methods",
  },
  {
    icon: IoRefreshOutline,
    title: "Easy Returns",
    desc: "15 days return policy",
  },
];

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
            <div className="relative z-10 flex flex-col items-start justify-center gap-4 p-7 sm:p-10 lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white"
              >
                <IoSparkles className="text-[#ffc220]" />
                <span>Your next favorites</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-xl text-3xl font-extrabold leading-tight sm:text-5xl"
              >
                Everything you need... is just one Bazaar away.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-lg text-sm leading-6 text-white/90 sm:text-base"
              >
                Easy ordering. Fast delivery. Zero hassle.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button
                  onClick={handleShopCollection}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#ffc220] px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-[#ffd45b] active:scale-95"
                >
                  <span>Shop now</span>
                  <IoArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
            <div className="  md:flex">
              <img src="offer.png" alt="Featured phone" className="" />
            </div>
          </div>
        </section>

        {/* 2. Value Propositions Bar */}
        <div className="border-y border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-3 px-4 py-5 sm:px-6 md:grid-cols-3">
            {FEATURES.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 p-2"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#eaf4fc] text-[#005da8] dark:bg-zinc-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Products Section */}
        <div
          id="products-section"
          className="mx-auto max-w-[1440px] bg-[#f5f8fa] px-4 py-10 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 flex flex-col items-start gap-1"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Popular picks
            </h2>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              What shoppers are loving right now
            </p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {(products as Product[]).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFav={actions.isProductInWishlist(product.id)}
                variant="storefront"
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
