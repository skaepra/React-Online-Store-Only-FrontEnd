
import { Button } from "@mui/material";
import { useState } from "react"
// export const Tester = () => {
//     const products=[
//         {name:"jake",price:200},
//         {name:"jake",price:100},
//         {name:"jake",price:200},
//         {name:"jake",price:300},
//     ];
//     // const old =products[0].price

//   return (

//     <div>
//          {products.map((product,index) => {
//             var old=0;
//             if(index==0){
//                  old=products[index].price;}
//                 else{
//                  old=products[index-1].price;}
           
//             return(
//               <div key={index} className="m-16">
//                 <h1>{product.name}</h1>
//               <h1 className={` 
//                 ${product.price==old?" text-gray-700":"text-green-700"}
//                 ${product.price<old?" text-red-700":""}
//                 `}>{product.price}               
//               </h1>
//               </div>             
//         ) })}
//     </div>
//   )
// }
export const Colcaleter = () => {
const [total,settotal] =useState(0)
const [num,setnum] =useState(0)
const [num1,setnum1] =useState(0)

 const onChangeHandler = (event) => { 
    setnum(Number(event.target.value));
  };
   const onChangeHandle = (event) => { 
    setnum1(Number(event.target.value));
  };
   const onsum = () => {
    settotal(num1+num);
  };
   const onmins = () => {
    settotal(num-num1);
  };
   const onx = () => {
    settotal(num1*num);
  };
   const onv = () => {
    settotal(num/num1);
  };
  return (
    <div className="m-20">
      <input className="border-2 border-black block" value={num} onChange={(e)=>{onChangeHandler(e)}}/>   
       <input className="border-2 border-black block" value={num1} onChange={(e)=>{onChangeHandle(e)}}/>  
      <Button className="" onClick={()=>{onsum()}}>+</Button> 
       <Button onClick={()=>{onmins()}}>-</Button> 
        <Button onClick={()=>{onx()}}>x</Button> 
         <Button onClick={()=>{onv()}}>/</Button> 
         <h1>{total}</h1>
    </div>
  )
}
