import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div>
    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${
        error ? "border-red-500" : "border-gray-200 dark:border-gray-700"
      } rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
    />
    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
  </div>
);

export default InputField;
