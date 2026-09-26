import { motion } from "framer-motion";
import { IoCartOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { Product } from "../../products/types/product";

interface ProductCardProps {
  product: Product;
  isFav: boolean;
  variant?: "storefront" | "catalog" | "wishlist";
  onProductClick: (id: string) => void;
  onQuickAdd: (e: React.MouseEvent, product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export function ProductCard({
  product,
  isFav,
  variant = "catalog",
  onProductClick,
  onQuickAdd,
  onToggleWishlist,
}: ProductCardProps) {
  const isStorefront = variant === "storefront";
  const isWishlist = variant === "wishlist";
  const hasOptions = Boolean(product.Colors?.length || product.Sizes?.length);
  const [wholePrice, cents] = product.Price.toFixed(2).split(".");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div
        onClick={() => {
          (onProductClick(product.id), window.scrollTo({ top: 20 }));
        }}
        className={`group relative flex h-full min-w-0 cursor-pointer flex-col bg-white transition-colors duration-200 hover:bg-slate-50 dark:bg-zinc-800 dark:hover:bg-zinc-700/50`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full border border-slate-400 shadow-md transition-colors ${
            isFav
              ? "border-rose-600 bg-rose-600 text-white hover:bg-rose-700"
              : "bg-white text-slate-900 hover:bg-rose-50 hover:text-rose-700 dark:border-zinc-500 dark:bg-zinc-900 dark:text-white"
          }`}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isFav}
          title={isFav ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isFav ? (
            <IoHeart className="text-base text-white" />
          ) : (
            <IoHeartOutline className="text-base text-slate-900 dark:text-white" />
          )}
        </button>

        <div className="relative aspect-square w-full overflow-hidden bg-white dark:bg-zinc-900">
          {(isStorefront || isWishlist || product.IsFeatured) && (
            <span
              className={`absolute left-2 top-2 z-10 rounded-full px-2 py-1 text-[10px] font-bold ${
                isWishlist
                  ? "bg-[#0071ce] text-white"
                  : "bg-[#fff1df] text-[#b84424]"
              }`}
            >
              {isWishlist
                ? "Saved"
                : isStorefront
                  ? "Popular pick"
                  : "Featured"}
            </span>
          )}
          <img
            src={product.Images[0]}
            alt={product.ImageAlt || product.Name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-grow flex-col gap-2 px-1 pb-2 pt-2 sm:px-2">
          <div className="flex min-h-9 items-center justify-between gap-2">
            <button
              onClick={(event) => {
                event.stopPropagation();
                onProductClick(product.id);
              }}
              className="h-9 min-w-[88px] rounded-full bg-[#0053e2] px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0047c6]"
            >
              {hasOptions ? "Options" : "Details"}
            </button>
            <button
              onClick={(event) => onQuickAdd(event, product)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-300 text-[#0053e2] transition-colors hover:bg-[#eaf2ff]"
              title="Add to Cart"
              aria-label={`Add ${product.Name} to cart`}
            >
              <IoCartOutline className="text-lg" />
            </button>
          </div>

          {product.Colors && product.Colors.length > 0 && (
            <div
              className="flex min-h-4 items-center gap-1.5"
              aria-label="Available colors"
            >
              {product.Colors.slice(0, 4).map((color, index) => (
                <span
                  key={`${color}-${index}`}
                  className="h-4 w-4 rounded-full border border-black/15"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}

          <div className="flex min-h-4 items-center">
            {product.IsFeatured && (
              <span className="text-[11px] font-medium text-slate-600">
                Featured
              </span>
            )}
          </div>

          <span className="text-xl font-extrabold leading-none text-slate-950 dark:text-white">
            ${wholePrice}
            <sup className="ml-0.5 align-super text-[10px]">.{cents}</sup>
          </span>

          <h3 className="line-clamp-2 min-h-10 text-sm leading-5 text-slate-800 transition-colors group-hover:text-[#0053e2] dark:text-gray-100">
            {product.Name}
          </h3>

          <span className="text-[11px] leading-4 text-slate-600 dark:text-gray-400">
            Free shipping on orders over $5
          </span>
        </div>
      </div>
    </motion.div>
  );
}
