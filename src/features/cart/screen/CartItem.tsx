import { useGg } from "../../../context/gg";
import { Item } from "../components/Item";

const CartItem = () => {
  // TypeScript سيتعرف تلقائياً على أنواع storitems و Totals و quint بفضل التحديث السابق للـ Context
  const { storitems, Totals, quint } = useGg();
  const AllTotal: number = quint * 4 + Totals;

  if (Totals === 0) {
    return (
      <>
        <div className="bg-[#f3f2f2] dark:bg-zinc-800">
          <div className="flex justify-center p-14">
            <div className="lg:ml-8">
              <svg
                className="w-[300px] h-[300px] text-zinc-800 mt-14 dark:text-zinc-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="17"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth={2}
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <h1 className="ml-[55px] text-2xl text-zinc-700 dark:text-zinc-600">
                no items in the cart
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="h-screen bg-[#f3f2f2] dark:bg-zinc-800">
          <div className="bg-[#f3f2f2] dark:bg-zinc-800 p-4">
            <div className="mt-12">
              <h1 className="mb-5 text-center text-2xl font-bold md:ml-8 dark:text-white">
                Cart Items
              </h1>
              
              <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                  {storitems.map((item, index: number) => (
                    <ul key={index}>
                      <li>
                        {/* تمرير خصائص العنصر بأمان الكامل مع Type Safety */}
                        <Item {...item} />
                      </li>
                    </ul>
                  ))}
                </div>

                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">${Totals}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">${quint * 4}</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div>
                      <p className="text-lg font-bold">${AllTotal}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 float-end">including VAT</p>
                  <a href="useraddress" className="w-full mt-6">
                    <button className="mt-6 w-full py-1.5 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 dark:hover:drop-shadow-2xl hover:cursor-pointer">
                      Check out
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CartItem;