import {
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  TextField,
  Button,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Items from "../../data/Items";
import axios from "axios";
import moment from "moment/moment";
import { Input_date } from "../../components/mui-components/input_date";
import { Input_time } from "../../components/mui-components/input_time";

export function Show_Plas() {

  const carId=1
  const item = Items.find((i) => i.id === carId.id);
  const [img, setimg] = useState(item.imageSrc[0]);
  const [time, setTime] = useState("day");
  const [AllOptions, setAllOptions] = useState([]);
  const [options, setoption] = useState([]);
  const [SelectOption, setSelectOption] = useState({});
  const [PickupDay, setPickupDay] = useState("");
  const [PickupTime, setPickupTime] = useState("");
  const [date, setdate] = useState("");

  useEffect(() => {
    setdate(moment().format("DD/MM/YYYY"));
    axios.get("http://localhost:3000/option")
      .then((res) => setAllOptions(res.data));
  }, []);

  useEffect(() => {
    setoption(AllOptions[time] || []);
  }, [time, AllOptions]);

  const imgChange = (imges) => setimg(imges);
  const TimeChange = (event) => setTime(event.target.value);
  const valedChange = (event, newValue) => setSelectOption(newValue);

  const onSubmit = () => {
    const Price = Number(SelectOption.price);
    axios.post("http://localhost:3000/car", {
      Name: item.name,
      Modelcar: item.modelycar,
      Time_rent: SelectOption.label,
      Price: Price,
      Car_Pickup_Day: PickupDay,
      Car_Pickup_Time: PickupTime,
      DateOrder: date,
    });
  };

  return (
    <div className="flex mt-9 border p-2 bg-stone-50">
      <div className="mr-5 flex ml-6">
        <div className="mr-1 ml-1">
          {item.imageSrc.map((imgsrc, Index) => (
            <div key={Index}>
              <img
                src={imgsrc}
                onClick={() => imgChange(imgsrc)}
                className="w-[60px] h-[51px] mb-1"
              />
            </div>
          ))}
        </div>
        <img src={img} className="w-[400px] max-h-[280px]" />
      </div>
      <div>
        <Typography sx={{ mb: 1 }} variant="h4" color="initial">
          {item.name}
        </Typography>
        <p className="max-w-[550px] min-h-[80px] max-h-[80px]">
          {item.description || "No description available."}
        </p>
        <FormControl sx={{ mt: 1 }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Time</FormLabel>
          <RadioGroup
            row
            name="controlled-radio-buttons-group"
            value={time}
            onChange={TimeChange}
          >
            <FormControlLabel value="day" control={<Radio />} label="Day" />
            <FormControlLabel value="week" control={<Radio />} label="Week" />
            <FormControlLabel value="month" control={<Radio />} label="Month" />
            <FormControlLabel value="offers" control={<Radio />} label="Offers" />
          </RadioGroup>
        </FormControl>
        <div className="flex">
          <Autocomplete
            onChange={valedChange}
            options={options}
            getOptionLabel={(option) => `${option.label} - $${option.price.toFixed(2)}`}
            sx={{ width: 230, m: 1, mt: 1, mb: 1 }}
            renderInput={(params) => <TextField {...params} label={time} />}
            renderOption={(props, option) => (
              <li {...props}>
                {option.label} - ${option.price.toFixed(2)}
              </li>
            )}
          />
        </div>
        <div className="flex">
          <span className="-ml-32 mr-[14px] mt-4">Car Pickup Time :</span>
          <Input_date onChange={(newValue) => setPickupDay(newValue.format("DD/MM/YYYY"))} />
          <Input_time onChange={(newValue) => setPickupTime(newValue.format("hh:mm A"))} />
          <Link to="/Order" className="h-8 mt-2 ml-4">
            <Button
              onClick={onSubmit}
              variant="contained"
            >
              Order
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}