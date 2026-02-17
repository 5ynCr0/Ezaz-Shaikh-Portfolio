"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SlantedPanelProps {
    children: ReactNode;
    variant?: "default" | "red" | "outline";
    className?: string;
    skewAngle?: number;
}

export default function SlantedPanel({
    children,
    variant = "default",
    className = "",
    skewAngle = -6,
}: SlantedPanelProps) {
    const baseStyles = "relative p-6 border-4";

    const variantStyles = {
        default: "bg-cream text-ink border-ink",
        red: "bg-crimson text-cream border-cream",
        outline: "bg-transparent text-cream border-cream",
    };

    return (
        <motion.div
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            // Move skew to motion props to ensure it persists during animation
            initial={{ opacity: 0, x: 100, skewX: skewAngle }}
            whileInView={{ opacity: 1, x: 0, skewX: skewAngle }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "subpixel-antialiased",
                transformStyle: "preserve-3d" // Help nested transforms
            }}
        >
            <div
                style={{
                    transform: `skewX(${-skewAngle}deg) translateZ(0)`, // Force GPU layer for text
                    backfaceVisibility: "hidden"
                }}
            >
                {children}
            </div>
        </motion.div>
    );
}

// Aggressive Panel - Sharp diagonal cuts
interface AggressivePanelProps {
    children: ReactNode;
    className?: string;
}

export function AggressivePanel({ children, className = "" }: AggressivePanelProps) {
    return (
        <motion.div
            className={`relative bg-crimson text-cream p-8 ${className}`}
            style={{
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

// Torn Edge Panel
export function TornEdgePanel({ children, className = "" }: AggressivePanelProps) {
    return (
        <div className={`relative bg-cream text-ink ${className}`}>
            <div className="p-8">{children}</div>
            <div
                className="absolute bottom-0 left-0 right-0 h-4 bg-cream"
                style={{
                    clipPath: `polygon(
            0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%,
            25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%,
            50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%,
            75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%,
            100% 100%, 0% 100%
          )`,
                    transform: "translateY(100%)",
                }}
            />
        </div>
    );
}
