import {  NavLink} from "react-router-dom";
import { useGg } from "../../context/gg";
import  { useEffect, useState } from "react";
import { Taggol } from "../../components/taggol";




export default function Newnav() {
  const [scrollposition, setscrollposition] = useState(JSON.parse(localStorage.getItem('position'))||0);
  const [isvisible, setisvisible] = useState(true);
  const [paths, setpaths] = useState("http://localhost:5173/");
  const [changpaths, setchangpaths] = useState(0);
 
  const hol=()=>{
    setchangpaths(changpaths+1)
  }
  useEffect(()=>{
    const ur= window.location.href;
     setpaths(ur)
  },[changpaths])
  
 
  useEffect(()=>{
    localStorage.setItem('position',JSON.stringify(scrollposition))
   },[scrollposition])

  useEffect(()=>{
    const handler=()=>{
    const currScrooll= window.scrollY;
    if(currScrooll>scrollposition&& currScrooll>50) {
      setisvisible(false)
    }else{
      setisvisible(true)
    }
    setscrollposition(currScrooll)
  }
  window.addEventListener('scroll',handler)
  return()=>{
    window.removeEventListener('scroll',handler)
  }
  },[scrollposition])


  const navitem = [
    { name: "Home", link: "/" },
    { name: "Rent", link: "/rent" },
    { name: "Card", link: "/card" },
  ];

  
   
 

  const [dark, setdark] = useState(
    JSON.parse(localStorage.getItem("dark")) || "light"
  );

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [dark]);

  const toggleclick = () => {
    if (dark == "light") {
      setdark((localStorage.theme = "dark"));
    } else {
      setdark((localStorage.theme = "light"));
    }
  };

 
  const { quint } = useGg();
  return (
    <>
      <div className={`   flex justify-between  text-white  sm:h-14  h-28
      ${isvisible?" fixed top-0 left-0 right-0 ":"sr-only translate-y-5"}
      ${scrollposition<40?" ":" bg-gray-900 border-gray-900 dark:bg-zinc-900"}
      ${paths=="http://localhost:5173/"?".back":"bg-gray-900 border-gray-900 dark:bg-zinc-900"}
      `}>
        <div className=" flex-none sm:flex h-14  w-28  ml-2">
          <div className="flex items-center max-h-10 mt-2 max-w-24 mr-10">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </div>

          <div className="flex h-10    sm:mt-3 mt-8">
            {navitem.map((item, index) => (
              <div key={index}>
                <NavLink
                  to={item.link}
                  onClick={hol}
                  className="flex justify-center  w-12 mt-1 ml-6    rounded-md size-7 sm:ml-5"
                >
                  <span className="ml-1 mr-1 ">{item.name}</span>
                </NavLink>
              </div>
            ))}


            <NavLink
              to="/cart"
              onClick={hol}
              className=" relative  w-9 h-[33px] mt-0.5   ml-6 sm:ml-5    rounded-full   "
            >
              <div className="w-[16px] ml-[22px] mt-1  h-[16px]  bg-red-700  rounded-full flex absolute   -translate-y-1.5">
                <h1 className={`text-black   text-[10px] absolute ${quint>9?"ml-[3px]":"ml-[5.5px]"}  `} >
                  {quint}
                </h1>
              </div>
              <svg
                className=" w-[36px] h-[31px]  dark:text-white"
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
            </NavLink>
          </div>
        </div>

        {/* float-end */}

        <div className=" mr-2 h-14 flex   ">
          <Taggol dark={dark} action={toggleclick} />
     

          <NavLink
            to="/sing"
            onClick={hol}
            className="flex justify-center backdrop-brightness-125  float-end w-20 m-3.5  ml-6 shadow-md  rounded-md size-7  bg-cyan-500  shadow-cyan-500/50 "
          >
            <button>Subscribe</button>
          </NavLink>

          <NavLink
            to="https://www.youtube.com"
            className=" rounded-full mt-2 ml-1  float-left "
          >
            <img className="w-10  h-10 rounded-full" src="src/assets/7.jpg" />
          </NavLink>
        </div>
      </div>
    </>
  );

}
