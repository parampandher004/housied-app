import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar/SideNavBar";

const Layout = () => {
  return (
    <div className="top-0 left-0 right-0 relative flex bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground">
      <SideNavBar />
      <div className="p-4 w-full h-full bg-white-background dark:bg-black-background border border-white-border dark:border-black-border">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
