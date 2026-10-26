import { motion } from "framer-motion";
import { IoCartOutline, IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 transition-colors duration-200 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-4 max-w-md mx-auto"
      >
        <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-500 text-3xl shadow-sm">
          <IoCartOutline />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Your cart is empty
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Looks like you haven't added anything to your cart yet. Explore our
            collection and find something you love!
          </p>
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25"
        >
          <IoBagHandleOutline className="text-base" />
          <span>Explore Collection</span>
        </button>
      </motion.div>
    </div>
  );
}