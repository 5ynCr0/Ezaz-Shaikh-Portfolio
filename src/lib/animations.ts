import { Variants } from "framer-motion";

// Page transition variants
export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        x: 100,
        skewX: -5,
    },
    enter: {
        opacity: 1,
        x: 0,
        skewX: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        x: -100,
        skewX: 5,
        transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Diagonal slide in (Persona-style)
export const diagonalSlide: Variants = {
    initial: {
        opacity: 0,
        x: 200,
        y: -100,
        skewX: -12,
    },
    animate: {
        opacity: 1,
        x: 0,
        y: 0,
        skewX: -6,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Stagger container for children animations
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

// Fade up animation for staggered items
export const fadeUp: Variants = {
    initial: {
        opacity: 0,
        y: 40,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Snap in animation (bouncy)
export const snapIn: Variants = {
    initial: {
        opacity: 0,
        scale: 0.8,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: [0.34, 1.56, 0.64, 1],
        },
    },
};

// Slide in from left (menu items)
export const slideInLeft: Variants = {
    initial: {
        opacity: 0,
        x: -100,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        x: -50,
        transition: {
            duration: 0.2,
        },
    },
};

// Slide in from right
export const slideInRight: Variants = {
    initial: {
        opacity: 0,
        x: 100,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Scale reveal (for panels)
export const scaleReveal: Variants = {
    initial: {
        opacity: 0,
        scaleX: 0,
        originX: 0,
    },
    animate: {
        opacity: 1,
        scaleX: 1,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Hover variants for cards
export const cardHover = {
    rest: {
        scale: 1,
        x: 0,
        y: 0,
        boxShadow: "0px 0px 0px rgba(231, 58, 58, 0)",
    },
    hover: {
        scale: 1.02,
        x: -4,
        y: -4,
        boxShadow: "8px 8px 0px rgba(231, 58, 58, 1)",
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
};

// Text reveal animation
export const textReveal: Variants = {
    initial: {
        y: "100%",
    },
    animate: {
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Menu animation — Persona 5 slash reveal
export const menuVariants: Variants = {
    closed: {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        skewX: -8,
        transition: {
            duration: 0.35,
            ease: [0.76, 0, 0.24, 1],
        },
    },
    open: {
        clipPath: "polygon(0 0, 105% 0, 105% 100%, 0 100%)",
        skewX: 0,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Each nav item — slams in from left with an overshoot
export const menuItemVariants: Variants = {
    closed: {
        opacity: 0,
        x: -80,
        skewX: -12,
    },
    open: (i: number) => ({
        opacity: 1,
        x: 0,
        skewX: 0,
        transition: {
            delay: i * 0.07,
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
        },
    }),
};
