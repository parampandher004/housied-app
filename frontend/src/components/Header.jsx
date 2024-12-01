import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link for React Router
import Logo from "../assets/images/svg-housied.svg";
import { FaGithub } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home"); // Default active link

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the menu on mobile after clicking
  };

  const linkClasses = (link) =>
    link === activeLink
      ? "text-buttonColor font-bold"
      : "text-whiteVariant font-semibold hover:text-buttonColor";

  return (
    <>
      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black z-0"></div>
      <div className="bg-blackVariant font-parkinsans sticky top-0 left-0 right-0 z-[999999] bg-opacity-50 p-4 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto py-4 px-5 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.1 }}>
            {/* Logo */}
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="w-32 grayscale hover:grayscale-0 z-10 lg:w-40"
              />
            </Link>
          </motion.div>

          {/* Navigation Menu for Large Devices */}
          <div className="hidden lg:block z-10">
            <nav>
              <ul className="flex items-center gap-8">
                {[
                  { to: "/", label: "Home" },
                  { to: "#about", label: "About" },
                  { to: "#properties", label: "Properties" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => handleLinkClick(link.to)}
                      className={linkClasses(link.to)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center justify-between space-x-4 z-10">
            {/* GitHub Icon */}
            <a
              href="https://github.com/parampandher004/housied-app.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-whiteVariant hover:text-buttonColor text-2xl hidden lg:block"
              aria-label="GitHub Repository"
            >
              <FaGithub />
            </a>
            {/* Sign In/Sign Up */}
            <Link
              to="/signin"
              className="text-whiteVariant hover:text-buttonColor text-2xl hidden lg:block"
              aria-label="Sign In/Sign Up"
            >
              <FiUser />
            </Link>
          </div>
          {/* Hamburger Menu for Small Devices */}
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              <HamburgerMenu isOpen={isMenuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden relative z-50">
            {/* Navigation Links for Mobile */}
            <nav className="mt-6 bg-blackVariant opacity-30 backdrop:blur-0 shadow-md">
              <ul className="flex flex-col gap-6 text-center justify-center p-4 text-whiteVariant">
                {[
                  { to: "/", label: "Home" },
                  { to: "#about", label: "About" },
                  { to: "#properties", label: "Properties" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => handleLinkClick(link.to)}
                      className={linkClasses(link.to)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  {/* GitHub Icon */}
                  <a
                    href="https://github.com/parampandher004/housied-app.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-whiteVariant hover:text-buttonColor text-2xl"
                    aria-label="GitHub Repository"
                  >
                    <FaGithub />
                  </a>
                </li>
                <li>
                  {/* Sign In/Sign Up */}
                  <Link
                    to="/signin"
                    className="text-whiteVariant hover:text-buttonColor text-2xl"
                    aria-label="Sign In/Sign Up"
                  >
                    <FiUser />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
