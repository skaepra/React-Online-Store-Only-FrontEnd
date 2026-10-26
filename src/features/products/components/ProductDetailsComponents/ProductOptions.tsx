import {
  IoCheckmark,
  IoCartOutline,
  IoBagCheckOutline,
  IoCarOutline,
  IoSyncOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { Product } from "../../types/product";

interface ProductOptionsProps {
  product: Product;
  currentPrice: number;
  currentStock: number; // <-- استقبال المخزون
  selectedColor: string;
  onSelectColor: (color: string) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export default function ProductOptions({
  product,
  currentPrice,
  currentStock,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
  quantity,
  onIncrement,
  onDecrement,
  onAddToCart,
  onBuyNow,
}: ProductOptionsProps) {
  const currentVariant = product.Variant?.find(
    (v) => v.colorName === selectedColor
  );

  // حالات المخزون
  const isOutOfStock = currentStock === 0;
  const isLowStock = currentStock > 0 && currentStock <= 7;

  return (
    <div className="grid min-w-0 gap-6 lg:col-span-7 lg:grid-cols-[minmax(0,1fr)_280px]">
      <section className="min-w-0 space-y-5">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-[#0053e2]">
            {product.Category}
          </p>
          <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white sm:text-3xl">
            {product.Name}
          </h1>
          
         
        </div>

        <p className="text-sm leading-6 text-slate-700 dark:text-gray-300">
          {product.Description}
        </p>

        {/* عرض الألوان */}
        {product.Variant && product.Variant.length > 0 && (
          <div className="space-y-3 border-t border-slate-200 pt-5 dark:border-zinc-700">
            <p className="text-sm font-semibold text-slate-800 dark:text-gray-200">
              Color: <span className="font-normal">{selectedColor}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {product.Variant.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => onSelectColor(variant.colorName)}
                  aria-label={`Select ${variant.colorName}`}
                  className={`grid h-12 w-12 place-items-center rounded-full border-2 transition-colors ${
                    selectedColor === variant.colorName
                      ? "border-[#0053e2]"
                      : "border-slate-300 dark:border-zinc-600"
                  }`}
                >
                  <span
                    className="h-9 w-9 rounded-full border border-black/10"
                    style={{ backgroundColor: variant.colorHex }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* عرض المقاسات */}
        {currentVariant?.Sizes && currentVariant.Sizes.length > 0 && (
          <div className="space-y-2 border-t border-slate-200 pt-5 dark:border-zinc-700">
            <p className="text-sm font-semibold text-slate-800 dark:text-gray-200">
              Select size
            </p>
            <div className="flex flex-wrap gap-2">
              {currentVariant.Sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onSelectSize(size)}
                  className={`min-w-12 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-[#0053e2] bg-[#eaf2ff] text-[#0047c6] dark:bg-zinc-900 "
                      : "border-slate-300 text-slate-700 hover:border-[#0053e2] dark:border-zinc-600 dark:text-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <aside className="h-fit space-y-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-800">
        <div>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            ${currentPrice.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-gray-400">
            Price when purchased online
          </p>
        </div>

        {/* أزرار التحكم بالكمية (تُعطل إذا نفذ المخزون) */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-800 dark:text-gray-200">
            Quantity
          </p>
          <div className={`inline-flex h-10 items-center overflow-hidden rounded-full border border-slate-300 dark:border-zinc-600 ${isOutOfStock ? "opacity-50 pointer-events-none" : ""}`}>
            <button
              onClick={onDecrement}
              disabled={isOutOfStock}
              className="h-10 w-10 text-lg hover:bg-slate-100 dark:hover:bg-zinc-700 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="min-w-9 text-center text-sm font-semibold">
              {quantity}
            </span>
            <button
              onClick={onIncrement}
              disabled={isOutOfStock || quantity >= currentStock}
              className="h-10 w-10 text-lg hover:bg-slate-100 dark:hover:bg-zinc-750 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

         {/* عرض حالة المخزون للمستخدم */}
          <div className="pt-1">
            {isOutOfStock ? (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-amber-400">
                Only {currentStock} left in stock
              </span>
            ) : (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                In Stock
              </span>
            )}
          </div>

        {/* أزرار الشراء */}
        <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-zinc-700">
          <button
            onClick={onAddToCart}
            disabled={isOutOfStock}
            className={`flex h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-bold text-white transition-colors ${
              isOutOfStock
                ? "bg-gray-400 dark:bg-zinc-600 cursor-not-allowed"
                : "bg-[#0053e2] hover:bg-[#0047c6] active:scale-[0.99]"
            }`}
          >
            <IoCartOutline className="text-lg" />
            <span>{isOutOfStock ? "Sold Out" : "Add to cart"}</span>
          </button>
          
          <button
            onClick={onBuyNow}
            disabled={isOutOfStock}
            className={`h-11 w-full rounded-full border px-4 text-sm font-bold transition-colors ${
              isOutOfStock
                ? "border-gray-300 text-gray-400 dark:border-zinc-700 dark:text-zinc-500 cursor-not-allowed"
                : "border-[#2a67cf] text-[#2a67cf] hover:bg-[#eaf2ff] dark:hover:bg-[#333335]"
            }`}
          >
            Buy now
          </button>
        </div>
      </aside>
    </div>
  );
}