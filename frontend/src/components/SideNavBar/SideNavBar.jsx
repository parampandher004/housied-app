import React, { useState } from "react";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiList,
  FiBookOpen,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useGlobalState } from "../../hooks/useGlobalState";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const { state } = useGlobalState();
  const { auth } = state;
  const { userType = "tenant" } = auth;

  const options = {
    admin: [
      { Icon: FiHome, title: "Profile", path: "/layout/profile" },
      {
        Icon: FiDollarSign,
        title: "Dashboard",
        path: "/layout/dashboard",
        notifs: 3,
      },
      { Icon: FiMonitor, title: "Property Listing", path: "/layout/listing" },
      {
        Icon: FiList,
        title: "Admin Property Listing",
        path: "/layout/admin-listing",
      },
      {
        Icon: FiList,
        title: "Owner Property Listing",
        path: "/layout/owner-listing",
      }, // Add this line
      { Icon: FiUsers, title: "Users Listing", path: "/layout/users" },
      { Icon: FiTag, title: "Payment Record", path: "/payment-record" },
      {
        Icon: FiBookOpen,
        title: "Booking Record",
        path: "/layout/admin-booking",
      },
      { Icon: FiBarChart, title: "Reports", path: "/reports" },
    ],
    house_owner: [
      { Icon: FiHome, title: "Profile", path: "/profile" },
      { Icon: FiDollarSign, title: "Dashboard", path: "/dashboard" },
      { Icon: FiMonitor, title: "Property Listing", path: "/property-listing" },
      {
        Icon: FiList,
        title: "Owner Property Listing",
        path: "/layout/owner-listing",
      }, // Add this line
      { Icon: FiTag, title: "Payment Record", path: "/payment-record" },
      { Icon: FiBookOpen, title: "Booking Record", path: "/booking-record" },
    ],
    tenant: [
      { Icon: FiHome, title: "Profile", path: "/profile" },
      { Icon: FiDollarSign, title: "Dashboard", path: "/dashboard" },
      { Icon: FiMonitor, title: "Property Listing", path: "/property-listing" },
      { Icon: FiTag, title: "Payment Record", path: "/payment-record" },
    ],
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen z-10 shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        {options[userType].map((option, index) => (
          <Option
            key={index}
            Icon={option.Icon}
            title={option.title}
            path={option.path}
            selected={selected}
            setSelected={setSelected}
            open={open}
            notifs={option.notifs}
          />
        ))}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, path, selected, setSelected, open, notifs }) => {
  return (
    <Link to={path}>
      <motion.button
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          selected === title
            ? "bg-indigo-100 text-indigo-800"
            : "text-slate-500 hover:bg-slate-100"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}

        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const TitleSection = ({ open }) => {
  const { state } = useGlobalState();

  const { auth, logo, user } = state;
  const { userType } = auth;
  let fullName = "";
  if (user.middleName !== null) {
    fullName = `${user.firstName} ${user.middleName} ${user.lastName}`;
  } else {
    fullName = `${user.firstName} ${user.lastName}`;
  }
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <Link to="/layout/profile" className="flex items-center gap-2">
          <Logo />
          {open && user && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs text-black font-semibold">
                {fullName}
              </span>
              <span className="block text-xs text-slate-500">{userType}</span>
            </motion.div>
          )}
        </Link>
      </div>
    </div>
  );
};

const Logo = () => {
  const { state } = useGlobalState();

  const { logo } = state;
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-transparent"
    >
      <img src={logo.src} alt={logo.alt} />
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default SideNavBar;
