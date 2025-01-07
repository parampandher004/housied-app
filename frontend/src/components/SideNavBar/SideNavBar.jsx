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
  FiLogOut,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useGlobalState } from "../../hooks/useGlobalState";
import { Link, useNavigate } from "react-router-dom";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import Cookies from "js-cookie";

const SideNavBar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const { state } = useGlobalState();
  const { auth } = state;
  const { userType = "tenant" } = auth;
  const navigate = useNavigate();

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
      { Icon: FiUsers, title: "Users Listing", path: "/layout/users" },
      { Icon: FiTag, title: "Payment Record", path: "/payment-record" },
      {
        Icon: FiBookOpen,
        title: "Booking Record",
        path: "/layout/admin-booking",
      },
      { Icon: FiBarChart, title: "Reports", path: "/reports" },
      { Icon: FiBookOpen, title: "Feedback", path: "/feedback" }, // Add this line
    ],
    house_owner: [
      { Icon: FiHome, title: "Profile", path: "/profile" },
      { Icon: FiDollarSign, title: "Dashboard", path: "/dashboard" },
      { Icon: FiMonitor, title: "Property Listing", path: "/property-listing" },
      {
        Icon: FiList,
        title: "Owner Property Listing",
        path: "/layout/owner-listing",
      },
      { Icon: FiTag, title: "Payment Record", path: "/payment-record" },
      {
        Icon: FiBookOpen,
        title: "Booking Record",
        path: "/layout/owner-booking",
      },
      { Icon: FiBookOpen, title: "Feedback", path: "/feedback" }, // Add this line
    ],
    tenant: [
      { Icon: FiHome, title: "Profile", path: "/profile" },
      { Icon: FiDollarSign, title: "Dashboard", path: "/dashboard" },
      { Icon: FiMonitor, title: "Property Listing", path: "/property-listing" },
      { Icon: FiTag, title: "Payment Record", path: "/payment-record" },
      { Icon: FiBookOpen, title: "Feedback", path: "/feedback" }, // Add this line
      {
        Icon: FiBookOpen,
        title: "Booking Record",
        path: "/layout/tenant-booking",
      },
    ],
  };

  const handleLogout = () => {
    // Clear token and redirect to sign-in page
    Cookies.remove("authToken");
    navigate("/signin", { replace: true });
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen z-10 shrink-0 border-r border-gray-300 bg-white dark:bg-black p-2"
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

      {open && (
        <div className="absolute top-2 right-2">
          <DarkModeSwitch />
        </div>
      )}

      <button
        onClick={handleLogout}
        className="absolute bottom-12 left-0 right-0 border-t border-gray-300 dark:border-gray-700 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div className="flex items-center p-2">
          <motion.div
            layout
            className="grid size-10 place-content-center text-lg"
          >
            <FiLogOut />
          </motion.div>
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-xs font-medium"
            >
              Log Out
            </motion.span>
          )}
        </div>
      </button>

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
            ? "bg-base-100 dark:bg-base-300 text-gray-800 dark:text-gray-200"
            : "text-gray-500 dark:text-gray-400 hover:bg-base-200 dark:hover:bg-base-400"
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
    <div className="mb-3 border-b border-gray-300 dark:border-gray-700 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-base-200 dark:hover:bg-base-400">
        <Link to="/layout/profile" className="flex items-center gap-2">
          <Logo />
          {open && user && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs text-black dark:text-white font-semibold">
                {fullName}
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">
                {userType}
              </span>
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
      className="absolute bottom-0 left-0 right-0 border-t border-gray-300 dark:border-gray-700 transition-colors hover:bg-base-200 dark:hover:bg-base-400"
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
