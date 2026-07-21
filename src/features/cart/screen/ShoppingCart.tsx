
import { CartItem } from "../components/CartItem";
import { useCartStore } from "../store/useCartStore";

export default function ShoppingCartScreen() {
  // سحب حالات السلة من useCartStore
  const storitems = useCartStore((state) => state.storitems);
  const Totals = useCartStore((state) => state.Totals);
  const quint = useCartStore((state) => state.AllQuantity);

  const AllTotal: number = quint * 4 + Totals;

  // حالة السلة الفارغة
  if (Totals === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.emptyContainer}>
          <div className={styles.emptyContent}>
            <svg
              className={styles.emptyIcon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth={2}
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
            <h1 className={styles.emptyText}>
              no items in the cart
            </h1>
          </div>
        </div>
      </div>
    );
  }

  // حالة السلة مليئة
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.cartHeader}>
        Cart Items
      </h1>

      <div className={styles.mainLayout}>
        {/* قائمة المنتجات */}
        <div className={styles.itemsListContainer}>
          {storitems.map((item, index: number) => (
            <div key={index}>
              <CartItem {...item} />
            </div>
          ))}
        </div>

        {/* كارت الفاتورة / الملخص */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <p>Subtotal</p>
            <p>${Totals}</p>
          </div>
          <div className={styles.summaryRow}>
            <p>Shipping</p>
            <p>${quint * 4}</p>
          </div>
          
          <hr className={styles.summaryDivider} />
          
          <div className={styles.summaryTotalRow}>
            <p>Total</p>
            <p>${AllTotal}</p>
          </div>
          
          <p className={styles.vatNotice}>including VAT</p>

          <a href="useraddress" className={styles.checkoutBtn}>
            Check out
          </a>
        </div>
      </div>
    </div>
  );
}


// فصل التنسيقات خارج المكون
const styles = {
  // Common Layout
  wrapper: "min-h-screen bg-[#f3f2f2] dark:bg-zinc-800 p-4",
  
  // Empty State Styles
  emptyContainer: "flex justify-center p-14",
  emptyContent: "lg:ml-8 text-center flex flex-col items-center",
  emptyIcon: "w-[300px] h-[300px] text-zinc-800 mt-14 dark:text-zinc-700",
  emptyText: "text-2xl text-zinc-700 dark:text-zinc-600 mt-4",

  // Cart Content Styles
  cartHeader: "mt-12 mb-5 text-center text-2xl font-bold md:ml-8 dark:text-white",
  mainLayout: "mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0",
  itemsListContainer: "rounded-lg md:w-2/3 space-y-4",

  // Summary Card Styles
  summaryCard: "mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 dark:bg-zinc-900 dark:border-zinc-700",
  summaryRow: "mb-2 flex justify-between text-gray-700 dark:text-gray-300",
  summaryDivider: "my-4 border-gray-200 dark:border-zinc-700",
  summaryTotalRow: "flex justify-between text-lg font-bold text-gray-900 dark:text-white",
  vatNotice: "text-sm text-gray-500 float-end mt-1",
  
  checkoutBtn: "mt-6 w-full py-1.5 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 dark:hover:drop-shadow-2xl cursor-pointer block text-center",
};