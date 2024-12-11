import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo/new-logo.svg";
import { FiLogIn } from "react-icons/fi";
import DarkModeSwitch from "../../DarkModeSwitch/DarkModeSwitch";
import AvatarButton from "../AvatarButton/AvatarButton";
import AnimatedHamburgerButton from "../../AnimatedHamburgerMenu/AnimatedHamburgerMenu";

const Header = ({ scrollToSection }) => {
  const NAV_ITEMS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "offers", label: "Offers" },
    { id: "team", label: "Team" },
    { id: "faq", label: "FAQ" },
  ];
  const [activeLink, setActiveLink] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = "";
      NAV_ITEMS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - 110;
          const sectionBottom = sectionTop + section.offsetHeight;
          const scrollPosition = window.scrollY + window.innerHeight / 10;
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            currentActive = id;
          }
        }
      });
      setActiveLink(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-black fixed w-full z-50 top-0 start-0 border-b border-primary-100 dark:border-primary-400">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 ">
          <img src={Logo} className="h-12" alt="Housied Logo" />
          <span className="font-delius text-2xl text-black dark:text-white font-bold">
            HOUSIED
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 items-center">
          <DarkModeSwitch />

          {/* GitHub Repository Button */}
          <button
            onClick={() =>
              window.open(
                "https://github.com/parampandher004/housied-app",
                "_blank"
              )
            }
            className="hidden md:flex items-center space-x-2 text-black bg-transparent hover:shadow-sm shadow-black dark:shadow-white font-medium rounded-lg text-sm px-2 py-2 dark:text-white "
          >
            <FaGithub className="size-7" />
          </button>

          {/* Avatar Button */}
          <AvatarButton name="PARAM" />

          {/* Hamburger Icon */}
          <div className="inline-flex items-center p-2 w-9 h-9 z-50 justify-center text-sm text-black rounded-lg md:hidden hover:shadow-xl dark:text-gray-400 dark:hover:bg-gray-700">
            {" "}
            <AnimatedHamburgerButton active={isOpen} toggle={toggleSidebar} />
          </div>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 right-0 z-10 w-40 h-screen transition-transform bg-white dark:bg-black ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-4 mt-8 font-medium">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`block py-2 px-4 rounded ${
                      activeLink === id
                        ? "text-primary-200 font-bold"
                        : "text-black hover:text-primary-200  dark:hover:text-primary-200 dark:text-white"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
              {/* GitHub Icon*/}
              <li>
                <button
                  onClick={() =>
                    window.open(
                      "https://github.com/parampandher004/housied-app",
                      "_blank"
                    )
                  }
                  className="flex md:hidden items-center space-x-2 text-black bg-transparent dark:hover:text-primary-200 hover:text-primary-200 shadow-black dark:shadow-white font-medium rounded-lg text-sm px-4 py-2 dark:text-white "
                >
                  <FaGithub className="size-7" />
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Navbar Links for Desktop */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-row space-x-8 font-medium">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`block py-2 px-4 rounded ${
                    activeLink === id
                      ? "text-primary-200 font-bold"
                      : "text-black dark:text-white hover:text-blue-600  dark:hover:text-primary-200"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
