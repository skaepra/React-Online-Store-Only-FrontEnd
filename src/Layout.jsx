import { Routes, Route, useLocation } from "react-router-dom";
import Newnav from "./page/React-pages/navbar";
import Home from "./page/React-pages/home";
import CartItem from "./page/React-pages/CartItem";
import { UserAddress } from "./page/React-pages/useraddress";
import ErrorPage from "./page/React-pages/error";
import Sing from "./page/React-pages/sing";
import Login from "./page/React-pages/login";
import { MuiHome } from "./page/Mui-pages/home";
import GgProvider from "./context/gg";
import { Mnav } from "./page/Mui-pages/mui_navbar";
import { Add_expenses } from "./page/Mui-pages/add_expenses";
import { My_expenses } from "./page/Mui-pages/my_expenses";
import { Order } from "./page/Mui-pages/order";
import MainLayout from "./LayoutDiv";
import { Css } from "./page/test-pages/css";
import { Hellow } from "./page/test-pages/hellow";
import CardSkeleton from "./page/test-pages/skeleton";
import { AppThemeProvider } from "./context/dark";
import {Add_item} from "./page/React-pages/add_item"
import Car_css from "./page/test-pages/car_css";
import { Show_Plas } from "./page/Mui-pages/show_plas";







function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/cart", "/useraddress"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const hideMnavRoutes = ["/Home", "/Addexpenses", "/Myexpenses", "/Order"];
  const shouldHideMnav = hideMnavRoutes.includes(location.pathname);



    

  return (
    <>
     <AppThemeProvider>
      <GgProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rent" element={<Add_item />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="/useraddress" element={<UserAddress />} />
          <Route path="/login" element={<Car_css />} />
          <Route path="/sing" element={<Sing />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/Show" element={<Show_Plas/>} />
             {/*mirgin تاخد <MainLayout />الصفحات التي بداخل ال*/}        
           <Route path="/" element={<MainLayout />}>
              <Route path="Home" element={<MuiHome />} />
              <Route path="Addexpenses" element={<Add_expenses />} />
              <Route path="Order" element={<Order/>} />
              <Route path="Myexpenses" element={<My_expenses />} />            
           </Route>
       </Routes>
        {shouldHideNavbar && <Newnav />}
        {shouldHideMnav && <Mnav />}
      </GgProvider>
      </AppThemeProvider>
    </>
  );
}

export default Layout;
