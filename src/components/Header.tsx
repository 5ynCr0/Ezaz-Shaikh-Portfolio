"use client";

import Link from "next/link";
import Button, { IconButton } from "./Button";
import { motion } from "framer-motion";
import RansomNote from "./RansomNote";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-40 pointer-events-none">
            <div className="bg-ink/90 backdrop-blur-md border-b-2 border-crimson/20 shadow-lg pointer-events-auto">
                <div className="container mx-auto px-8 py-4 pl-24 2xl:pl-8 flex items-center justify-between">
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
                        <IconButton
                            icon={<span style={{ fontSize: "1.2rem", fontFamily: "serif", fontWeight: "bold" }}>in</span>}
                            label="LinkedIn"
                            href="https://www.linkedin.com/in/ezazxshaikh/"
                        />

                        <div className="hidden md:block">
                            <Button href="/resume.pdf" download variant="primary" size="sm" className="h-12 flex items-center px-5">
                                Resume
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
