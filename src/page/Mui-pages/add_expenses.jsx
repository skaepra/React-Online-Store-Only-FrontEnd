import {  useForm } from "react-hook-form"
import { Button} from "@mui/material";
import { LocalMallSharp, MonetizationOn} from "@mui/icons-material"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../validations/productSchema";
import { Input_TextField } from "../../components/mui-components/input_TextField";
import { Input_TextField_Price } from "../../components/mui-components/input_TextField_Price";

export function Add_expenses() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
     reset
  } = useForm({
    mode:"onChange",
    resolver: zodResolver(productSchema)
  });

  const onSubmit = (data) => {
    const Price = Number(data.Price);
  
          fetch("http://localhost:3000/mydata",
            {method:"POST",
              headers:{},
              body:JSON.stringify({Product:data.Product,Price})
              
         })  // تفريغ الحقول بعد النجاح
           .then(() => { reset();});       
      }
 
  return (
    <>     

        <div className=" flex justify-center items-center  mt-16 ">         
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
         
        <Input_TextField 
          register={register} 
          name="Product" 
          errors={errors}  
          icon={<LocalMallSharp />}/>

          <Input_TextField_Price
          register={register} 
          name="Price"         
          errors={errors}  
          icon={<MonetizationOn />}/>


                 {/* <hr></hr>
       {errors.Product && <span className="text-red-500 text-sm ">This Product is required</span>} */}
    

<div className="flex justify-center ">
        <Button type="submit" variant="contained" sx={{mt:1}} >click</Button>
       
</div>      
        </form>
        </div>
    </>
  );
}  