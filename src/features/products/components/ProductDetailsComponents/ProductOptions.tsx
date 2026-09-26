import {
  IoStar,
  IoStarOutline,
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
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span
              className="flex items-center gap-0.5 text-amber-500"
              aria-label="Rated 4.8 out of 5"
            >
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStarOutline className="text-slate-300" />
            </span>
            <span className="text-xs text-slate-600 dark:text-gray-400">
              4.8
            </span>
            <span className="text-slate-400">|</span>
            <button
              onClick={() =>
                document
                  .getElementById("product-tabs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-xs text-[#0053e2] underline underline-offset-2"
            >
              Reviews
            </button>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-700 dark:text-gray-300">
          {product.Description}
        </p>

        {product.Colors && product.Colors.length > 0 && (
          <div className="space-y-3 border-t border-slate-200 pt-5 dark:border-zinc-700">
            <p className="text-sm font-semibold text-slate-800 dark:text-gray-200">
              Color: <span className="font-normal">{selectedColor}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {product.Colors.map((color, index) => (
                <button
                  key={`${color}-${index}`}
                  onClick={() => onSelectColor(color)}
                  aria-label={`Select ${color}`}
                  aria-pressed={selectedColor === color}
                  className={`grid h-12 w-12 place-items-center rounded-full border-2 transition-colors ${
                    selectedColor === color
                      ? "border-[#0053e2]"
                      : "border-slate-300 dark:border-zinc-600"
                  }`}
                >
                  <span
                    className="h-9 w-9 rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {product.Sizes && product.Sizes.length > 0 && (
          <div className="space-y-2 border-t border-slate-200 pt-5 dark:border-zinc-700">
            <p className="text-sm font-semibold text-slate-800 dark:text-gray-200">
              Select size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.Sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onSelectSize(size)}
                  aria-pressed={selectedSize === size}
                  className={`min-w-12 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-[#0053e2] bg-[#eaf2ff] text-[#0047c6]"
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
            ${product.Price.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-gray-400">
            Price when purchased online
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 border-b border-slate-200 pb-4 text-xs text-slate-700 dark:border-zinc-700 dark:text-gray-300">
          <span className="inline-flex items-center gap-1.5">
            <IoCarOutline className="text-base" /> Free shipping
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IoSyncOutline className="text-base" /> 15-day returns
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-800 dark:text-gray-200">
            Quantity
          </p>
          <div className="inline-flex h-10 items-center overflow-hidden rounded-full border border-slate-300 dark:border-zinc-600">
            <button
              onClick={onDecrement}
              aria-label="Decrease quantity"
              className="h-10 w-10 text-lg hover:bg-slate-100 dark:hover:bg-zinc-700"
            >
              -
            </button>
            <span className="min-w-9 text-center text-sm font-semibold">
              {quantity}
            </span>
            <button
              onClick={onIncrement}
              aria-label="Increase quantity"
              className="h-10 w-10 text-lg hover:bg-slate-100 dark:hover:bg-zinc-700"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-zinc-700">
          <button
            onClick={onAddToCart}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0053e2] px-4 text-sm font-bold text-white transition-colors hover:bg-[#0047c6] active:scale-[0.99]"
          >
            <IoCartOutline className="text-lg" />
            <span>Add to cart</span>
          </button>
          <button
            onClick={onBuyNow}
            className="h-11 w-full rounded-full border border-[#0053e2] px-4 text-sm font-bold text-[#0053e2] transition-colors hover:bg-[#eaf2ff]"
          >
            Buy now
          </button>
        </div>

        <div className="space-y-2 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-600 dark:border-zinc-700 dark:text-gray-400">
          <p>
            <IoShieldCheckmarkOutline className="mr-1 inline text-[#0053e2]" />
            Secure checkout
          </p>
          <p>Free shipping on orders over $5</p>
        </div>
      </aside>
    </div>
  );
}
