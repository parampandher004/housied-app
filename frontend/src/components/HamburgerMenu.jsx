import { motion } from "framer-motion";
import { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-1 cursor-pointer"
      onClick={toggleMenu}
    >
      <motion.div
        className="w-6 h-1 bg-whiteVariant"
        initial={{ rotate: 0, y: 0 }}
        animate={{
          rotate: isOpen ? 405 : 0,
          y: isOpen ? 7 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-6 h-1 bg-whiteVariant"
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-6 h-1 bg-whiteVariant"
        initial={{ rotate: 0, y: 0 }}
        animate={{
          rotate: isOpen ? -405 : 0,
          y: isOpen ? -9 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default HamburgerMenu;
