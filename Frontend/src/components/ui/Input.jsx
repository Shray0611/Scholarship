import React from "react";

const Input = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className = "",
  labelClassName = "",
  inputClassName = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
          dark:bg-gray-700 dark:text-white
          ${error ? "border-red-500 dark:border-red-400" : ""} 
          ${inputClassName}`}
      />
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input;
