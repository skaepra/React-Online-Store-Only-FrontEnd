import { motion } from "framer-motion";
import { IoHeart, IoHeartOutline, IoShareSocialOutline } from "react-icons/io5";
import { Product } from "../../types/product";

interface ProductGalleryProps {
  product: Product;
  selectedImage: string;
  onSelectImage: (img: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export default function ProductGallery({
  product,
  selectedImage,
  onSelectImage,
  isWishlisted,
  onToggleWishlist,
}: ProductGalleryProps) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 lg:col-span-5 lg:grid-cols-[72px_minmax(0,1fr)] lg:items-start">
      <div className="relative order-1 aspect-square w-full overflow-hidden bg-white dark:bg-zinc-900 lg:order-2">
        <motion.img
          key={selectedImage}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={selectedImage}
          alt={product.ImageAlt || product.Name}
          className="h-full w-full  object-cover"
        />

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            onClick={onToggleWishlist}
            className={`z-10 grid h-10 w-10 place-items-center rounded-full hover:border-2 shadow-md transition-all active:scale-90 ${
              isWishlisted
                ? "border-rose-600 bg-rose-600 text-white hover:bg-rose-700"
                : "border-slate-500 bg-white text-slate-900 hover:bg-rose-50 hover:text-rose-700 dark:border-zinc-400 dark:bg-zinc-800 dark:text-white"
            }`}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            aria-pressed={isWishlisted}
          >
            {isWishlisted ? (
              <IoHeart className="text-lg text-white" />
            ) : (
              <IoHeartOutline className="text-lg text-slate-900 dark:text-white" />
            )}
          </button>

          <button className="grid h-10 w-10 place-items-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:text-[#0053e2] dark:bg-zinc-800 dark:text-gray-200">
            <IoShareSocialOutline className="text-lg" />
          </button>
        </div>
      </div>

      {product.Images.length > 0 && (
        <div className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
          {product.Images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectImage(img)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors lg:h-[68px] lg:w-[68px] ${
                selectedImage === img
                  ? "border-[#0053e2]"
                  : "border-slate-200 opacity-80 hover:opacity-100 dark:border-zinc-700"
              }`}
            >
              <img src={img} alt="" className="h-full w-full " />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
