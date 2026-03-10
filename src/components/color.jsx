import products from "../data/products";
import { useGg } from "../context/gg";

export const Color = () => {
  const { show, setimagenumper } = useGg();
  const item = products.find((i) => i.id === show.id);
  function chickcolor(index) {
    setimagenumper(index);
  }
  return (
    <>
      <div className="flex -space-x-4 rtl:space-x-reverse absolute mt-[200px] ml-[15px] ">
        {item.Colors.map((cor, index) => (
          <div key={index}>
            <button
              type="checkbox"
              name="op"
              onClick={() => chickcolor(index)}
              style={{ backgroundColor: cor }}
              className="bg-neutral-800 w-10 h-10 transition-all rounded-full block ring-[#3b3838] ring-1 focus:ring-4 ring-offset-1  "
            ></button>
          </div>
        ))}
      </div>
    </>
  );
};
