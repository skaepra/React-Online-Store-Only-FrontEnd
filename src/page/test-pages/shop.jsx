
import { useReducer } from "react";



export const Shoping = () => {
  const cont =0;
    const reducer =(state,action) =>
    {
        switch(action)
        {
            case "plus":
                return state+1;
            case "minse":
                 return state-1;
            case "delet":
                 return 0;
             default :
                 return state;
        }
    }
    
    const [state , disp]=useReducer(reducer,cont)
  
    return(
        <>    
            <div className="me-auto m-20">
             
     <button onClick={()=>disp("plus") }   className="w-12 bg-slate-800  shadow-md hover:bg-gray-900 rounded-md size-7 text-white">
   +
     </button>

     <button onClick={()=>disp("minse") }   className="w-12 bg-slate-800  shadow-md hover:bg-gray-900 rounded-md size-7 text-white">
    -
     </button>

     <button onClick={()=>disp("delet") }  className="w-12 bg-slate-800  shadow-md hover:bg-gray-900 rounded-md size-7 text-white">
    resat
     </button>

       <h1>{state}</h1>
        </div>
        </>
)}

