import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"

 export const Input_time = ({onChange}) => {
   return (
     <div>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
          className='w-[150px] '
          sx={{ml:2,mr:2}}    
          onChange={onChange}/>              
       </LocalizationProvider>
     </div>
   )
 }
 