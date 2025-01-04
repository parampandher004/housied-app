import React, { useState, useEffect } from "react";
import {
  WiMoonAltWaningCrescent6,
  WiMoonAltWaningGibbous2,
} from "react-icons/wi";

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for theme preference or use system default
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const handleToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);

    // Save preference to localStorage
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    // Set the initial theme based on state
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="relative w-7 h-7">
      <label className="absolute w-full h-full bg-black-background dark:bg-white-background rounded-full cursor-pointer border-2 border-black-border dark:border-white-border transition-colors duration-300">
        <input
          type="checkbox"
          className="hidden"
          checked={isDarkMode}
          onChange={handleToggle}
        />
        {/* Add Icons */}
        <WiMoonAltWaningCrescent6
          className={`absolute size-6 p-0.5 text-white-foreground transition-transform duration-300 ${
            isDarkMode ? "opacity-0 transform" : "opacity-100 transform"
          }`}
        />
        <WiMoonAltWaningGibbous2
          className={`absolute size-6 p-0.5 text-black-foreground transition-transform duration-300 ${
            isDarkMode ? "opacity-100 transform" : "opacity-0 transform"
          }`}
        />
      </label>
    </div>
  );
};

export default DarkModeSwitch;
