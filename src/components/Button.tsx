"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    onClick?: () => void;
    className?: string;
    download?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
    className = "",
    download = false,
}: ButtonProps) {
    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base",
        md: "px-5 py-3 text-base sm:px-8 sm:py-4 sm:text-xl",
        lg: "px-8 py-4 text-lg sm:px-12 sm:py-5 sm:text-2xl",
    };

    const variantStyles = {
        primary: "bg-crimson text-cream border-ink shadow-brutal hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_#0D0D0D]",
        outline: "bg-transparent text-cream border-cream hover:bg-cream hover:text-ink",
        ghost: "bg-transparent text-cream border-transparent hover:border-crimson hover:text-crimson",
    };

    const baseStyles = `
    relative inline-block font-display uppercase tracking-wider
    border-4 transition-all duration-200 cursor-pointer
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `;

    const content = (
        <motion.span
            className={baseStyles}
            initial={{ skewX: -6 }}
            whileHover={{
                skewX: 0,
                x: -4,
                y: -4,
                boxShadow: "8px 8px 0px #E73A3A"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        >
            <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
                {children}
            </span>
        </motion.span>
    );

    if (href) {
        return (
            <a href={href} download={download} className="inline-block">
                {content}
            </a>
        );
    }

    return (
        <button onClick={onClick} className="inline-block">
            {content}
        </button>
    );
}

// Icon Button variant
interface IconButtonProps {
    icon: ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
}

export function IconButton({ icon, label, href, onClick }: IconButtonProps) {
    const content = (
        <motion.div
            className="w-12 h-12 flex items-center justify-center bg-ink-light border-2 border-cream/30 text-cream hover:border-crimson hover:text-crimson transition-colors duration-200"
            style={{ transform: "skewX(-6deg)" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={label}
        >
            <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
                {icon}
            </span>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return <button onClick={onClick}>{content}</button>;
}
