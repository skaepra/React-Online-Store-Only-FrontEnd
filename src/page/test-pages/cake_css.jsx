import { useState } from "react";


export default function Cake_css() {
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
    <div>
       <div className={` bg-red-500   
      ${num==1?" bg-[#334c91]":"" }
      ${num==2?" bg-[#5a2705]":"" }
      ${num==3?" bg-[#c29605]":"" }
      `}>

    </div>
    <div className={` bg-red-500   
      ${num==1?" bg-[#334c91]":"" }
      ${num==2?" bg-[#5a2705]":"" }
      ${num==3?" bg-[#c29605]":"" }
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
    </div>
  )
}
