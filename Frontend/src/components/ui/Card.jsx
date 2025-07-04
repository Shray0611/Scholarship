import React from "react";

const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = "",
  shadow = "md",
  padding = "normal",
  rounded = "md",
}) => {
  // Shadow variants
  const shadowVariants = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  // Padding variants
  const paddingVariants = {
    none: "p-0",
    small: "p-3",
    normal: "p-5",
    large: "p-8",
  };

  // Rounded variants
  const roundedVariants = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 ${shadowVariants[shadow]} ${paddingVariants[padding]} ${roundedVariants[rounded]} ${className}`}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>
          )}
        </div>
      )}

      <div className="mb-4">{children}</div>

      {footer && (
        <div className="border-t dark:border-gray-700 pt-4 mt-4">{footer}</div>
      )}
    </div>
  );
};

export default Card;
