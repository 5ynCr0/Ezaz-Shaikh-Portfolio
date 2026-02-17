"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
    id: string;
    label: string;
}

interface SectionNavProps {
    sections: Section[];
}

// Back-out easing: fast rush → overshoot → snap back
function easeOutBack(t: number): number {
    const s = 0.7; // subtle overshoot — just a hint of snap-back
    const t1 = t - 1;
    return t1 * t1 * ((s + 1) * t1 + s) + 1;
}

export default function SectionNav({ sections }: SectionNavProps) {
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
    const [isExpanded, setIsExpanded] = useState(false);
    const [nearFooter, setNearFooter] = useState(false);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollAnimRef = useRef<number | null>(null);

    // Hide nav when footer is visible
    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => setNearFooter(entry.isIntersecting),
            { threshold: 0.1 }
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    // IntersectionObserver to track active section
    useEffect(() => {
        if (sections.length === 0) return;

        const sectionElements = sections
            .map((s) => document.getElementById(s.id))
            .filter(Boolean) as HTMLElement[];

        if (sectionElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingRef.current) return;

                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id);
                }
            },
            {
                rootMargin: "-15% 0px -50% 0px",
                threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }
        );

        sectionElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    // Custom scroll with back-out overshoot easing
    const scrollToSection = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        setActiveSection(id);
        setIsExpanded(false);

        // Cancel any in-flight scroll animation
        if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        isScrollingRef.current = true;

        // Calculate scroll target (accounts for scroll-mt-36 = 9rem = 144px)
        const scrollMargin = 144;
        const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - scrollMargin);
        const startY = window.scrollY;
        const distance = targetY - startY;

        const duration = 500;
        const startTime = performance.now();

        const animateScroll = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutBack(progress);

            window.scrollTo(0, startY + distance * easedProgress);

            if (progress < 1) {
                scrollAnimRef.current = requestAnimationFrame(animateScroll);
            } else {
                scrollAnimRef.current = null;
                scrollTimeoutRef.current = setTimeout(() => {
                    isScrollingRef.current = false;
                }, 150);
            }
        };

        scrollAnimRef.current = requestAnimationFrame(animateScroll);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
        };
    }, []);

    if (sections.length === 0) return null;

    const activeIndex = sections.findIndex((s) => s.id === activeSection);

    return (
        <>
            {/* ═══════════════════════════════════════════ */}
            {/* DESKTOP: Vertical sidebar (xl+ screens)    */}
            {/* ═══════════════════════════════════════════ */}
            <motion.nav
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-1 pr-2 transition-opacity duration-300 ${nearFooter ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                aria-label="Section navigation"
            >
                {sections.map((section, index) => {
                    const isActive = section.id === activeSection;
                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="group relative flex items-center gap-2 text-left"
                        >
                            <div
                                className={`
                                    relative px-4 py-2 border-2 transition-all duration-200 ease-out
                                    ${isActive
                                        ? "bg-crimson border-ink text-cream shadow-brutal-sm"
                                        : "bg-ink-light border-cream/20 text-cream/50 hover:border-crimson hover:text-cream"
                                    }
                                `}
                                style={{ transform: "skewX(-6deg)" }}
                            >
                                <div
                                    className="flex items-center gap-2"
                                    style={{ transform: "skewX(6deg)" }}
                                >
                                    <span
                                        className={`font-display text-xs transition-colors duration-200 ${isActive ? "text-cream/80" : "text-crimson/60"
                                            }`}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-display text-sm tracking-wider uppercase whitespace-nowrap">
                                        {section.label}
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`w-1 rounded-full transition-all duration-300 ease-out ${isActive
                                    ? "h-7 bg-crimson opacity-100"
                                    : "h-2 bg-crimson opacity-30"
                                    }`}
                            />
                        </button>
                    );
                })}
            </motion.nav>

            {/* ═══════════════════════════════════════════ */}
            {/* COMPACT: Bottom bar (below xl screens)     */}
            {/* Morphs from button → panel, no fade swap   */}
            {/* ═══════════════════════════════════════════ */}

            {/* Backdrop — only when expanded */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed inset-0 bg-ink/50 backdrop-blur-sm xl:hidden"
                        style={{ zIndex: 29 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsExpanded(false)}
                    />
                )}
            </AnimatePresence>

            <div className={`fixed bottom-0 left-0 right-0 z-30 xl:hidden transition-all duration-300 ${nearFooter ? "opacity-0 pointer-events-none translate-y-full" : "opacity-100 translate-y-0"}`}>
                <motion.div
                    className="bg-ink border-t-2 border-crimson/40 overflow-hidden"
                    initial={{ y: "100%" }}
                    animate={{
                        y: 0,
                        height: isExpanded ? "auto" : 48,
                    }}
                    transition={{
                        y: { duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                        height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    }}
                >
                    {/* Header row — always visible, acts as toggle */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-center gap-3 px-5 h-12"
                    >
                        <span className="font-display text-crimson/70 text-xs">
                            {String(activeIndex + 1).padStart(2, "0")}/{String(sections.length).padStart(2, "0")}
                        </span>
                        <span className="font-display text-cream/80 text-sm tracking-wider uppercase">
                            {sections[activeIndex]?.label || ""}
                        </span>
                        <motion.span
                            className="text-cream/40 text-xs"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            ▲
                        </motion.span>
                    </button>

                    {/* Section grid — revealed when expanded */}
                    <motion.div
                        className="px-4 pb-4"
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.15, delay: isExpanded ? 0.1 : 0 }}
                    >
                        <div className="w-full h-px bg-cream/10 mb-3" />
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {sections.map((section, index) => {
                                const isActive = section.id === activeSection;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`
                                            relative px-3 py-2 border-2 transition-all duration-150 ease-out text-left
                                            ${isActive
                                                ? "bg-crimson/20 border-crimson/40 text-cream"
                                                : "bg-cream/5 border-cream/10 text-cream/50 hover:border-crimson/30 hover:text-cream/80"
                                            }
                                        `}
                                        style={{ transform: "skewX(-4deg)" }}
                                    >
                                        <div
                                            className="flex items-center gap-2"
                                            style={{ transform: "skewX(4deg)" }}
                                        >
                                            <span
                                                className={`font-display text-xs ${isActive ? "text-crimson" : "text-cream/30"
                                                    }`}
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span className="font-display text-xs tracking-wider uppercase truncate">
                                                {section.label}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
