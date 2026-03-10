import { Home, LocalMallSharp, Menu } from "@mui/icons-material";
import { IconButton} from "@mui/material";
import { CssSlid } from "./cssslid";


export const Css = () => {

  return (
    <>
    <div className="me-auto m-20 flex">
    {/* start test navepar*/}
     <div>
        <div className="flex justify-between w-[210px] h-[50px]  space-x-3  ml-20 p-3  ">
        <div className="bg-sky-500 h-10 w-11 flex justify-center rounded-full  ">
           <IconButton>
          <Menu />
         </IconButton>
          </div>
         <div className="bg-sky-500 h-10 w-11 flex justify-center rounded-full   ">
           <IconButton>
          <Menu />
         </IconButton>
          </div>
          <div className="bg-sky-500 h-10 w-11 flex justify-center rounded-full   ">
             <IconButton>
          <Menu />
         </IconButton>
            </div>
          </div>
         <div className="w-[210px] h-[50px] bg-sky-500 ml-20 -mt-10 navpar-radius1 flex space-x-7   pl-3 pt-1 ">
           <IconButton sx={{width:44 ,height:40}}  >
          <Home />
         </IconButton>
          <IconButton sx={{width:42 ,height:40}}>
          <Menu />
         </IconButton>
          <IconButton  sx={{width:44 ,height:40}} >
          <LocalMallSharp />
         </IconButton>
           </div> 
     </div>
     {/* end test navepar*/}
     {/* start test card*/}
     <div className="w-[150px] h-[200px] ml-auto mr-auto render-animate">
     <div className="w-[72px] h-[34px] ml-[2px] bg-stone-600 -mb-9 rounded flex justify-center">
      <h1 className="mt-[2px] text-white text-lg">Rolex</h1>
     </div>
     <div className=" border-radius ">
       <img src="src/assets/12666442696243758.jfif"/>
     </div>
     </div>
     {/* end test card*/}
    </div>
    <duv>
      <CssSlid/>
    </duv>

   
     </>
  )
}
