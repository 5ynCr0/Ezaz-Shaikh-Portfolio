"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    const activeLabel = navItems.find(item => item.href === pathname)?.label || "About";

    return (
        <>
            {/* Menu Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-6 left-6 z-50 w-14 h-14 flex flex-col items-center justify-center gap-1.5 bg-crimson border-4 border-ink shadow-brutal-sm transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal"
                style={{ transform: "skewX(-6deg)" }}
                aria-label="Toggle menu"
            >
                <motion.span
                    className="w-6 h-0.5 bg-cream block"
                    style={{ transform: "skewX(6deg)" }}
                    animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-cream block"
                    style={{ transform: "skewX(6deg)" }}
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-cream block"
                    style={{ transform: "skewX(6deg)" }}
                    animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
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
                                            <span className={`text-crimson font-display text-xl transition-all duration-200 ${isActive
                                                ? "opacity-100 translate-x-0"
                                                : "opacity-0 -translate-x-4"
                                                }`}>
                                                ▶
                                            </span>
                                            <span className={`font-display text-5xl transition-colors duration-200 relative ${isActive
                                                ? "text-crimson"
                                                : "text-cream group-hover:text-crimson"
                                                }`}>
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
