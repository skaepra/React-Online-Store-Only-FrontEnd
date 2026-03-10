import { InputAdornment, TextField } from "@mui/material";

 export const Input_TextField_Price = ({register,name,errors,icon,Width}) => {
   return (
     <div>
         <TextField 
          {...register(name, {
        onChange: (e) => {//هاد الكود لاضافت فواصل للارقام
          let raw = e.target.value.replace(/,/g, '').replace(/[^\d]/g, ''); // فقط أرقام
          let formatted = raw ? Number(raw).toLocaleString() : '';
          e.target.value = formatted;
        },
      })} 
          
        error={errors[name]}
        helperText={errors[name]?.message}
        label={name}   sx={{mt:2,width:Width}}   

           InputProps={{           
         startAdornment: <InputAdornment position="start" >          
          {icon}
         </InputAdornment>,
         
        }}  
      />   
</div>
   )
 }