export function ShoppingHeader() {
  return (
    <div className=" mb-1 sm:mb-5 border-b border-slate-200 bg-white py-2 md:py-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Shop all products
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
          Find everyday favorites across the store.
        </p>
      </div>
    </div>
  );
}
