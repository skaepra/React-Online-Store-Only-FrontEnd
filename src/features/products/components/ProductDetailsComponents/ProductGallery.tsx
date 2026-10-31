import { motion } from "framer-motion";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Product } from "../../types/product";
import ShareMenu from "./ShareMenu"; // استيراد مكون المشاركة المنفصل

interface ProductGalleryProps {
  product: Product;
  images: string[];
  selectedImage: string;
  onSelectImage: (img: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export default function ProductGallery({
  product,
  images,
  selectedImage,
  onSelectImage,
  isWishlisted,
  onToggleWishlist,
}: ProductGalleryProps) {
  const currentIndex = images.indexOf(selectedImage);

  // التنقل للصورة التالية
  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onSelectImage(images[currentIndex + 1]);
    }
  };

  // التنقل للصورة السابقة
  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectImage(images[currentIndex - 1]);
    }
  };

  // التعامل مع نهاية السحب بالأصبع (حسب طلبك: اليسار للسابقة، اليمين للتالية)
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const swipeThreshold = 50; // مسافة السحب بالبكسل المطلوبة للتبديل
    if (info.offset.x < -swipeThreshold) {
      handlePrev(); // سحب لليسار -> الصورة السابقة
    } else if (info.offset.x > swipeThreshold) {
      handleNext(); // سحب لليمين -> الصورة التالية
    }
  };

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 sm:col-span-5 lg:grid-cols-[72px_minmax(0,1fr)] lg:items-start">
      
      {/* الصورة الرئيسية */}
      <div className="relative order-1 aspect-square w-full overflow-hidden bg-white dark:bg-zinc-900 lg:order-2 touch-pan-y">
        
        {/* الصورة ثابتة تماماً بدون أي أنميشن */}
        <img
          src={selectedImage}
          alt={product.Name}
          className="h-full w-full object-cover select-none pointer-events-none"
        />

        {/* حاوية شفافة فوق الصورة مخصصة فقط لالتقاط السحب (Drag) بدون تحريك الصورة */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
        />

        {/* مؤشر النقاط لتسهيل المعاينة على الشاشات الصغيرة */}
       {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 z-10 sm:hidden pointer-events-none">
            {images.slice().reverse().map((img, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full transition-all ${
                  selectedImage === img
                    ? "bg-[#0053e2] w-4"
                    : "bg-white/70 dark:bg-zinc-500/70"
                }`}
              />
            ))}
          </div>
        )}

        {/* الأزرار العائمة (أعلى اليمين) */}
        <div className="absolute right-3 top-2 flex flex-col gap-2 z-10">
          <ShareMenu product={product} selectedImage={selectedImage} />

          <button
            onClick={onToggleWishlist}
            className={`grid h-10 w-10 place-items-center rounded-full hover:border-2 shadow-md transition-all active:scale-90 ${
              isWishlisted
                ? "border-rose-600 bg-rose-600 text-white hover:bg-rose-700"
                : "border-slate-500 bg-white text-slate-900 hover:bg-rose-50 hover:text-rose-700 dark:border-zinc-400 dark:bg-zinc-800 dark:text-white"
            }`}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isWishlisted ? (
              <IoHeart className="text-lg text-white" />
            ) : (
              <IoHeartOutline className="text-lg text-slate-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* الصور المصغرة */}
      {images.length > 0 && (
        <div className="order-2 hidden sm:flex sm:flex-wrap gap-2 lg:order-1 lg:flex-col lg:overflow-visible">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectImage(img)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors lg:h-[68px] lg:w-[68px] ${
                selectedImage === img
                  ? "border-[#0053e2]"
                  : "border-slate-200 opacity-80 hover:opacity-100 dark:border-zinc-700"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover pointer-events-none" />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}