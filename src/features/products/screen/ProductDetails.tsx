import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBack, IoCheckmark } from "react-icons/io5";
import { useProductDetails } from "../hooks/useProductDetails";
import ProductGallery from "../components/ProductDetailsComponents/ProductGallery";
import ProductOptions from "../components/ProductDetailsComponents/ProductOptions";
import ProductTabs from "../components/ProductDetailsComponents/ProductTabs";
import RelatedProducts from "../components/ProductDetailsComponents/RelatedProducts";

export default function ProductDetails() {
  const {
    product,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    activeTab,
    setActiveTab,
    addedToast,
    isWishlisted,
    handleAddToCart,
    handleToggleWishlist,
    relatedProducts,
    currentImages, 
    currentPrice,  
    currentStock,
    navigate,
  } = useProductDetails();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          The product you are looking for does not exist or was removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 transition-all shadow-md"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white pb-16 transition-colors duration-200 py-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400/30"
          >
            <IoCheckmark className="text-xl bg-white/20 rounded-full p-0.5" />
            <span className="text-xs font-semibold">
              Added to your shopping cart!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* تم تغيير px-4 إلى px-0 للجوال لتلامس الصورة الحواف، وإبقائها sm:px-6 للشاشات الأكبر */}
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        
        {/* زر الرجوع (أضفنا px-4 هنا لكي لا يلتصق بالحافة) */}
        <div className="px-4 sm:px-0">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-slate-600 transition-colors hover:text-[#0053e2] dark:text-gray-400 dark:hover:text-white"
          >
            <IoChevronBack className="text-base" />
            <span>Back</span>
          </button>
        </div>

        {/* Top Product Details Section */}
        <div className="grid grid-cols-1 items-start gap-6 sm:col-span-12 sm:grid-cols-12 sm:gap-7">
          {/* معرض الصور */}
          <ProductGallery
            product={product}
            images={currentImages}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
            isWishlisted={isWishlisted}
            onToggleWishlist={handleToggleWishlist}
          />

          {/* خيارات المنتج (أضفنا px-4 للعنصر على الجوال ليحافظ على المسافة) */}
          <div className="px-4 sm:px-0 sm:col-span-7 ">
            <ProductOptions
              product={product}
              currentPrice={currentPrice}
              currentStock={currentStock}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              quantity={quantity}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={() => {
                handleAddToCart();
                navigate("/cart");
              }}
            />
          </div>
        </div>

        {/* Tabs Section (أضفنا px-4 للعوال) */}
        <div className="px-4 sm:px-0">
          <ProductTabs
            product={product}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Related Products (أضفنا px-4 للجوال) */}
        <div className="px-4 sm:px-0">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}