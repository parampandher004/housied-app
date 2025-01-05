import React from "react";

const CustomButton = ({ text, onClick, additionalClasses = "" }) => {
  return (
    <button
      className={`text-2xl text-white-foreground dark:text-black-foreground uppercase border-white-border dark:border-black-border shadow-[3px_3px_#333] dark:shadow-[3px_3px_#fafafa] cursor-pointer mx-0 my-[35px] px-5 py-2.5 rounded-[10px] border-2 border-solid active:shadow-none active:translate-x-[3px] active:translate-y-[3px] bg-base-400 dark:bg-base-100 hover:bg-base-300 dark:hover:bg-base-100 ${additionalClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
