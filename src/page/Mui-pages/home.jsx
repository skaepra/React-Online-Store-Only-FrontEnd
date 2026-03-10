import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";

import { red } from "@mui/material/colors";
import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import Items from "../../data/Items";
import { Link } from "react-router-dom";
import { useGg } from "../../context/gg";
import { useEffect, useState } from "react";
import { CardSkelaton } from "../../components/mui-components/skelaton";

export function MuiHome() {
 const { checkCar } = useGg();
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // مثلاً كأنك عم تجيب داتا من API
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // بعد ثانيتين يختفي الـ skeleton
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
  <div>
      {loading ? (
           <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  grid-cols-2 gap-4 px-1 mt-[50px] dark:bg-[#121212]  p-7 pl-3">
            {Items.map((product) => (
            <div key={product.id} >
        <CardSkelaton/>
         </div>
          ))}
        </div>
      ) : (
        // يظهر المحتوى بعد انتهاء التحميل
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  grid-cols-2 gap-4 px-1 mt-[50px] dark:bg-[#121212]  p-7 pl-3">
          {Items.map((product) => (
            <div key={product.id} className="render-animate">


              <Card sx={{ maxWidth: 260, maxHeight: 290 ,mb:1 }} >
                <CardMedia
                  sx={{ maxHeight: 160 }}
                  className="-mb-3 "
                  component="img"
                  height="140"
                  image={product.imageSrc[0]}
                />
                <CardContent className="-mb-7">
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                </CardContent>
                <CardActions className="flex justify-between ">
                  <div>
                    <Checkbox
                   className="size-9"
                      sx={{
                        color: red[800],
                        "&.Mui-checked": {
                          color: red[600],
                        },
                      }}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                    />
                    <Checkbox
                    className="size-9"
                      icon={<BookmarkBorder />}
                      checkedIcon={<Bookmark />}
                    />
                  </div>
                  <Link  to="/Show" className="ml-1">
                  <Button onClick={()=>{checkCar(product.id)} } variant="contained">
                    click
                  </Button>
                  </Link>
               
                </CardActions>
              </Card>            
            </div>
          ))}
      

        </div>
      )}
    </div>
      
  
    </>
  );
}
