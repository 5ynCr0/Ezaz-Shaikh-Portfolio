"use client";

import { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CubeSection {
    label: string;
    content: ReactNode;
}

interface CubeNavigatorProps {
    sections: CubeSection[];
}

export default function CubeNavigator({ sections }: CubeNavigatorProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<"up" | "down">("down");
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<number>(0);
    const wheelAccumRef = useRef<number>(0);
    const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const TRANSITION_DURATION = 0.8;
    const WHEEL_THRESHOLD = 50; // Accumulate wheel delta before triggering

    // Deep-link: read ?section=N on mount (client-only to avoid hydration mismatch)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const s = params.get("section");
        if (s) {
            const idx = parseInt(s, 10);
            if (!isNaN(idx) && idx >= 0 && idx < sections.length && idx !== 0) {
                setCurrentIndex(idx);
            }
        }
    }, [sections.length]);

    const goToSection = useCallback(
        (index: number) => {
            if (isAnimating || index === currentIndex) return;
            if (index < 0 || index >= sections.length) return;

            setDirection(index > currentIndex ? "down" : "up");
            setIsAnimating(true);
            setCurrentIndex(index);

            setTimeout(() => {
                setIsAnimating(false);
            }, TRANSITION_DURATION * 1000 + 100);
        },
        [currentIndex, isAnimating, sections.length]
    );

    const goNext = useCallback(() => {
        if (currentIndex < sections.length - 1) {
            goToSection(currentIndex + 1);
        }
    }, [currentIndex, sections.length, goToSection]);

    const goPrev = useCallback(() => {
        if (currentIndex > 0) {
            goToSection(currentIndex - 1);
        }
    }, [currentIndex, goToSection]);

    // Wheel handler — accumulate delta then trigger (respects panel scroll)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (isAnimating) return;

            // Find the scrollable panel inside the container
            const panel = container.querySelector(".cube-panel") as HTMLElement | null;
            if (panel) {
                const { scrollTop, scrollHeight, clientHeight } = panel;
                const atTop = scrollTop <= 1;
                const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

                // If content is scrollable and not at boundary, let it scroll naturally
                if (scrollHeight > clientHeight) {
                    if (e.deltaY > 0 && !atBottom) return; // scrolling down, not at bottom
                    if (e.deltaY < 0 && !atTop) return;    // scrolling up, not at top
                }
            }

            e.preventDefault();

            wheelAccumRef.current += e.deltaY;

            if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
            wheelTimeoutRef.current = setTimeout(() => {
                wheelAccumRef.current = 0;
            }, 200);

            if (wheelAccumRef.current > WHEEL_THRESHOLD) {
                wheelAccumRef.current = 0;
                goNext();
            } else if (wheelAccumRef.current < -WHEEL_THRESHOLD) {
                wheelAccumRef.current = 0;
                goPrev();
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [isAnimating, goNext, goPrev]);

    // Touch handler
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartRef.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isAnimating) return;
            const deltaY = touchStartRef.current - e.changedTouches[0].clientY;

            // Check if panel has scrollable content
            const panel = container.querySelector(".cube-panel") as HTMLElement | null;
            if (panel) {
                const { scrollTop, scrollHeight, clientHeight } = panel;
                const atTop = scrollTop <= 1;
                const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

                if (scrollHeight > clientHeight) {
                    if (deltaY > 0 && !atBottom) return; // swiping up, content not at bottom
                    if (deltaY < 0 && !atTop) return;    // swiping down, content not at top
                }
            }

            if (Math.abs(deltaY) > 60) {
                if (deltaY > 0) goNext();
                else goPrev();
            }
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchend", handleTouchEnd, { passive: true });
        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isAnimating, goNext, goPrev]);

    // Keyboard handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isAnimating) return;

            switch (e.key) {
                case "ArrowDown":
                case "PageDown":
                    e.preventDefault();
                    goNext();
                    break;
                case "ArrowUp":
                case "PageUp":
                    e.preventDefault();
                    goPrev();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isAnimating, goNext, goPrev]);

    // Lock page scroll & hide layout footer — cube handles its own navigation
    useEffect(() => {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        // Hide the layout-level footer so it's not reachable
        const layoutFooter = document.querySelector("body > footer, body > div > footer");
        if (layoutFooter) (layoutFooter as HTMLElement).style.display = "none";

        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            if (layoutFooter) (layoutFooter as HTMLElement).style.display = "";
        };
    }, []);

    // Listen for custom navigation events (e.g. from Hero CTA buttons)
    useEffect(() => {
        const handleCubeNav = (e: Event) => {
            const index = (e as CustomEvent).detail?.index;
            if (typeof index === "number") goToSection(index);
        };
        window.addEventListener("cube:navigate", handleCubeNav);
        return () => window.removeEventListener("cube:navigate", handleCubeNav);
    }, [goToSection]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        };
    }, []);

    // 3D rotation variants
    const faceVariants = {
        // Where the face enters FROM
        enter: (dir: "up" | "down") => ({
            rotateX: dir === "down" ? 90 : -90,
            z: -300,
            opacity: 0.6,
        }),
        // Visible center position
        center: {
            rotateX: 0,
            z: 0,
            opacity: 1,
        },
        // Where the face exits TO
        exit: (dir: "up" | "down") => ({
            rotateX: dir === "down" ? -90 : 90,
            z: -300,
            opacity: 0.6,
        }),
    };

    return (
        <div
            ref={containerRef}
            className="cube-viewport"
            style={{
                height: "100vh",
                width: "100%",
                overflow: "hidden",
                position: "relative",
                perspective: "1200px",
                perspectiveOrigin: "center center",
            }}
        >
            {/* 3D rotating panels */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={faceVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        duration: TRANSITION_DURATION,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="cube-panel absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {sections[currentIndex].content}
                </motion.div>
            </AnimatePresence>

            {/* Section indicators — Left on mobile (to avoid scrollbar), Right on desktop */}
            <div className="fixed left-3 sm:left-auto sm:right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-start sm:items-end gap-1.5 sm:gap-2">
                {sections.map((section, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <button
                            key={index}
                            onClick={() => goToSection(index)}
                            className={`group flex items-center gap-2 ${isActive ? "" : "opacity-50 hover:opacity-100"}`}
                            aria-label={`Go to ${section.label}`}
                        >
                            {/* Label — hidden on mobile, visible on hover/active on desktop */}
                            <span
                                className={`hidden sm:inline font-display text-xs tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${isActive
                                    ? "opacity-100 text-crimson translate-x-0"
                                    : "opacity-0 group-hover:opacity-70 text-cream translate-x-2 group-hover:translate-x-0"
                                    }`}
                            >
                                {section.label}
                            </span>

                            {/* Angular bar — smaller on mobile */}
                            <div
                                className={`transition-all duration-300 ${isActive
                                    ? "w-2 h-4 sm:w-3 sm:h-6 bg-crimson shadow-[0_0_10px_rgba(231,58,58,0.4)]"
                                    : "w-1.5 h-3 sm:w-2 sm:h-4 bg-cream/20 group-hover:bg-cream/50"
                                    }`}
                                style={{ transform: "skewY(-12deg)" }}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Bottom hint — only on first section, whole thing bobs */}
            <AnimatePresence>
                {currentIndex === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 8, 0] }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }} // Fast exit
                        transition={{
                            opacity: { delay: 1.5, duration: 0.5 }, // Slow enter
                            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                        }}
                        className="absolute bottom-8 left-0 w-full z-40 flex flex-col items-center justify-center gap-2 pointer-events-none"
                    >
                        <span className="font-display text-cream/40 text-xs tracking-widest uppercase">
                            Scroll to explore
                        </span>
                        <div className="w-px h-6 bg-crimson/50" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
