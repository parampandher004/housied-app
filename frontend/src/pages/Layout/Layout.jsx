import React from "react";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import ListingPage from "../ListingPage/ListingPage";

const Layout = () => {
  return (
    <div className="flex">
      <SideNavBar />
      <ListingPage />
    </div>
  );
};

export default Layout;
