import { useGg } from "../context/gg";
import products from "../data/products";
import { Color } from "./color";
import { Image } from "./image";

export const Buylist = () => {
  const { visbil, hand, show, add } = useGg();
  const item = products.find((i) => i.id === show.id);
  const addcart = (id) => {
    add(id, item.Price);
    hand();
  };

  if (visbil == true) {
    return (
      <>
           <div
         className=" w-full h-full flex justify-center"
        >
        <div
          onClick={() => hand()}
          className="bg-black w-full h-full fixed top-0 left-0 right-0 opacity-75  "
        ></div>
        <div className="bg-[#e4e1e1] rounded  w-[550px] h-[320px] fixed top-[80px]  dark:bg-zinc-900 ">
          
          <span className="text-zinc-700 dark:text-white text-4xl  absolute ml-3 mt-1">
            {item.Name}.
          </span>
          <h1 className="text-zinc-800 dark:text-white text-justify absolute mt-[50px] ml-2 w-80 p-1">
            {item.Description}
          </h1>
          <Color />

          <button
            onClick={() => addcart(show.id)}
            className=" absolute mt-[260px] ml-4 w-32 h-11 text-white font-semibold bg-gradient-to-r bg-blue-700
          hover:bg-blue-800
          dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200  hover:cursor-pointer"
          >
            Add To Cart
          </button>

          <span className="text-zinc-800 text-xl dark:text-white absolute mt-[265px] ml-[265px] w-80 ">
            ${item.Price}
          </span>
          <Image />
        </div>
        </div>
      </>
    );
  } else {
    return <> </>;
  }
};
