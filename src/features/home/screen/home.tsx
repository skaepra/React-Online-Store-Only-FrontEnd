import products from "../../../data/products";
import { motion } from "framer-motion";
import { useProductUiStore } from "../../products/store/useProductUiStore";
import { IoEyeOutline, IoHeart, IoHeartOutline, IoSparkles } from "react-icons/io5"; // 👈 أضفنا IoHeart

import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../products/store/useWishlistStore";
import { Product } from "../../products/types/product";



export default function Home() {
  const hand = useProductUiStore((state) => state.hand);

  // 💡 جلب المفضلات والدوال الخاصة بها بشكل صحيح
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist); 

  const navigate = useNavigate();

  const handleProductClick = (id: string | number) => {
    if (hand) hand(id);
    navigate(`/product/${id}`);
    window.scrollTo({ top: 20 });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors duration-200 min-h-screen">
      
      {/* 1. Enhanced Hero Header */}
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
            Discover our handpicked selection of premium products crafted for quality and perfection.
          </motion.p>
        </div>
      </div>

      {/* 2. Products Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Section Title */}
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
          {(products as Product[]).map((product, index: number) => {
            // 💡 التحقق هل المنتج مفضل أم لا داخل الـ Map لكل عنصر
            const isFav = wishlist.some((item) => item.id === product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleProductClick(product.id)}
              >
                <div
                  className="group relative bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col h-full"
                >
                  
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                    <img
                      alt={product.ImageAlt || product.Name}
                      src={product.Images[0]}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top Wishlist Badge */}
                     <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // يمنع للانتقال لصفحة المنتج عند الضغط على القلب
                        toggleWishlist(product);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full z-10
                      ${isFav
                        ? "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30"
                        : "bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-gray-200 hover:text-rose-500"}`}
                      title={isFav ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      {isFav ? (
                        <IoHeart className="text-base text-white" />
                      ) : (
                        <IoHeartOutline className="text-base" />
                      )}
                    </button>

                    {/* Hover Quick View Overlay Button */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                      <button className="w-full py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-gray-900 dark:text-white rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <IoEyeOutline className="text-sm text-indigo-500" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Details Content */}
                  <div className="p-4 flex flex-col justify-between flex-grow space-y-2 bg-gray-50 dark:bg-zinc-800/60">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-1">
                        {product.Name}
                      </h3>
                      
                      {/* Optional Color Palette Dots */}
                      {product.Colors && product.Colors.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2">
                          {product.Colors.slice(0, 3).map((color, cIdx) => (
                            <span
                              key={cIdx}
                              className="w-2.5 h-2.5 rounded-full border border-gray-300 dark:border-zinc-700"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                          {product.Colors.length > 3 && (
                            <span className="text-[10px] text-gray-400">
                              +{product.Colors.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price Row */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-zinc-700/40">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Price</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        ${product.Price}
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}