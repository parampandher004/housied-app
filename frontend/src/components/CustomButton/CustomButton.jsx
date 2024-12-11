import React from "react";

const CustomButton = ({ text, onClick, additionalClasses = "" }) => {
  return (
    <button
      className={`text-2xl text-neutral-50 uppercase border-neutral-50 shadow-[3px_3px_#fafafa] cursor-pointer mx-0 my-[35px] px-5 py-2.5 rounded-[10px] border-2 border-solid active:shadow-none active:translate-x-[3px] active:translate-y-[3px] bg-[#252525] ${additionalClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
