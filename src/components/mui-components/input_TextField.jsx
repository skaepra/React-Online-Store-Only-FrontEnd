
import { InputAdornment, TextField } from "@mui/material";

 export const Input_TextField = ({register,name,errors,icon,Width}) => {
   return (
     <div>
         <TextField 
          {...register(name)} 
        error={errors[name]}
        helperText={errors[name]?.message}
        label={name}   sx={{mt:2,width:Width}}     
           InputProps={{           
         startAdornment: <InputAdornment position="start" >{icon}</InputAdornment>,
        }}  
      />   
</div>
   )
 }
 