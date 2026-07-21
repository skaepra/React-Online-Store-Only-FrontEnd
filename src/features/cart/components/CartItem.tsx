import { useGg } from "../../../context/gg";
import products from "../../../data/products";

// 1. تعريف أنواع البيانات
interface DatabaseProduct {
  id: string | number;
  Name: string;
  Price: number;
  ImageAlt?: string;
}

interface ItemProps {
  id: string | number;
  quantity: number;
  color: string;
  image: string | number;
}


export function CartItem({ id, quantity, color, image }: ItemProps) {
  const { increc, decrec, increcTotal, decrecTotal, remove } = useGg();

  const item = (products as DatabaseProduct[]).find(
    (i) => Number(i.id) === Number(id)
  );

  if (!item) return null;

  const total: number = item.Price * quantity;

  const plass = (itemId: string | number, itemColor: string, price: number) => {
    increc(itemId, itemColor);
    increcTotal(price);
  };

  const mines = (itemId: string | number, itemColor: string, price: number) => {
    decrec(itemId, itemColor);
    if (quantity > 1) decrecTotal(price);
  };

  return (
    <div className={styles.card}>
      <img
        src={typeof image === 'number' ? String(image) : image}
        alt={item.ImageAlt || item.Name}
        className={styles.productImg}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.detailsBox}>
          <h2 className={styles.title}>
            {item.Name} {color}
          </h2>
          <p className={styles.price}>${item.Price}</p>
        </div>

        <div className={styles.actionsWrapper}>
          {/* عداد الكمية */}
          <div className={styles.quantityContainer}>
            <span
              onClick={() => mines(id, color, item.Price)}
              className={styles.quantityBtnLeft}
            >
              -
            </span>
            <span className={styles.quantityCount}>
              {quantity}
            </span>
            <span
              onClick={() => plass(id, color, item.Price)}
              className={styles.quantityBtnRight}
            >
              +
            </span>
          </div>

          {/* الإجمالي وزر الحذف */}
          <div className={styles.totalSection}>
            <p className={styles.totalText}>${total}</p>
            <svg
              onClick={() => remove(id, total, quantity, color)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={styles.removeIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. فصل جميع كلاسات Tailwind في كائن styles خارجي
const styles = {
  card: "justify-between mb-6 rounded-lg bg-white dark:bg-zinc-900 border dark:border-zinc-800 p-6 shadow-md xs:flex xs:justify-start",
  productImg: "w-full aspect-[4/3] overflow-hidden rounded-lg max-h-44 lg:max-h-32 lg:w-[250px] object-fill bg-gray-100 dark:bg-zinc-800",
  
  contentWrapper: "xs:ml-4 xs:flex xs:w-full xs:justify-between",
  detailsBox: "mt-5 xs:mt-0",
  title: "text-lg font-bold text-gray-900 dark:text-white",
  price: "mt-1 text-xs text-gray-700 dark:text-gray-400",

  actionsWrapper: "mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6",
  
  // Quantity Selector
  quantityContainer: "flex items-center border-gray-100 dark:border-zinc-700",
  quantityBtnLeft: "cursor-pointer rounded-l bg-gray-100 dark:bg-zinc-800 dark:text-white py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-white select-none",
  quantityCount: "cursor-default bg-gray-100 dark:bg-zinc-800 dark:text-white py-1 px-3.5 duration-100 select-none",
  quantityBtnRight: "cursor-pointer rounded-r bg-gray-100 dark:bg-zinc-800 dark:text-white py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white select-none",

  // Price & Remove Section
  totalSection: "flex items-center space-x-4",
  totalText: "text-sm font-semibold text-gray-900 dark:text-white",
  removeIcon: "h-5 w-5 cursor-pointer text-gray-500 dark:text-gray-400 duration-150 hover:text-red-600 dark:hover:text-red-500",
};