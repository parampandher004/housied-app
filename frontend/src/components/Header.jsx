import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import Logo from "../assets/images/svg-housied.svg";
import { FaGithub } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

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
      ? "text-[#FF5B28] font-bold"
      : "text-[#0F0E0E] font-semibold";

  return (
    <div className="bg-white sticky top-0 left-0 right-0 z-[999999]">
      <div className="max-w-screen-2xl mx-auto py-4 px-5 flex justify-between items-center">
        {/* Logo */}
        <a href="/">
          <img src={Logo} alt="Logo" className="w-40" />
        </a>

        {/* Navigation Menu for Large Devices */}
        <div className="hidden lg:block">
          <nav>
            <ul className="flex items-center gap-8">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#properties", label: "Properties" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={linkClasses(link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center  justify-between space-x-6">
          {/* GitHub Icon */}
          <a
            href="https://github.com/parampandher004/housied-app.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 text-2xl"
            aria-label="GitHub Repository"
          >
            <FaGithub />
          </a>
          {/* Sign In/Sign Up */}
          <a
            href="/signin"
            className="text-gray-600 hover:text-gray-900 text-2xl"
            aria-label="Sign In/Sign Up"
          >
            <FiUser />
          </a>
          {/* Hamburger Menu for Small Devices */}
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <MdClose className="text-2xl text-[#FF5B28]" />
              ) : (
                <MdMenu className="text-2xl text-[#FF5B28]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white shadow-md z-50 lg:hidden">
          <div className="flex justify-between items-center p-4 border-b">
            {/* Logo */}
            <div>
              <img src={Logo} alt="Logo" className="w-20" />
            </div>

            {/* Close Button */}
            <button onClick={toggleMenu}>
              <MdClose className="text-2xl text-[#FF5B28]" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4">
            <ul className="flex flex-col gap-6 text-center">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#properties", label: "Properties" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={linkClasses(link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
