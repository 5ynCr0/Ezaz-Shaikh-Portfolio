"use client";

import { motion } from "framer-motion";

/**
 * Full-viewport loading overlay with Persona 5-themed crimson bar animation.
 * Used for route transitions, page loading, and initial content hydration.
 */
export default function PageLoader() {
    return (
        <div className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center">
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
        </div>
    );
}
