"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RansomNote from "./RansomNote";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-40 pointer-events-none">
            <div className="bg-ink/90 backdrop-blur-md border-b-2 border-crimson/20 shadow-lg pointer-events-auto">
                <div className="container mx-auto px-8 py-4 pl-24 lg:pl-8 flex items-center justify-between">
                    {/* Name & Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex flex-col">
                            <Link href="/about" className="group/name block w-fit">
                                <h1 className="font-display text-3xl md:text-4xl text-crimson leading-none tracking-wide group-hover/name:scale-105 transition-transform origin-left">
                                    EZAZ SHAIKH
                                </h1>
                            </Link>
                            <span className="font-display text-lg md:text-xl text-cream/80 tracking-widest mt-1">
                                GAMEPLAY & SYSTEMS DESIGNER
                            </span>
                        </div>
                    </motion.div>

                    {/* Right Side Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-4 pointer-events-auto"
                    >
                        <a
                            href="https://www.linkedin.com/in/ezazxshaikh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-ink-light border-2 border-cream/30 text-cream hover:border-crimson hover:text-crimson transition-colors duration-200"
                            style={{ transform: "skewX(-6deg)" }}
                            title="LinkedIn"
                        >
                            <span style={{ transform: "skewX(6deg)", fontSize: "1.2rem" }}>
                                in
                            </span>
                        </a>

                        <a
                            href="/resume.pdf"
                            download
                            className="hidden md:flex h-12 items-center justify-center px-6 bg-crimson text-cream border-2 border-ink shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#0D0D0D] transition-all font-display tracking-wider text-base cursor-pointer"
                            style={{ transform: "skewX(-6deg)" }}
                        >
                            <span style={{ transform: "skewX(6deg)" }}>
                                RESUME
                            </span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
