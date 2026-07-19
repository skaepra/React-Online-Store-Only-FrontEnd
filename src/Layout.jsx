import { Routes, Route, useLocation } from "react-router-dom";
import Newnav from "./features/home/components/navbar";

import { UserAddress } from "./features/Address/screen/useraddress";
import ErrorPage from "./features/error/error";
import Sing from "./features/auth/Screens/sing";
import Login from "./features/auth/Screens/login";
import { MuiHome } from "./page/Mui-pages/home";
import GgProvider from "./context/gg";
import { Mnav } from "./page/Mui-pages/mui_navbar";
import { Add_expenses } from "./page/Mui-pages/add_expenses";
import { My_expenses } from "./page/Mui-pages/my_expenses";
import { Order } from "./page/Mui-pages/order";
import MainLayout from "./LayoutDiv";
import { Css } from "./page/test-pages/css";
// import { Hellow } from "./page/test-pages/hellow";
// import CardSkeleton from "./page/test-pages/skeleton";
import { AppThemeProvider } from "./features/dark-mode/dark";

// import Car_css from "./page/test-pages/car_css";
import { Show_Plas } from "./page/Mui-pages/show_plas";

import CartItem from "./features/cart/screen/CartItem";
import Home from "./features/home/screen/home";

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
            <Route path="/rent" element={<Css />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/useraddress" element={<UserAddress />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sing" element={<Sing />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/Show" element={<Show_Plas />} />
            {/*mirgin تاخد <MainLayout />الصفحات التي بداخل ال*/}
            <Route path="/" element={<MainLayout />}>
              <Route path="Home" element={<MuiHome />} />
              <Route path="Addexpenses" element={<Add_expenses />} />
              <Route path="Order" element={<Order />} />
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
