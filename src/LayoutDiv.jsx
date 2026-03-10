// layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <> 
      <div className="sm:w-[calc(100%-200px)] sm:ml-[200px]">
         <Outlet />
      </div>
    </>
  );
};

export default MainLayout;