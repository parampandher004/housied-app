import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchButton = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/layout?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <div className="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-5 h-5 top-2.5 left-2.5 text-white-foreground"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="w-full text-sm bg-transparent placeholder:text-white-foreground text-white-foreground border border-white-border rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Search place..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-base-400 dark:bg-base-100 dark:text-black-foreground text-white-foreground rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchButton;
