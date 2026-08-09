import { motion } from "framer-motion";
import { IoEyeOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { Product } from "../../products/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
  isFav: boolean;
  onProductClick: (id: string ) => void;
  onToggleWishlist: (e: React.MouseEvent, product: Product) => void;
}

export function ProductCard({
  product,
  index,
  isFav,
  onProductClick,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
      viewport={{ once: true }}
      onClick={() => onProductClick(product.id)}
    >
      <div className="group relative bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
          <img
            alt={product.ImageAlt || product.Name}
            src={product.Images[0]}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => onToggleWishlist(e, product)}
            className={`absolute top-3 right-3 p-2 rounded-full z-10 ${
              isFav
                ? "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30"
                : "bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-gray-200 hover:text-rose-500"
            }`}
            title={isFav ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isFav ? (
              <IoHeart className="text-base text-white" />
            ) : (
              <IoHeartOutline className="text-base" />
            )}
          </button>

          {/* Quick View Overlay */}
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

            {/* Colors */}
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

          {/* Price */}
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
}