"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import { staggerContainer, fadeUp } from "@/lib/animations";
import RansomNote from "@/components/RansomNote";
import { games } from "@/lib/data";

export default function GamesPage() {
    return (
        <main className="min-h-screen pt-36 pb-16">
            <div className="container mx-auto px-8">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="font-display text-crimson text-xl tracking-widest">
                        PORTFOLIO
                    </span>
                    <div className="mt-2">
                        <RansomNote text="SHIPPED TITLES" size="md" />
                    </div>
                    <div className="w-32 h-1 bg-crimson mt-6" />
                    <p className="text-cream/70 text-xl mt-6 max-w-2xl">
                        Games in the wild, shaped by design decisions, iteration, and player behavior.
                    </p>
                </motion.div>

                {/* Games Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid md:grid-cols-2 gap-8"
                >
                    {games.map((game) => (
                        <motion.div key={game.id} variants={fadeUp}>
                            <Link href={`/games/${game.slug}`} className="block h-full">
                                <GameCard
                                    title={game.title}
                                    platform={game.platform}
                                    role={game.role}
                                    youtubeId={game.youtubeId || undefined}
                                    genres={game.genres}
                                    tags={game.tags}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}
