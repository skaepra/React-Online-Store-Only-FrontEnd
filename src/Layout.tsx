import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Newnav from "./features/home/components/navbar";

import ErrorPage from "./features/error/error";

// import { MuiHome } from "./page/Mui-pages/home";
// import { Mnav } from "./page/Mui-pages/mui_navbar";
// import { Add_expenses } from "./page/Mui-pages/add_expenses";
// import { My_expenses } from "./page/Mui-pages/my_expenses";
// import { Order } from "./page/Mui-pages/order";
import MainLayout from "./LayoutDiv";
import { Css } from "./page/test-pages/css";
import { AppThemeProvider } from "./features/dark-mode/dark";
// import { Show_Plas } from "./page/Mui-pages/show_plas";

import Home from "./features/home/screen/home";
import ShoppingCartScreen from "./features/cart/screen/ShoppingCart";
import LoginScreen from "./features/auth/Screens/Login";

import SignUpScreen from "./features/auth/Screens/SignUp";
import CheckOutScreen from "./features/checkout/CheckOut";
import Footer from "./features/home/components/Footer";
import FAQPage from "./features/customer-care/FAQ";
import ShippingInfoPage from "./features/customer-care/ShippingInfo";
import ReturnsRefundsPage from "./features/customer-care/ReturnsRefundsPage";
import ContactUsPage from "./features/customer-care/ContactUsPage";
import ShopingScreen from "./features/shop/Shoping";
import ProductDetails from "./features/products/screen/ProductDetails";


export default function Layout(): React.JSX.Element {
  const location = useLocation();

  // تحديد النوع كـ مصفوفة نصوص ثابتة للقراءة فقط لضمان الحماية والأداء
  const hideNavbarRoutes: readonly string[] = ["/login","/singUp"];
  const hideFooterRoutes: readonly string[] = ["/login","/singUp"];
  const shouldHideNavbar: boolean = hideNavbarRoutes.includes(
    location.pathname,
  );
  const shouldHideFooter: boolean = hideFooterRoutes.includes(
    location.pathname,
  );

  // const hideMnavRoutes: readonly string[] = [
  //   "/Home",
  //   "/Addexpenses",
  //   "/Myexpenses",
  //   "/Order",
  // ];
  // const shouldHideMnav: boolean = hideMnavRoutes.includes(location.pathname);

  return (
    <>
      <AppThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rent" element={<Css />} />
          <Route path="/shop" element={<ShopingScreen />} />
          <Route path="/cart" element={<ShoppingCartScreen />} />
          <Route path="/checkOut" element={<CheckOutScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/singUp" element={<SignUpScreen />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping" element={<ShippingInfoPage />} />
          <Route path="/returns" element={<ReturnsRefundsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/error" element={<ErrorPage />} />
          {/* <Route path="/Show" element={<Show_Plas />} /> */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* الصفحات التي بداخل الـ MainLayout تأخذ الـ margin المعرف داخله */}
          <Route path="/" element={<MainLayout />}>
            {/* <Route path="Home" element={<MuiHome />} />
              <Route path="Addexpenses" element={<Add_expenses />} />
              <Route path="Order" element={<Order />} />
              <Route path="Myexpenses" element={<My_expenses />} /> */}
          </Route>
        </Routes>

        {!shouldHideNavbar && <Newnav />}
        {/* {shouldHideMnav && <Mnav/>} */}
        {!shouldHideFooter&&<Footer />}
      </AppThemeProvider>
    </>
  );
}
