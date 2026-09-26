import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

interface Category {
  name: string;
  count: number;
}

interface MobileFilterDrawerProps {
  isOpen: boolean;
  categories: Category[];
  selectedCategory: string;
  maxPrice: number;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  onMaxPriceChange: (price: number) => void;
}

export function MobileFilterDrawer({
  isOpen,
  categories,
  selectedCategory,
  maxPrice,
  onClose,
  onSelectCategory,
  onMaxPriceChange,
}: MobileFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="relative ml-auto flex h-full w-full max-w-xs flex-col justify-between overflow-y-auto bg-white p-6 shadow-2xl dark:bg-zinc-800"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button onClick={onClose}>
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
                      onSelectCategory(cat.name);
                      onClose();
                    }}
                    className={`flex w-full items-center justify-between rounded-lg p-3 text-xs font-semibold ${
                      selectedCategory === cat.name
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200"
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
                  onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-[#0071ce] py-3 text-xs font-bold text-white"
            >
              Apply Filters
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
