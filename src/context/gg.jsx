
import { createContext, useContext, useEffect, useState } from "react";

const GgContext = createContext({ item: [] });
const GgProvider = ({ children }) => {
  // window.localStorage.clear()
  const [visbil,setvisbil] =useState(false)
  const [show,setshows] =useState({})
  const [color,setcolor] =useState("")
  const [imagenumper,setimagenumper] =useState(0)
  const [image,setimage] =useState(0)
  const [storitems, setstoritem] =useState(JSON.parse(localStorage.getItem('storitems'))||[])
  const [Totals, setTotal] =useState(JSON.parse(localStorage.getItem('Total'))||0)
  const [quint, setquint] =useState(JSON.parse(localStorage.getItem('quint'))||0)
  useEffect(()=>{
    localStorage.setItem('storitems',JSON.stringify(storitems))
   },[storitems])
   useEffect(()=>{
    localStorage.setItem('Total',JSON.stringify(Totals))
   },[Totals])
   useEffect(()=>{
    localStorage.setItem('quint',JSON.stringify(quint))
   },[quint])
{/*car project*/}
 const [carId,setcarId] =useState(JSON.parse(localStorage.getItem('carId'))||{})
   useEffect(()=>{
    localStorage.setItem('carId',JSON.stringify(carId))
   },[carId])
  {/*start السيارة Id تحديد */} 
   const checkCar=(id)=>{   
      setcarId ({id})
      
    }
  {/*end السيارة Id تحديد */} 
{/* set-item-color-and-image start*/}
   const  hand=(id)=>{
    if (visbil==false)
    {
      setshows ({id})
    setvisbil(true)}
    else
    
      setvisbil(false)
      setimagenumper(0)
      setcolor("")
  }
  {/* set-item-color-and-image end*/}

  {/* add-item-pris start*/}
   const increcTotal = (tot) => {
    setTotal(Totals + tot);
  };
  const decrecTotal = (tot) => {
    setTotal(Totals - tot);
  };
  {/* add-item-pris end*/}

  const Quantity=(id)=>{
    return storitems.find((item)=>item.id===id)?.quantity ||0
  };

  {/* add-item-in-cart start*/}
  const add = (id,price) => {
    if (storitems.find((item) => item.id === id&& item.color===color)) {
      return setstoritem([...storitems]);
    } else {
        setstoritem([...storitems, {id,quantity:1,color,image}])
        setcolor("")
        setquint(quint+1)
        increcTotal(price)
    }
  };
  {/* add-item-in-cart end*/}

      {/* increc-item-in-cart start*/}
      const increc = (id,color) => {
        setstoritem((currItems)=>{
        if (storitems.find((item) => item.id === id)==null) {
          return (<></>)
        } else {
           return currItems.map((item)=>{
          if(item.id===id && item.color== color){
            setquint(quint+1)
           return {...item,quantity:item.quantity+1}
          } else { 
             return item;
              }})  
          }})}
          {/* increc-item-in-cart end*/}

     {/* decrec-item-in-cart start*/}
   const decrec = (id,color) => {
    setstoritem((currItems)=>{
       if (storitems.find((item) => item.id === id)==null) {
        return currItems.filter((item)=>item.id !==id)
       } else {
          return currItems.map((item)=>{
         if(item.id === id && item.color== color && item.quantity != 1){
          setquint(quint-1)
           return {...item,quantity:item.quantity-1}
         } else { 
            return item;
             }})  
          }})}
           {/* decrec-item-in-cart end*/}


           {/* remove-item-in-cart start*/}
          const remove = (id,Tota,quantity,color) => {
            setstoritem(storitems.filter(item =>item.id !=id || item.color!=color))
            setTotal(Totals - Tota);
            setquint(quint-quantity)
            }
            {/* remove-item-in-cart end*/}

  return (
    <GgContext.Provider value={{storitems,Totals,visbil,show,quint,color,imagenumper,image,add,increc, decrec,Quantity,increcTotal,decrecTotal,remove,hand ,setcolor,setimagenumper,setimage
      ,checkCar,carId
    }}>
      {children}
    </GgContext.Provider>
  );
};
export default GgProvider;

export const useGg = () => {
  return useContext(GgContext);
};
