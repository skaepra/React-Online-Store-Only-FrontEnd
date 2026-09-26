import { motion, AnimatePresence } from "framer-motion";
import {
  IoAppsOutline,
  IoFunnelOutline,
  IoOptionsOutline,
} from "react-icons/io5";
import { AddedToast } from "../components/AddedToast";
import { ShoppingHeader } from "../components/ShoppingHeader";
import { useShoppingScreen } from "../hook/useShoppingScreen";
import { ProductCard } from "../components/ProductCard";
import { MobileFilterDrawer } from "../components/MobileFilterDrawer";

export default function ShoppingScreen() {
  const { state, actions } = useShoppingScreen();

  return (
    <div className="min-h-screen bg-[#f5f8fa] pb-16 transition-colors duration-200 dark:bg-zinc-900">
      <AddedToast message={state.addedToast} />

      <ShoppingHeader />

      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          aria-label="Shop by category"
          className="-mx-4 mb-5 flex gap-4 overflow-x-auto border-b border-slate-200 px-4 pb-5 sm:mx-0 sm:px-0 dark:border-zinc-700"
        >
          {state.categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => actions.setSelectedCategory(category.name)}
              aria-pressed={state.selectedCategory === category.name}
              className="group flex w-[82px] shrink-0 flex-col items-center gap-2 text-center"
            >
              <span
                className={`grid h-[68px] w-[68px] place-items-center overflow-hidden rounded-lg transition-colors ${
                  state.selectedCategory === category.name
                    ? "bg-[#e4f0ff] ring-2 ring-[#0053e2]"
                    : "bg-slate-100 group-hover:bg-slate-200 dark:bg-zinc-800"
                }`}
              >
                {index === 0 ? (
                  <IoAppsOutline className="text-3xl text-[#0053e2]" />
                ) : category.image ? (
                  <img
                    src={category.image}
                    alt=""
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                ) : (
                  <IoAppsOutline className="text-3xl text-[#0053e2]" />
                )}
              </span>
              <span className="line-clamp-2 min-h-8 text-xs font-medium leading-4 text-slate-800 dark:text-gray-200">
                {category.name === "All" ? "All products" : category.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-3 border-y border-slate-200 py-3 dark:border-zinc-700">
          <button
            onClick={() => actions.setIsFilterMobileOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-400 px-4 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 dark:border-zinc-600 dark:text-gray-200 dark:hover:bg-zinc-800 lg:hidden"
          >
            <IoFunnelOutline className="text-base" />
            Filters
          </button>

          <label className="inline-flex h-10 items-center gap-3 rounded-full border border-slate-400 px-4 text-xs font-medium text-slate-800 dark:border-zinc-600 dark:text-gray-200">
            <span>Price up to ${state.maxPrice}</span>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={state.maxPrice}
              onChange={(event) =>
                actions.setMaxPrice(Number(event.target.value))
              }
              aria-label="Maximum price"
              className="w-20 accent-[#0053e2] sm:w-28"
            />
          </label>

          <span className="mr-auto text-xs font-medium text-slate-600 dark:text-gray-400">
            {state.filteredProducts.length} products
          </span>

          <label className="inline-flex h-10 items-center gap-2 text-xs text-slate-700 dark:text-gray-300">
            <span className="hidden sm:inline">Sort by</span>
            <select
              value={state.sortBy}
              onChange={(event) => actions.setSortBy(event.target.value)}
              className="h-10 rounded-full border border-slate-400 bg-white px-4 text-xs font-medium text-slate-900 outline-none focus:border-[#0053e2] dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            >
              <option value="default">Best match</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        <section aria-labelledby="products-heading" className="pb-10">
          <div className="mb-4 flex items-baseline gap-2">
            <h2
              id="products-heading"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              {state.selectedCategory === "All"
                ? "All products"
                : state.selectedCategory}
            </h2>
            <span className="text-sm text-slate-500 dark:text-gray-400">
              ({state.filteredProducts.length})
            </span>
          </div>

          {state.filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 min-[1280px]:grid-cols-5"
            >
              <AnimatePresence>
                {state.filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFav={actions.isProductInWishlist(product.id)}
                    onProductClick={actions.handleProductClick}
                    onQuickAdd={actions.handleQuickAdd}
                    onToggleWishlist={actions.handleToggleWishlist}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="border-t border-slate-200 bg-white py-16 text-center dark:border-zinc-700 dark:bg-zinc-800">
              <IoOptionsOutline className="mx-auto mb-3 text-4xl text-gray-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                No products found
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Try adjusting your filters or search.
              </p>
              <button
                onClick={actions.handleResetFilters}
                className="mt-4 rounded-full bg-[#0053e2] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0047c6]"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </main>

      <MobileFilterDrawer
        isOpen={state.isFilterMobileOpen}
        categories={state.categories}
        selectedCategory={state.selectedCategory}
        maxPrice={state.maxPrice}
        onClose={() => actions.setIsFilterMobileOpen(false)}
        onSelectCategory={actions.setSelectedCategory}
        onMaxPriceChange={actions.setMaxPrice}
      />
    </div>
  );
}
