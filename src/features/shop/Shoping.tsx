import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoSearchOutline,
  IoFunnelOutline,
  IoEyeOutline,
  IoOptionsOutline,
  IoCartOutline,
  IoCloseOutline,
  IoCheckmark,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import { useProductUiStore } from "../products/store/useProductUiStore";
import { useCartStore } from "../cart/store/useCartStore";
import Allproducts from "../../data/Allproducts.ts";
import { Product } from "../products/types/product.ts";
import { useWishlistStore } from "../products/store/useWishlistStore.ts";

export default function ShopingScreen() {
  const navigate = useNavigate();
  const hand = useProductUiStore((state) => state.hand);
  const addToCart = useCartStore((state) => state.addToCart);

  // 💡 جلب المفضلات والدوال الخاصة بها بشكل صحيح
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);

  // حالات الفلترة والبحث
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // قائمة المنتجات من الملف الموحد
  const allProducts = useMemo(() => Allproducts as Product[], []);

  // استخراج الفئات المتاحة ديناميكياً
  const categories = useMemo(() => {
    const categoryMap: { [key: string]: number } = {};

    allProducts.forEach((p) => {
      const cat = p.Category || "General";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    return [
      { name: "All", count: allProducts.length },
      ...Object.keys(categoryMap).map((cat) => ({
        name: cat,
        count: categoryMap[cat],
      })),
    ];
  }, [allProducts]);

  // تصفية المنتجات
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" ||
          (product.Category || "General") === selectedCategory;

        const matchesSearch = product.Name.toLowerCase().includes(
          searchQuery.toLowerCase(),
        );

        const matchesPrice = product.Price <= maxPrice;

        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.Price - b.Price;
        if (sortBy === "price-high") return b.Price - a.Price;
        return 0;
      });
  }, [allProducts, selectedCategory, searchQuery, maxPrice, sortBy]);

  // دالة فتح صفحة التفاصيل
  const handleProductClick = (id: number) => {
    if (hand) hand(id);
    navigate(`/product/${id}`);
  };

  // دالة الإضافة السريعة للسلة
  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // منع الانتقال لصفحة التفاصيل عند ضغط زر السلة
    addToCart({
      id: product.id,
      Price: product.Price,
      Name: product.Name,
      Images: product.Images,
      selectedColor: product.Colors?.[0] || "",
      quantity: 1,
    });

    setAddedToast(product.Name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pt-20 pb-16 transition-colors duration-200">
      {/* Toast Alert */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-20 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-400/30 text-xs font-semibold"
          >
            <IoCheckmark className="text-lg bg-white/20 rounded-full p-0.5" />
            <span>Added "{addedToast}" to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shop Header */}
      <div className="bg-white dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800 py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Explore Shop
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Browse through our wide variety of premium products.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
            {/* Category Filter */}
            <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-gray-200 dark:border-zinc-700/60 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <IoFunnelOutline className="text-indigo-500" />
                <span>Categories</span>
              </h3>

              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat.name
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700/50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        selectedCategory === cat.name
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-gray-200 dark:border-zinc-700/60 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Max Price
                </h3>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  ${maxPrice}
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </aside>

          {/* Main Products Grid Section */}
          <main className="flex-1">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-gray-200 dark:border-zinc-700/60">
              {/* Category Pills (Mobile/Tablet) */}
              <div className="flex items-center gap-2 overflow-x-auto lg:hidden pb-1 w-full sm:w-auto">
                <button
                  onClick={() => setIsFilterMobileOpen(true)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-700 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <IoFunnelOutline /> Filter
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      selectedCategory === cat.name
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              {/* Product Count Display */}
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="text-gray-900 dark:text-white font-bold">
                  {filteredProducts.length}
                </span>{" "}
                Products
              </span>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3 ml-auto">
                <label className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white text-xs font-medium px-3 py-2 rounded-xl border border-transparent focus:border-indigo-500 outline-none cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid Render */}
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => {
                    // فحص ما إذا كان هذا المنتج بالتحديد مضافاً إلى المفضلات
                    const isFav = wishlist.some(
                      (item) => item.id === product.id,
                    );

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        key={product.id}
                      >
                        <div
                          onClick={() => handleProductClick(product.id)}
                          className="group relative bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                        >
                          {/* Top Wishlist Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation(); // منع الانتقال لصفحة التفاصيل
                              toggleWishlist(product);
                            }}
                            className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-colors ${
                              isFav
                                ? "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30"
                                : "bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-gray-200 hover:text-rose-500"
                            }`}
                            title={
                              isFav ? "Remove from Wishlist" : "Add to Wishlist"
                            }
                          >
                            {isFav ? (
                              <IoHeart className="text-base text-white" />
                            ) : (
                              <IoHeartOutline className="text-base" />
                            )}
                          </button>

                          {/* Image Box */}
                          <div className="relative aspect-square w-full bg-gray-100 dark:bg-zinc-900 overflow-hidden">
                            <img
                              src={product.Images[0]}
                              alt={product.ImageAlt || product.Name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Quick Actions Hover Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProductClick(product.id);
                                }}
                                className="flex-1 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-gray-900 dark:text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1 hover:bg-white transition-colors"
                              >
                                <IoEyeOutline className="text-sm text-indigo-500" />
                                <span className="hidden sm:inline">View</span>
                              </button>

                              <button
                                onClick={(e) => handleQuickAdd(e, product)}
                                className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                                title="Add to Cart"
                              >
                                <IoCartOutline className="text-base" />
                              </button>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
                            <div>
                              <span className="text-[10px] font-bold tracking-wider text-indigo-500 uppercase">
                                {product.Category || "General"}
                              </span>
                              <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-1 mt-0.5">
                                {product.Name}
                              </h3>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-700/50">
                              <span className="text-xs text-gray-400">
                                Price
                              </span>
                              <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                                ${product.Price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* No Products Found State */
              <div className="text-center py-16 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700/50">
                <IoOptionsOutline className="mx-auto text-4xl text-gray-400 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  No Products Found
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Try adjusting your category or search filter settings.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setMaxPrice(1000);
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isFilterMobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="relative ml-auto w-full max-w-xs bg-white dark:bg-zinc-800 h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-700">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <button onClick={() => setIsFilterMobileOpen(false)}>
                    <IoCloseOutline className="text-2xl text-gray-500" />
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Categories
                  </h3>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setIsFilterMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold ${
                        selectedCategory === cat.name
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 dark:bg-zinc-700"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span>({cat.count})</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Max Price: ${maxPrice}
                  </h3>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>

              <button
                onClick={() => setIsFilterMobileOpen(false)}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs mt-6"
              >
                Apply Filters
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
