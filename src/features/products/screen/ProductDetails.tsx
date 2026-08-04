import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../cart/store/useCartStore";

import {
  IoStar,
  IoStarOutline,
  IoHeart,          
  IoHeartOutline,
  IoShareSocialOutline,
  IoCartOutline,
  IoBagCheckOutline,
  IoChevronBack,
  IoShieldCheckmarkOutline,
  IoSyncOutline,
  IoCarOutline,
  IoCheckmark,
} from "react-icons/io5";

import { Link, useNavigate, useParams } from "react-router-dom";

import Allproducts, {
  productsMap as allProductsMap,
} from "../../../data/Allproducts.ts";
import homeProducts, {
  productsMap as homeProductsMap,
} from "../../../data/products.ts";
import { useWishlistStore } from "../store/useWishlistStore.ts";
import { Product } from "../types/product.ts";

const combinedAllProducts = [...Allproducts, ...homeProducts];

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const productId = Number(id);
  const product = id
    ? allProductsMap[productId] || homeProductsMap[productId]
    : undefined;

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "details" | "reviews"
  >("description");
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const addToCart = useCartStore((state) => state.addToCart);

  // 🔴 3. ربط Zustand Wishlist Store
  const wishlist = useWishlistStore((state) => state.wishlist) || [];
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  // في حال كانت الدالة لديك باسم addToWishlist/removeFromWishlist يمكنك تعديلها هنا
  
  // التحقق إن كان المنتج الحالي ضمن الـ wishlist
  const isWishlisted = product
    ? wishlist.some((item:Product) => item.id === product.id)
    : false;

  useEffect(() => {
    if (product) {
      setSelectedImage(product.Images?.[0] || "");
      setSelectedColor(product.Colors?.[0] || "");
      setSelectedSize(product.Sizes?.[0] || "");
      setQuantity(1);
    }
  }, [id, product]);

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
          onClick={() => navigate("/Home")}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 transition-all shadow-md"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ ...product, quantity, selectedColor, selectedSize });
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleToggleWishlist = () => {
    if (toggleWishlist && product) {
      toggleWishlist(product);
    }
  };

  const relatedProducts = combinedAllProducts.filter(
    (p) => p.Category === product.Category && p.id !== product.id,
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white pt-20 pb-16 transition-colors duration-200">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
        >
          <IoChevronBack className="text-base" />
          <span>Back</span>
        </button>

        <div className="sm:flex grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white dark:bg-zinc-800/80 p-6 sm:p-8 rounded-3xl border border-gray-200/80 dark:border-zinc-700/60 shadow-sm">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-square w-full sm:w-[250px] md:w-[350px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700/40">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImage}
                alt={product.ImageAlt || product.Name}
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {/* Top Wishlist Badge */}
                <button
                  onClick={handleToggleWishlist}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md active:scale-90 ${
                    isWishlisted
                      ? "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30"
                      : "bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-gray-200 hover:text-rose-500"
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  {isWishlisted ? (
                    <IoHeart className="text-lg text-white" />
                  ) : (
                    <IoHeartOutline className="text-lg" />
                  )}
                </button>
                  

                <button className="p-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition-colors shadow-md">
                  <IoShareSocialOutline className="text-lg" />
                </button>
              </div>
            </div>

            {product.Images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.Images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? "border-indigo-600 scale-95"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {product.Category}
                </span>

                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarOutline className="text-gray-300 dark:text-zinc-600" />
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-1">
                    (4.8 / 5)
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {product.Name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  ${product.Price}
                </span>
                <span className="text-sm text-gray-400 line-through font-medium">
                  ${(product.Price * 1.2).toFixed(0)}
                </span>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                  Save 20%
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                {product.Description}
              </p>

              <hr className="border-gray-100 dark:border-zinc-700/60" />

              {product.Colors && product.Colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Color
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.Colors.map((color, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === color
                            ? "border-indigo-600 scale-110 shadow-md"
                            : "border-gray-300 dark:border-zinc-700 opacity-80"
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColor === color && (
                          <IoCheckmark className="text-white text-xs drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.Sizes && product.Sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Select Size
                  </label>
                  <div className="flex items-center gap-2">
                    {product.Sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedSize === size
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                            : "bg-gray-100 dark:bg-zinc-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Quantity
                </label>
                <div className="flex items-center gap-3 max-w-[140px]">
                  <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-zinc-700/60 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 font-bold flex items-center justify-center shadow-sm hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="text-sm font-extrabold px-2">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 font-bold flex items-center justify-center shadow-sm hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-zinc-700/60">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    handleAddToCart();
                    setQuantity(1);
                  }}
                  className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white
                  dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:shadow-md
                  dark:shadow-purple-500/20  dark:hover:shadow-purple-500/40
                  rounded-2xl font-bold text-xs  sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                >
                  <IoCartOutline className="text-lg" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    handleAddToCart();
                    navigate("/cart");
                  }}
                  className="w-full py-3.5 px-4 bg-slate-900/85 hover:bg-slate-900/80 dark:bg-zinc-100 dark:hover:bg-white dark:text-gray-900 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <IoBagCheckOutline className="text-lg" />
                  <span>Buy Now</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 text-[10px] text-gray-500 dark:text-gray-400 font-medium text-center">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
                  <IoCarOutline className="text-base text-indigo-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
                  <IoSyncOutline className="text-base text-indigo-500" />
                  <span>15 Days Return</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
                  <IoShieldCheckmarkOutline className="text-base text-indigo-500" />
                  <span>2 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-zinc-800/80 p-6 rounded-3xl border border-gray-200/80 dark:border-zinc-700/60">
          <div className="flex border-b border-gray-200 dark:border-zinc-700/60 gap-8">
            {[
              { id: "description", label: "Description" },
              { id: "details", label: "Specifications" },
              { id: "reviews", label: "Reviews (12)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {activeTab === "description" && <p>{product.Description}</p>}

            {activeTab === "details" && (
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  Material: High quality organic cotton / synthetic components.
                </li>
                <li>Category: {product.Category}</li>
                <li>Item ID: #{product.id}</li>
                <li>
                  Color Options: {product.Colors?.join(", ") || "Standard"}
                </li>
              </ul>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-700/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-gray-900 dark:text-white">
                      Alex Johnson
                    </span>
                    <span className="text-[10px] text-gray-400">
                      2 days ago
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    Excellent quality! Exactly as described in the pictures and
                    fits perfectly.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/product/${relProduct.id}`}
                  onClick={() => window.scrollTo({ top: 20, behavior: "smooth" })}
                  className="group bg-white dark:bg-zinc-800 rounded-2xl p-3 border border-gray-100 dark:border-zinc-700/50 hover:shadow-lg transition-all"
                >
                  <div className="aspect-square rounded-xl bg-gray-100 dark:bg-zinc-900 overflow-hidden mb-3">
                    <img
                      src={relProduct.Images[0]}
                      alt={relProduct.Name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                    {relProduct.Name}
                  </h3>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    ${relProduct.Price}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}