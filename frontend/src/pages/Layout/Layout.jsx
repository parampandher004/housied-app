import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar/SideNavBar";

const Layout = () => {
  return (
    <div className="top-0 left-0 right-0 relative flex">
      <SideNavBar />
      <div className="ml-16 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
