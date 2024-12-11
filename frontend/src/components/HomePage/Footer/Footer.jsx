import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo/new-logo.svg";

const Footer = () => {
  const resources = [
    { name: "React Router", href: "https://reactrouter.com", type: "external" },
    {
      name: "Framer Motion",
      href: "https://www.framer.com/motion/",
      type: "external",
    },
    { name: "Uiverse", href: "https://uiverse.io", type: "external" },
    { name: "Hover.dev", href: "https://hover.dev", type: "external" },
    { name: "Flowbite", href: "https://flowbite.com/", type: "external" },
    { name: "Tailwind CSS", href: "https://tailwindcss.com", type: "external" },
    { name: "Swiper", href: "https://swiperjs.com", type: "external" },
  ];

  const navigation = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Offers", id: "offers" },
    { name: "Team", id: "team" },
    { name: "FAQ", id: "faq" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "#", type: "external" },
    { name: "Terms & Conditions", href: "#", type: "external" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 relative bottom-0">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="h-8 me-3" alt="Housied Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                HOUSIED
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {/* Resources Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-4">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.href}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigate Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Navigate
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-4">
                {navigation.map((nav, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(nav.id)}
                      className="hover:underline text-left"
                    >
                      {nav.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-4">
                {legal.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
