"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { menuVariants, menuItemVariants, staggerContainer } from "@/lib/animations";
import RansomNote from "./RansomNote";

const navItems = [
    { label: "Games", href: "/" },
    { label: "GDDs", href: "/gdd" },
    { label: "Analysis", href: "/breakdowns" },
    { label: "About", href: "/about" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [glitching, setGlitching] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const btnControls = useAnimationControls();

    const activeLabel = navItems.find((item) => item.href === pathname)?.label || "About";

    const isGameDetail = pathname.startsWith("/games/") && pathname !== "/games";
    const isGddDetail = pathname.startsWith("/gdd/") && pathname !== "/gdd";
    const showBackButton = isGameDetail || isGddDetail;

    // Random idle glitch on the hamburger
    useEffect(() => {
        const scheduleGlitch = () => {
            const t = setTimeout(() => {
                setGlitching(true);
                setTimeout(() => setGlitching(false), 120 + Math.random() * 80);
                scheduleGlitch();
            }, 3500 + Math.random() * 5000);
            return t;
        };
        const t = scheduleGlitch();
        return () => clearTimeout(t);
    }, []);

    const handleMainButtonClick = () => {
        btnControls.start({
            x: [0, -4, 3, -2, 0],
            skewX: [0, -8, 4, 0],
            transition: { duration: 0.22, ease: "easeOut" },
        });
        if (showBackButton) {
            if (isGameDetail) router.push("/");
            else if (isGddDetail) router.push("/gdd");
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <>
            {/* ── Hamburger / Back Button ── */}
            <motion.button
                onClick={handleMainButtonClick}
                animate={btnControls}
                className={`
                    fixed top-6 left-6 z-50
                    w-14 h-14
                    flex items-center justify-center
                    bg-crimson border-4 border-ink
                    nav-btn-glitch
                    ${glitching ? "nav-btn-flicker" : ""}
                `}
                style={{ transform: "skewX(-6deg)", transformOrigin: "center" }}
                whileHover={{ x: -3, y: -3 }}
                whileTap={{ x: 2, y: 2, scale: 0.96 }}
                aria-label={showBackButton ? "Go Back" : "Toggle menu"}
            >
                <span className="nav-btn-corner nav-btn-corner--tl" />
                <span className="nav-btn-corner nav-btn-corner--br" />

                <div className="flex flex-col items-center justify-center gap-1.5" style={{ transform: "skewX(6deg)" }}>
                    <motion.span
                        className="h-0.5 bg-cream block origin-center"
                        animate={
                            showBackButton
                                ? { rotate: -45, y: 5, width: "12px", x: -5 }
                                : isOpen
                                    ? { rotate: 45, y: 8, width: "24px" }
                                    : { rotate: 0, y: 0, width: "24px", x: 0 }
                        }
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <motion.span
                        className="h-0.5 bg-cream block"
                        animate={
                            showBackButton
                                ? { opacity: 1, rotate: 0, width: "24px" }
                                : isOpen
                                    ? { opacity: 0, width: "24px" }
                                    : { opacity: 1, rotate: 0, width: "24px" }
                        }
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="h-0.5 bg-cream block origin-center"
                        animate={
                            showBackButton
                                ? { rotate: 45, y: -5, width: "12px", x: -5 }
                                : isOpen
                                    ? { rotate: -45, y: -8, width: "24px" }
                                    : { rotate: 0, y: 0, width: "24px", x: 0 }
                        }
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>

                {glitching && (
                    <div
                        className="absolute inset-0 bg-crimson/40 mix-blend-screen pointer-events-none"
                        style={{ transform: "translate(3px, -2px) skewX(4deg)" }}
                    />
                )}
            </motion.button>

            {/* ── Overlay ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-ink/85 z-40 backdrop-blur-[2px]"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* ── Navigation Menu Panel ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="nav-panel fixed left-0 top-0 h-full z-40 flex flex-col justify-center px-8"
                        style={{ width: "min(85vw, 420px)" }}
                    >
                        {/* Top slash bar */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-1.5 bg-crimson"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        />
                        {/* Bottom slash bar */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1.5 bg-crimson"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                        />
                        {/* Right edge */}
                        <motion.div
                            className="absolute top-0 right-0 bottom-0 w-1.5 bg-crimson"
                            initial={{ scaleY: 0, originY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.35, delay: 0.12 }}
                        />


                        {/* Active page label — beside hamburger button on the same row */}
                        <motion.div
                            className="absolute top-6 right-6 flex items-center overflow-hidden"
                            style={{ height: "56px", left: "96px" }}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            <div style={{ fontSize: "clamp(1.2rem, 4vw, 1.85rem)" }}>
                                <RansomNote text={activeLabel} animate={false} size="sm" />
                            </div>
                        </motion.div>



                        {/* ── Nav Items ── */}
                        <motion.ul
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="space-y-1 mt-8"
                        >
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <motion.li
                                        key={item.href}
                                        variants={menuItemVariants}
                                        custom={index}
                                        className="relative"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="nav-link-p5 group flex items-center gap-3 py-3 px-4 relative overflow-hidden"
                                        >
                                            {/* Crimson underline that slides in on hover */}
                                            <motion.span
                                                className="nav-hover-line absolute bottom-0 left-4 right-4 h-0.5 bg-crimson origin-left"
                                                initial={{ scaleX: 0 }}
                                                whileHover={{ scaleX: 1 }}
                                                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                            />

                                            {/* Label — active is larger + glitch-shadow, inactive is normal */}
                                            <motion.span
                                                className={`
                                                    relative z-10
                                                    font-display uppercase tracking-wide leading-none
                                                    transition-colors duration-150
                                                    ${isActive
                                                        ? "nav-item-active text-crimson"
                                                        : "text-5xl text-cream group-hover:text-crimson"
                                                    }
                                                `}
                                                animate={isActive
                                                    ? { skewX: -4 }
                                                    : { skewX: 0 }
                                                }
                                                transition={{ duration: 0.15 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </motion.ul>

                        {/* ── CTA Button ── */}
                        <motion.div
                            className="absolute bottom-8 left-8 right-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.35 }}
                        >
                            {/* Glitch signal divider above CTA */}
                            <div className="nav-glitch-divider mb-5" aria-hidden="true">
                                <span className="nav-glitch-divider__main" />
                                <span className="nav-glitch-divider__ghost1" />
                                <span className="nav-glitch-divider__ghost2" />
                            </div>

                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    if (pathname === "/about") {
                                        window.dispatchEvent(new CustomEvent("cube:navigate", { detail: { index: 3 } }));
                                    } else {
                                        router.push("/about?section=3");
                                    }
                                }}
                                className="btn-persona w-full text-center block px-6 py-3 text-lg"
                            >
                                <span className="btn-persona-text">Get in Touch</span>
                            </button>
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
