import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  onClick,
  fullWidth = false,
  disabled = false,
  className = "",
}) => {
  // Base styles
  const baseStyles =
    "font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-block text-center";

  // Variant styles
  const variantStyles = {
    primary: "bg-primary hover:bg-primary-dark text-white focus:ring-primary",
    secondary:
      "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-primary",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-blue-50 focus:ring-primary",
  };

  // Size styles
  const sizeStyles = {
    small: "py-1 px-3 text-sm",
    medium: "py-2 px-4 text-base",
    large: "py-3 px-6 text-lg",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  // Disabled styles
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
