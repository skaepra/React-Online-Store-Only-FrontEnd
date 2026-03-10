import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export const Input_date = ({onChange}) => {
  return (
    <div> 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
      className='w-[232px]'    
     
     onChange={onChange }/>
    </LocalizationProvider>
    </div>
  )
}
