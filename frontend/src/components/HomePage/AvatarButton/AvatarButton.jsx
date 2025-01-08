import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../hooks/useGlobalState";
import { ACTION_TYPES } from "../../../context/ActionTypes";
import { FaUserCircle } from "react-icons/fa";

export default function AvatarButton() {
  const { state, dispatch } = useGlobalState();
  const { auth, user } = state;
  const { isAuthenticated } = auth;
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch({ type: ACTION_TYPES.LOGOUT });
    navigate("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {isAuthenticated ? (
        <button
          id="avatarButton"
          type="button"
          className="w-7 h-7 rounded-full bg-white-background dark:bg-black-background flex items-center justify-center text-black-foreground dark:text-white-foreground cursor-pointer"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <FaUserCircle size={28} />
        </button>
      ) : (
        <Link to="/signin">
          <button className="w-7 h-7 rounded-full bg-white-background dark:bg-black-background flex items-center justify-center text-black-foreground dark:text-white-foreground ">
            <FaUserCircle size={28} />
          </button>
        </Link>
      )}

      {dropdownOpen && isAuthenticated && (
        <div
          id="userDropdown"
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-44 bg-white-background rounded-lg shadow-lg z-50 dark:bg-black-background divide-y divide-gray-100 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-black-foreground dark:text-white-foreground">
            <div>{user.firstName || "User"}</div>
            <div className="font-medium truncate">
              {auth.email || "email@example.com"}
            </div>
          </div>
          <ul className="py-2 text-sm text-black-foreground dark:text-white-foreground">
            <li>
              <Link
                to="/layout/profile"
                className="block px-4 py-2 hover:bg-base-100 dark:hover:bg-base-400"
              >
                Profile
              </Link>
            </li>
    
            <li>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 hover:bg-base-100 dark:hover:bg-base-400 "
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
