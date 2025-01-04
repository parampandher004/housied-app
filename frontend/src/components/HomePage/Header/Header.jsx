import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Logo from "../../../assets/logo/new-logo.svg";
import { useGlobalState } from "../../../hooks/useGlobalState";
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

  const { state } = useGlobalState();
  const { logo } = state;
  const { userType } = state.auth;

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log("User Type:", userType);
    console.log(
      "Base-200 value:",
      getComputedStyle(document.documentElement).getPropertyValue("--base-200")
    );
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
    <nav className="bg-white-background dark:bg-black-background fixed w-full z-50 top-0 start-0 border-b border-white-border dark:border-black-border">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 ">
          <img src={logo.src} className="h-8" alt={logo.alt} />
          <span className="font-delius text-2xl text-black-foreground dark:text-white-foreground font-bold">
            HOUSIED
          </span>
        </Link>

        <div className="flex lg:order-2 space-x-3 items-center">
          <DarkModeSwitch />

          {/* GitHub Repository Button */}
          <button
            onClick={() =>
              window.open(
                "https://github.com/parampandher004/housied-app",
                "_blank"
              )
            }
            className="hidden lg:flex items-center space-x-2 text-black-foreground bg-transparent hover:text-base-400 font-medium rounded-lg text-sm px-2 py-2 dark:text-white-foreground dark:hover:text-base-100"
          >
            <FaGithub className="size-7" />
          </button>

          {/* Avatar Button */}
          <AvatarButton />

          {/* Hamburger Icon */}
          <div className="inline-flex items-center p-2 w-9 h-9 z-50 justify-center text-sm text-black-foreground rounded-lg lg:hidden  dark:text-white-foreground">
            <AnimatedHamburgerButton active={isOpen} toggle={toggleSidebar} />
          </div>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 right-0 z-10 w-40 h-screen transition-transform bg-white-background dark:bg-black-background ${
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
                        ? "text-base-200 font-bold"
                        : "text-black-foreground hover:text-base-200  dark:hover:text-base-200 dark:text-white-foreground"
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
                  className="flex md:hidden items-center space-x-2 text-black-foreground bg-transparent dark:hover:text-base-200 hover:text-base-200 font-medium rounded-lg text-sm px-4 py-2 dark:text-white-foreground"
                >
                  <FaGithub className="size-7" />
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Navbar Links for Desktop */}
        <div
          className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-row space-x-8 font-medium">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`block py-2 px-4 rounded ${
                    activeLink === id
                      ? "text-base-200 font-bold"
                      : "text-black-foreground dark:text-white-foreground hover:text-base-200  dark:hover:text-base-200"
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
