"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { menuVariants, menuItemVariants, staggerContainer } from "@/lib/animations";
import RansomNote from "./RansomNote";

const navItems = [
    { label: "About", href: "/" },
    { label: "Games", href: "/games" },
    { label: "GDDs", href: "/gdd" },
    { label: "Analysis", href: "/breakdowns" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const activeLabel = navItems.find((item) => item.href === pathname)?.label || "About";

    // Check if we are on a detail page (e.g., /games/slug or /gdd/slug)
    // We exclude the main listing pages themselves
    const isGameDetail = pathname.startsWith("/games/") && pathname !== "/games";
    const isGddDetail = pathname.startsWith("/gdd/") && pathname !== "/gdd";
    const showBackButton = isGameDetail || isGddDetail;

    const handleMainButtonClick = () => {
        if (showBackButton) {
            // Navigate back to the respective list
            if (isGameDetail) router.push("/games");
            else if (isGddDetail) router.push("/gdd");
        } else {
            // Toggle menu
            setIsOpen(!isOpen);
        }
    };

    return (
        <>
            {/* Menu Toggle / Back Button */}
            <button
                onClick={handleMainButtonClick}
                className="fixed top-6 left-6 z-50 w-14 h-14 flex flex-col items-center justify-center gap-1.5 bg-crimson border-4 border-ink shadow-brutal-sm transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal"
                style={{ transform: "skewX(-6deg)" }}
                aria-label={showBackButton ? "Go Back" : "Toggle menu"}
            >
                {/* Top Bar */}
                <motion.span
                    className="w-6 h-0.5 bg-cream block origin-center"
                    style={{ transform: "skewX(6deg)" }}
                    animate={
                        showBackButton
                            ? { rotate: -45, y: 5, width: "12px", x: -5 } // Top part of arrow
                            : isOpen
                                ? { rotate: 45, y: 8 } // X state
                                : { rotate: 0, y: 0, width: "24px", x: 0 } // Hamburg state
                    }
                />

                {/* Middle Bar */}
                <motion.span
                    className="w-6 h-0.5 bg-cream block"
                    style={{ transform: "skewX(6deg)" }}
                    animate={
                        showBackButton
                            ? { opacity: 1, rotate: 0, width: "24px" } // Middle shaft of arrow
                            : isOpen
                                ? { opacity: 0 } // Hidden in X state
                                : { opacity: 1, rotate: 0, width: "24px" } // Hamburg state
                    }
                />

                {/* Bottom Bar */}
                <motion.span
                    className="w-6 h-0.5 bg-cream block origin-center"
                    style={{ transform: "skewX(6deg)" }}
                    animate={
                        showBackButton
                            ? { rotate: 45, y: -5, width: "12px", x: -5 } // Bottom part of arrow
                            : isOpen
                                ? { rotate: -45, y: -8 } // X state
                                : { rotate: 0, y: 0, width: "24px", x: 0 } // Hamburg state
                    }
                />
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-ink/80 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Navigation Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed left-0 top-0 h-full w-96 bg-ink border-r-4 border-crimson z-40 flex flex-col justify-center px-8"
                    >
                        {/* Decorative Lines */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-crimson" />
                        <div className="absolute bottom-0 left-0 w-full h-2 bg-crimson" />

                        {/* Logo/Name */}
                        <div className="absolute top-8 left-24">
                            <RansomNote text={activeLabel} animate={false} size="sm" />
                        </div>

                        {/* Nav Items */}
                        <motion.ul
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="space-y-6"
                        >
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <motion.li
                                        key={item.href}
                                        variants={menuItemVariants}
                                        custom={index}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="group flex items-center gap-4"
                                        >
                                            <span
                                                className={`text-crimson font-display text-xl transition-all duration-200 ${isActive
                                                        ? "opacity-100 translate-x-0"
                                                        : "opacity-0 -translate-x-4"
                                                    }`}
                                            >
                                                ▶
                                            </span>
                                            <span
                                                className={`font-display text-5xl transition-colors duration-200 relative ${isActive
                                                        ? "text-crimson"
                                                        : "text-cream group-hover:text-crimson"
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </motion.ul>

                        {/* Contact CTA */}
                        <div className="absolute bottom-8 left-8 right-8">
                            <a
                                href="mailto:ezazxshaikh@gmail.com"
                                className="btn-persona w-full text-center block"
                            >
                                <span className="btn-persona-text">Get in Touch</span>
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
