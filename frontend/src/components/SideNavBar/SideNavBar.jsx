import React, { useState } from "react";
import {
  FiBarChart,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
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

      { Icon: FiMonitor, title: "Property Listing", path: "/layout/listing" },
      {
        Icon: FiList,
        title: "Admin Property Listing",
        path: "/layout/admin-listing",
      },

      { Icon: FiUsers, title: "Users Listing", path: "/layout/users" },
      { Icon: FiTag, title: "Payment Record", path: "/layout/admin-payment" },
      {
        Icon: FiBookOpen,
        title: "Booking Record",
        path: "/layout/admin-booking",
      },
      { Icon: FiBarChart, title: "Reports", path: "/reports" },
      { Icon: FiBookOpen, title: "Feedback", path: "/feedback" },
    ],
    house_owner: [
      { Icon: FiHome, title: "Profile", path: "/layout/profile" },
      { Icon: FiMonitor, title: "Property Listing", path: "/layout/listing" },
      {
        Icon: FiList,
        title: "Owner Property Listing",
        path: "/layout/owner-listing",
      },
      { Icon: FiTag, title: "Payment Record", path: "/layout/owner-payment" },
      {
        Icon: FiBookOpen,
        title: "Booking Record",
        path: "/layout/owner-booking",
      },
      { Icon: FiBookOpen, title: "Feedback", path: "/feedback" },
    ],
    tenant: [
      { Icon: FiHome, title: "Profile", path: "/layout/profile" },
      { Icon: FiMonitor, title: "Property Listing", path: "/layout/listing" },
      { Icon: FiTag, title: "Payment Record", path: "/layout/tenant-payment" },
      { Icon: FiBookOpen, title: "Feedback", path: "/feedback" },
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
      className="sticky top-0 h-screen z-10 shrink-0 border-r border-black-border dark:border-white-border bg-white-background dark:bg-black-background p-2"
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

      <Link to="/">
        <button className="absolute bottom-28 left-0 right-0 border-t border-black-border dark:border-white-border transition-colors hover:bg-base-200 dark:hover:bg-base-400">
          <div className="flex items-center p-2">
            <motion.div
              layout
              className="grid size-10 place-content-center text-lg"
            >
              <FiHome />
            </motion.div>
            {open && (
              <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className="text-xs font-medium"
              >
                Home
              </motion.span>
            )}
          </div>
        </button>
      </Link>

      <button
        onClick={handleLogout}
        className="absolute bottom-14 left-0 right-0 border-t border-black-border dark:border-white-border transition-colors hover:bg-base-200 dark:hover:bg-base-400"
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
            ? "bg-base-200 dark:bg-base-400 text-black-foreground dark:text-white-foreground"
            : "text-black-foreground dark:text-white-foreground hover:bg-base-200 dark:hover:bg-base-400"
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
    <div className="mb-3 border-b border-black-border dark:border-white-border pb-3">
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
              <span className="block text-xs text-black-foreground dark:text-white-foreground font-semibold">
                {fullName}
              </span>
              <span className="block text-xs text-base-400 dark:text-base-100">
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
      className="absolute bottom-0 left-0 right-0 border-t border-black-border dark:border-white-border transition-colors hover:bg-base-200 dark:hover:bg-base-400"
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
