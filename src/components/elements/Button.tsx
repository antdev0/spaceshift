import React from "react";

interface ButtonProps {
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: "primary" | "secondary" | "tertiary" | "warning" | "dark" | "danger";
    type?: "button" | "submit" | "reset";
    className?: string;
}

const variantClassMap: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700",
    secondary: "text-gray-700 bg-gray-200 hover:bg-gray-300",
    tertiary: "text-indigo-600 bg-transparent border border-indigo-600 hover:bg-indigo-50",
    warning: "text-white bg-yellow-500 hover:bg-yellow-600",
    dark: "text-white bg-gray-800 hover:bg-gray-900",
    danger: "text-white bg-red-500 hover:bg-red-600",
};

const Button = ({
    type = "button",
    disabled = false,
    children,
    onClick,
    variant = "primary",
    className = "",
}: ButtonProps) => {
    const variantClasses = variantClassMap[variant];

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all
                ${variantClasses}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;
