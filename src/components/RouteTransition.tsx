"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Context that tells child components whether the route transition is done.
 * Components can use `useRouteReady()` to delay animations until the loader is gone.
 */
const RouteReadyContext = createContext(true);
export const useRouteReady = () => useContext(RouteReadyContext);

/**
 * Wraps page content and shows a loading overlay during route transitions.
 * Detects pathname changes and shows the crimson bar animation until the new page settles.
 */
export default function RouteTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isReady, setIsReady] = useState(true);
    const prevPathRef = useRef(pathname);

    // Show loader on route change only (not initial load — let page animations play)
    useEffect(() => {
        if (pathname !== prevPathRef.current) {
            setIsTransitioning(true);
            setIsReady(false);
            prevPathRef.current = pathname;

            // Let the new page render, then fade out
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                // Mark ready slightly after loader starts fading so animations overlap the fade-out
                setTimeout(() => setIsReady(true), 100);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return (
        <RouteReadyContext.Provider value={isReady}>
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        key="route-loader"
                        className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Animated loading bar */}
                        <motion.div className="w-48 h-1 bg-crimson/20 overflow-hidden">
                            <motion.div
                                className="h-full bg-crimson"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </RouteReadyContext.Provider>
    );
}
