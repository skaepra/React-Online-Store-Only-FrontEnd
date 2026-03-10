 {/* pointer-events-none لجعل العنصر الخفي غير فعال*/}

import { ArrowCircleRightOutlined, ArrowOutward } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";


const images = [
    {name:"Aerphone",path:"src/assets/3.jfif"},
    {name:"phone",path:"src/assets/422564377559090130.jfif"},
    {name:"reing",path:"src/assets/13299761394220174.jfif"},
    {name:"witche",path:"src/assets/12666442696243758.jfif"},
    {name:"reing",path:"src/assets/13299761394220174.jfif"},
    {name:"witche",path:"src/assets/12666442696243758.jfif"}, 
];

export const CssSlid = () => {
  const [Imgindex, setImgindex] = useState(0);
  const intervalRef = useRef(null); 
   const [show, setshow] = useState(false);

  // تابع لتشغيل التايمر
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setImgindex((prev) => (prev + 1) % images.length);
    }, 5000);
  };
  // إيقاف التايمر
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  useEffect(() => {
    startInterval();
    return () => stopInterval(); // ايقاف الموءقت عند الخروج
  }, []);
// تابع لي اعادت تعيت الوقت 
  const handleButtonClick = (index) => {
    stopInterval();      
    setImgindex(index);        // تغيير الصورة مباشرة
  startInterval();    
  };

   const onshow= () => {
 stopInterval();
 setshow(true)
  };
    const offshow= () => {
 startInterval();
 setshow(false)
  };

  return (
    <>
    <div className="h-[400px] mt-14  ">
<div className=" w-6 h-[400px]  flex justify-center">
   {images.map((item, index) => {
  const relativeIndex = (index - Imgindex + images.length) % images.length;
  return (
    <div key={index} className="">
      <div className={`absolute w-[245px] h-[120px] 
        mt-[120px] ml-[115px]    
        ${show ==true ? "hidden" : ""}           
        ${relativeIndex === 0 ? "tager " : "tager1 pointer-events-none"}`}>
                                                 
         <div>
         <h1 className="text-xl font-medium ">New product</h1>
         <h1 className="text-4xl font-medium ">{item.name}</h1>        
         <h1 className="text-xs mt-2 mb-3">sursew ergrfed heolo graphic icere rbrn hrferd frfhue urhf uwhfu uhnfwef uhfuef. </h1>
        
         <button className="hover:mb-3 font-medium absolute"
         onClick={()=>{onshow()}}
         >
         See more <ArrowOutward sx={{width:16,ml:-0.5}} />
         </button>     
         </div>
      </div>
   <img   
      src={item.path}
      className={`
        absolute mt-[70px] ml-[1040px]
        ${relativeIndex === images.length - 1 ? "slid4 " : ""}
        ${show?`${relativeIndex === 0 ? "show opacity-100" : "hidden"}`
        :`${relativeIndex === 0 ? "slid1 opacity-100" : ""}`}
        ${relativeIndex === 1 ? "slid2 opacity-70" : ""}
        ${relativeIndex === 1 ? "slid2 opacity-70" : ""}
        ${relativeIndex === 2 ? "slid3 opacity-30" : ""}
        ${relativeIndex === 3 ? "slid5 opacity-0 ":" "}
        ${relativeIndex > 3 && relativeIndex !== images.length - 1 ? "hidden" : ""}       
      `}
    />
    <div className={`absolute ml-[400px] w-[500px] h-[270px] -mt-2 opacity-0 dis
       ${show==false?"hidden":""}
       ${relativeIndex===0?"":" hidden"}`}>
     <div className="flex">
       <h1 className="text-3xl font-bold ">{item.name} </h1>
      <IconButton  sx={{ml:73,width:30,height:30,position:"absolute"}} onClick={()=>{offshow()}}><ArrowCircleRightOutlined className="text-stone-700" sx={{width:32,height:32}}
      /></IconButton>
     </div>
    <h1 className="text- mt-6 ">this product is best product i am use in evry day 
      i dont can live in word with out it this product is best product i am use in evry day 
      i dont can live in word with out it.
    </h1>
    <div className="flex items-center mt-[100px] f space-x-[340px] "> 
    <h1 className="text-lg ">$25</h1>
    <Button variant="contained">add to cart</Button>
    {/* <Button onClick={()=>{offshow()}} variant="contained">back</Button> */}
    </div>
    </div>
    </div>
  );
})}
</div>
</div>

     <div className="flex justify-center mb-4 -mt-6 ">
                 {images.map((imge, index) => (
<div key={index} 
onClick={()=>{handleButtonClick(index)}}
 className={`border border-black w-2 h-2 rounded-full flex justify-center m-1
  ${index-Imgindex==0?"ring-[3px] ring-blue-400 ":" "} 
  `} >       
</div>
        ))}
 </div>
   
     </>
  )
}