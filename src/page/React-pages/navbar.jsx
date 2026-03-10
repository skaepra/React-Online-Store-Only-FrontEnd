import {  NavLink} from "react-router-dom";
import { useGg } from "../../context/gg";
import  { useEffect, useRef, useState } from "react";
import { Taggol } from "../../components/taggol";
import { useThemeMode } from "../../context/dark";



export default function Newnav() {
  const [isvisible, setisvisible] = useState(true);
  const [list, setlist] = useState(true);

  const { mode, toggleMode } = useThemeMode();

 
  const navitem = [
    { name: "Home", link: "/" },
    { name: "Rent", link: "/rent" },
    { name: "Card", link: "/Home" },
  ];
  
 
  const listhand=()=>{
    setlist(!list)
  }

   {/* nav-visibl  start*/}
  const prevRef = useRef(0);

useEffect(() => {
  let ticking = false;

  const handler = () => {
    const curr = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (curr > prevRef.current && curr > 50) {
          setisvisible(false);
        } else {
          setisvisible(true);
        }

        prevRef.current = curr;
        ticking = false;
      });

      ticking = true;
    }
  };

  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}, []);


{/* nav-visibl  end*/}
  
  const { quint } = useGg();
  return (
    <>
      <div className={` duration-100  border-gray-900 dark:bg-zinc-900 bg-[#212b46]  flex justify-between  text-white fixed top-0 left-0 right-0 
      ${isvisible?" duration-700 ":"-mt-16 duration-700"}
      h-14       
      `}>
        <div className=" flex-none sm:flex h-14  w-28  ml-2">
          <div className="flex items-center max-h-10 sm:mt-2.5 mt-3 max-w-24 mr-10">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </div>
     
           {/* button  start*/}
          <div className="flex h-10    sm:mt-3 mt-5  space-x-3  items-center">
            {navitem.map((item, index) => (
              <div key={index}>
                <NavLink
               
                  to={item.link}
              
                  className={`sr-only sm:not-sr-only
                    flex justify-center  w-12  ml-3  rounded-md size-7 sm:ml-3`}
                >
                  <span className="ml-1 mr-1 ">{item.name}</span>
                </NavLink>
              </div>
            ))}


            <NavLink
              to="/cart"
              
              className={` sm:not-sr-only`}
            >
              <div className={` sr-only sm:not-sr-only` }>
              <div className="w-[16px] ml-[29px] mt-1  h-[16px]  bg-red-700  rounded-full flex absolute   -translate-y-1.5">
                <h1 className={`text-black   text-[10px] absolute ${quint>9?"ml-[3px]":"ml-[5.5px]"}  `} >
                  {quint}
                </h1>
              </div>
              <svg
                className=" w-[36px] h-[31px] ml-2 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="17"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              </div>
            </NavLink>
          </div>
           {/* button  end*/}
        </div> 
        <div className="  w-40 sm:w-auto">

        <div className=" mr-2 h-14 flex   ">
          <div className="ml-14 sm:ml-0">
          <Taggol mode={mode} toggleMode={toggleMode} />
          </div>
           <div className=" sr-only sm:not-sr-only absolute">
          <NavLink
            to="/login"
            
            className="flex justify-center backdrop-brightness-125 h-7  float-end w-20 m-3.5  ml-6 shadow-md  rounded-md  bg-cyan-500  shadow-cyan-500/50   "
          >
            <button>Subscribe</button>
          </NavLink></div>

          <div className=" sr-only sm:not-sr-only ">
          <NavLink
            to="https://www.youtube.com"
            className=" rounded-full mt-2 ml-1  float-left "
          >
            <img className="w-10  h-10 rounded-full" src="src/assets/7.jpg" />
          </NavLink>
          </div>

        
           {/* button-list  start*/}
        <div 
        onClick={listhand}
        className="not-sr-only sm:sr-only   dark:hover:bg-[#363636] hover:bg-gray-700 rounded  mt-3 ml-2 h-8 w-8   ">
         <svg className="w-8 h-8 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
         <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
         </svg>
        </div>
        </div>
 
        <div className="not-sr-only sm:sr-only">
        <div className= {` ${list?"sr-only":"not-sr-only"}  w-44 mr-11 `}>
      {navitem.map((item, index) => (
              <div key={index}>
                <NavLink
                 onClick={listhand}
                  to={item.link}
              
                  className={`
                    flex justify-center  w-40  bg-gray-900  dark:bg-zinc-900  border-black border-[1px] size-7 `}
                >
                  <span className="ml-1 mr-1 ">{item.name}</span>
                </NavLink>
              </div>
            ))}
             <NavLink
                 onClick={listhand}
                  to="/cart"
              
                  className={`
                    flex justify-center  w-40  bg-gray-900  dark:bg-zinc-900  border-black border-[1px] size-7 `}
                >
                  <span className="ml-1 mr-1 ">Cart</span>
                </NavLink>
                <NavLink
                 onClick={listhand}
                  to="/login"
              
                  className={`
                    flex justify-center  w-40  bg-gray-900  dark:bg-zinc-900  border-black border-[1px] size-7 `}
                >
                  <span className="ml-1 mr-1 ">sing in</span>
                </NavLink>
              
      </div>
      </div>
       {/* button-list  end*/}
      </div>
  
  
      </div>
     
     
    </>
  );

}