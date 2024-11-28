import React from "react";

import { FaTwitter, FaFacebook, FaLinkedin, FaVimeo } from "react-icons/fa";

import footerLogo from "../assets/images/img-logo.png";

const Footer = () => {
  return (
    <div className="bg-[#0F0E0E] relative -mt-20">
      <div className="max-w-screen-2xl mx-auto pt-20 px-5">
        <footer className="text-white py-10">
          <div className="flex flex-col lg:flex-row gap-10 flex-wrap justify-between lg:gap-20">
            {/* Brand Section */}
            <div className="flex-1 sm:w-full">
              <h3 className="text-xl font-bold flex items-center mb-4 gap-2">
                <span>
                  <img src={footerLogo} alt="logo" className="w-8 h-8" />
                </span>
                Housied
              </h3>

              <p className="text-sm mb-4 text-justify ">
                We are your personal real estate navigator, guiding you to your
                dream property with expert advice.
              </p>
              <form className="flex items-center    overflow-hidden">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-black text-white px-4 py-2 border border-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className=" text-white border border-[#FF5B28]   ml-2 px-4 py-2  transition"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Links Section */}
            <div className="flex-1 sm:w-full">
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="/" className="hover:text-[#FF5B28]">
                    About us
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FF5B28]">
                    Properties
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FF5B28]">
                    Property Details
                  </a>
                </li>
              </ul>
            </div>

            {/* Information Section */}
            <div className="flex-1 sm:w-full">
              <h4 className="text-lg font-semibold mb-4">Information</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="/" className="hover:text-white">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    404
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="flex-1 sm:w-full">
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm mb-4">+012 345-67890</p>
              <p className="text-gray-400 text-sm mb-4">hello@housied.co</p>
              <div className="flex space-x-2">
                <a
                  href="/"
                  className="text-2xl text-gray-400 hover:text-white hover:bg-[#FF5B28] p-2 rounded transition-colors duration-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="/"
                  className="text-2xl text-gray-400 hover:text-white hover:bg-[#FF5B28] p-2 rounded transition-colors duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="/"
                  className="text-2xl text-gray-400 hover:text-white hover:bg-[#FF5B28] p-2 rounded transition-colors duration-300"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="/"
                  className="text-2xl text-gray-400 hover:text-white hover:bg-[#FF5B28] p-2 rounded transition-colors duration-300"
                >
                  <FaVimeo />
                </a>
              </div>
            </div>
          </div>

          {/* Subscribe Section */}

          <p className="text-sm text-center mt-16 ">
            2024 &copy; Housied. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
