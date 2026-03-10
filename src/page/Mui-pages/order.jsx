import { AttachMoney, Clear } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react"
import axios from 'axios';



export const Order = () => {
    let allprice=0;
   
    const [expenses,setexpenses]=useState([])

  useEffect(() => {
  
    axios.get("http://localhost:3000/car")
      .then(res => {
        setexpenses(res.data); // البيانات التي أرجعها السيرفر
      })
  }, []);
  
    const remove = (id) => {
      axios.delete(`http://localhost:3000/car/${id}`)
      .then(setexpenses(expenses.filter(item =>item.id !=id )))
    }

//      const edit = (id) => {
//       const updatedData= { 
//       Name: "Feriry",
//       Modelcar: "2020",
//       Time_rent: "4 Year",
//       Price: 75  
//     }
//     axios.put(`http://localhost:3000/car/${id}`, updatedData)  
//     .then(() => {setexpenses(prev =>prev.map(
//       item =>item.id === id ? { ...item, ...updatedData } : item
//     )
//   );
// });
//     }
           
    
  return (
      <div className="mt-16 flex justify-center ">   
      <div className="mt-3">
      {expenses.map((item) => {
       allprice += item.Price;
        return(
        <div key={item.id} className="w-60  mb-3">
       <Paper  sx={{bgcolor:grey ,height:46 ,p:2 ,position:"relative"} } className="hover:bg-stone-100">        
        <div className="flex justify-between -mt-1">
        <h1 >{item.Time_rent}</h1>        
        <h1><AttachMoney sx={{fontSize:18,mb:"3px",mr:-0.5}}/>{item.Price}</h1>       
        <IconButton 
        onClick={()=>{remove(item.id) }}
         sx={{ position:"absolute",top:"0",right:"0" ,width:8,height:8 }} >
          <Clear sx={{fontSize:16 }}/>
        </IconButton>        
        </div>
       </Paper>
       </div>
       );
           })}
           <div className="flex justify-center mb-5">
           {allprice !== 0 && <h1 >
           All Expenses <AttachMoney sx={{fontSize:18,mb:"3px",mr:-0.5}}/>
            {allprice.toFixed(2)}
            </h1>}
            </div>           
           {/* <h1 className={`${allprice==0?" hidden":" "}`}>{allprice}</h1> */}
            </div>         
    </div>
  )
}

