import { Product } from "../../types/product";

interface ProductTabsProps {
  product: Product;
  activeTab: "description" | "details" | "reviews";
  onTabChange: (tab: "description" | "details" | "reviews") => void;
}

export default function ProductTabs({
  product,
  activeTab,
  onTabChange,
}: ProductTabsProps) {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "details", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
  ] as const;

  return (
    <div
      id="product-tabs"
      className="mt-12 border-y border-slate-200 bg-white px-4 py-6 dark:border-zinc-700 dark:bg-zinc-800/80 sm:px-6"
    >
      <div className="flex border-b border-gray-200 dark:border-zinc-700/60 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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
            <li>Product ID: #{product.id}</li>
            <li>Category: {product.Category}</li>
            <li>
              Available colors: {product.Colors?.join(", ") || "Not specified"}
            </li>
            {product.Sizes?.length ? (
              <li>Available sizes: {product.Sizes.join(", ")}</li>
            ) : null}
          </ul>
        )}

        {activeTab === "reviews" && (
          <div className="py-4">
            <p className="text-sm text-slate-600 dark:text-gray-300">
              There are no reviews for this product yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
