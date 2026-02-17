"use client";

import { motion } from "framer-motion";
import { useCallback, useRef } from "react";
import { gsap } from "gsap";
import { staggerContainer, fadeUp } from "@/lib/animations";
import Button from "./Button";
import RansomNote from "./RansomNote";
import { useRouteReady } from "./RouteTransition";

interface HeroProps {
    name?: string;
    title?: string;
    tagline?: string;
}

export default function Hero({
    name = "EZAZ SHAIKH",
    title = "Gameplay and Systems Designer",
    tagline = "Driven by imagination, and powered by iteration.",
}: HeroProps) {
    const nameWords = name.split(' ');
    const catRef = useRef<HTMLDivElement>(null);
    const isRouteReady = useRouteReady();

    const spawnHearts = useCallback(() => {
        const container = catRef.current;
        if (!container) return;

        const hearts = ['❤️', '💕', '💖', '💗', '🩷'];
        const count = 5 + Math.floor(Math.random() * 4); // 5-8 hearts

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = `${12 + Math.random() * 14}px`;
            heart.style.left = `${20 + Math.random() * 60}%`;
            heart.style.top = `${20 + Math.random() * 60}%`;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '50';
            container.appendChild(heart);

            gsap.fromTo(heart,
                { opacity: 1, scale: 0, y: 0 },
                {
                    opacity: 0,
                    scale: 1.2,
                    y: -40 - Math.random() * 40,
                    x: (Math.random() - 0.5) * 50,
                    duration: 0.8 + Math.random() * 0.4,
                    ease: 'power2.out',
                    onComplete: () => heart.remove(),
                }
            );
        }
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-diagonal">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Large diagonal line */}
                <div
                    className="absolute top-0 right-0 w-full h-[300px] bg-crimson/10"
                    style={{ transform: "rotate(-12deg) translateY(-50%)" }}
                />

                {/* Vertical accent - positioned further right on mobile to avoid nav collision */}
                <div className="absolute left-12 sm:left-16 top-0 bottom-0 w-1 bg-crimson/50" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, #E73A3A 1px, transparent 1px),
              linear-gradient(to bottom, #E73A3A 1px, transparent 1px)
            `,
                        backgroundSize: "80px 80px",
                    }}
                />
            </div>

            {/* Content — two-column layout */}
            <div className="relative z-10 container mx-auto pl-8 sm:pl-20 md:pl-24 pr-4 sm:pr-8 flex items-center">
                {/* Left Column — Text content */}
                <motion.div
                    className="flex-1"
                    variants={staggerContainer}
                    initial="initial"
                    animate={isRouteReady ? "animate" : "initial"}
                >
                    {/* Name - Ransom Note Style */}
                    <motion.div className="mb-6 space-y-2" variants={fadeUp}>
                        {nameWords.map((word, i) => (
                            <RansomNote
                                key={word}
                                text={word}
                                className="block"
                                staggerDelay={0.03}
                            />
                        ))}
                    </motion.div>

                    {/* Title Panel */}
                    <motion.div
                        className="inline-block mb-8"
                        variants={fadeUp}
                    >
                        <div
                            className="bg-ink/80 px-8 py-4 border-4 border-crimson backdrop-blur-sm"
                            style={{ transform: "skewX(-6deg)" }}
                        >
                            <span
                                className="font-display text-2xl md:text-4xl text-crimson block"
                                style={{ transform: "skewX(6deg)" }}
                            >
                                {title}
                            </span>
                        </div>
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        className="text-xl md:text-2xl text-cream/80 max-w-2xl mb-12"
                        variants={fadeUp}
                    >
                        {tagline}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        className="flex flex-wrap gap-4"
                        variants={fadeUp}
                    >
                        <Button onClick={() => window.dispatchEvent(new CustomEvent("cube:navigate", { detail: { index: 1 } }))} variant="primary" size="lg">
                            Learn More
                        </Button>
                        <Button href="/" variant="outline" size="lg">
                            View Work
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Right Column — Profile Image (md+ only) */}
                <motion.div
                    className="hidden lg:block flex-shrink-0"
                    initial={{ opacity: 0, x: 40 }}
                    animate={isRouteReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                >
                    <div className="relative inline-block">
                        {/* Crimson accent — slightly rotated behind */}
                        <div className="absolute -inset-4 bg-crimson" style={{ transform: "rotate(3deg)" }} />
                        {/* Dark container — between crimson and image */}
                        <div className="absolute -inset-2 bg-ink" style={{ transform: "rotate(1.5deg)" }} />
                        {/* 404 Gag — replaces the image */}
                        <div className="relative w-[340px] lg:w-[420px] aspect-[3/4] bg-ink flex flex-col items-center justify-center px-6 text-center" style={{ transform: "rotate(2.5deg)" }}>
                            <span className="font-display text-6xl lg:text-7xl text-crimson tracking-wider mb-2" style={{ textShadow: "0 0 20px rgba(231,58,58,0.5)" }}>404</span>
                            <span className="font-display text-lg lg:text-xl text-cream/90 tracking-wide mb-6">Image Not Found</span>
                            <p className="text-sm text-cream/60 leading-relaxed mb-6">
                                I&apos;m usually behind the scenes<br />designing systems.<br /><br />
                                Here&apos;s my cat instead. He likes pats.
                            </p>
                            <div ref={catRef} className="relative cursor-pointer" onClick={spawnHearts}>
                                <pre className="text-cream/90 text-xs leading-tight font-mono select-none">{`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡴⣆⠀⠀⠀⠀⠀⣠⡀⠀⠀⠀⠀⠀⠀⣼⣿⡗⠀⠀⠀⠀
⠀⠀⠀⣠⠟⠀⠘⠷⠶⠶⠶⠾⠉⢳⡄⠀⠀⠀⠀⠀⣧⣿⠀⠀⠀⠀⠀
⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣤⣤⣤⣤⣤⣿⢿⣄⠀⠀⠀⠀
⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⠀⠀⠀⠀⠀⠀⠙⣷⡴⠶⣦
⠀⠀⢱⡀⠀⠉⠉⠀⠀⠀⠀⠛⠃⠀⢠⡟⠀⠀⠀⢀⣀⣠⣤⠿⠞⠛⠋
⣠⠾⠋⠙⣶⣤⣤⣤⣤⣤⣀⣠⣤⣾⣿⠴⠶⠚⠋⠉⠁⠀⠀⠀⠀⠀⠀
⠛⠒⠛⠉⠉⠀⠀⠀⣴⠟⢃⡴⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`}</pre>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>


        </section>
    );
}
