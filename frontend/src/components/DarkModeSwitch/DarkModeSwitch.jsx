import React, { useState } from "react";
import {
  WiMoonAltWaningCrescent6,
  WiMoonAltWaningGibbous2,
} from "react-icons/wi";

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <div className="relative w-7 h-7">
      <label className="absolute w-full h-full bg-black rounded-full cursor-pointer border-2 border-gray-800 transition-colors duration-300">
        <input
          type="checkbox"
          className="hidden"
          checked={isDarkMode}
          onChange={handleToggle}
        />
        {/* Add Icons */}
        <WiMoonAltWaningCrescent6
          className={`absolute size-6 p-0.5 text-white transition-transform duration-300 ${
            isDarkMode ? "opacity-0 transform" : "opacity-100 transform"
          }`}
        />
        <WiMoonAltWaningGibbous2
          className={`absolute size-6 p-0.5 text-white transition-transform duration-300 ${
            isDarkMode ? "opacity-100 transform" : "opacity-0 transform"
          }`}
        />
      </label>
    </div>
  );
};

export default DarkModeSwitch;
