
import { useState } from "react"

export default function Car_css() {
  const [num,setnum]= useState(0);

  function moveplus ()
  {
    if(num>3)
    setnum(num+1)
  }
  function movemins ()
  {
    if(num<0)
    setnum(num-1)
  }

  return (
    <>
    <div className="flex overflow-hidden lopu">
        <div className="bg-stone-700 w-[550px] h-screen div_car" ></div>

        <h1 className=" text-[170px] font-bold text-white absolute  ml-[320px] z-30 text_car
         opacity-0">Feriry</h1>
        <img src="src/assets/car1.png" className="w-[600px] mt-12 z-50 absolute car "/>
         <img src="src/assets/car1_preview.png" className="absolute mt-[229px] w-[77px] h-[77px]  z-50 rounded-full wheel1"/>
        <img src="src/assets/car1_preview.png" className="absolute mt-[221px] w-[80px] h-[80px]  z-50 rounded-full wheel2"/>
        
        <div className="bg-green-600 w-[550px] div_car"></div>
    </div>

    <div className={` bg-red-500   
      ${num==1?"rotate-[45deg] bg-[#334c91]":"" }
      ${num==2?"rotate-[90deg] bg-[#5a2705]":"" }
      ${num==3?"rotate-[135deg] bg-[#c29605]":"" }
      `}>

    </div>
    <div className={` bg-red-500   
      ${num==1?"rotate-[45deg] bg-[#334c91]":"" }
      ${num==2?"rotate-[90deg] bg-[#5a2705]":"" }
      ${num==3?"rotate-[135deg] bg-[#c29605]":"" }
      `}>

    </div>
    <div className={`rounded-full w-40 h-40 bg-red-500 flex justify-center  absolute 
      ${num==1?"rotate-[45deg] bg-[#334c91]":"" }
      ${num==2?"rotate-[90deg] bg-[#5a2705]":"" }
      ${num==3?"rotate-[135deg] bg-[#c29605]":"" }
      `} >
      <img src="" className=""/>
      <img src="" className=""/>
      <img src="" className=""/>
      <img src="" className=""/>
    </div>
    <div>
      <button onClick={()=> {moveplus()}}>+</button>
      <button onClick={()=> {movemins()}}>-</button>
    </div>
    </>
  )
}