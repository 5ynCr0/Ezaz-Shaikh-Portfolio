"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants } from "@/lib/animations";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
    return (
        <motion.main
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={className}
        >
            {children}
        </motion.main>
    );
}

// Page wrapper with diagonal transition overlay
export function DiagonalTransition({ children }: { children: ReactNode }) {
    return (
        <div className="relative overflow-hidden">
            {/* Transition overlay */}
            <motion.div
                className="fixed inset-0 bg-crimson z-50 origin-left"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{ transformOrigin: "right" }}
            />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
