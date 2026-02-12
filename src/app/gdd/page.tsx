"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { staggerContainer, fadeUp } from "@/lib/animations";
import RansomNote from "@/components/RansomNote";
import { documents } from "@/lib/data";

const categories = ["All", "Concept Design", "Production GDD", "MVP Design", "Level Design", "Narrative Design"];

export default function GDDPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredDocs =
        activeCategory === "All"
            ? documents
            : documents.filter((doc) => doc.category === activeCategory);

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
                        DOCUMENTATION
                    </span>
                    <div className="mt-2">
                        <RansomNote text="DESIGN DOCUMENTS" size="md" />
                    </div>
                    <div className="w-32 h-1 bg-crimson mt-6" />
                    <p className="text-cream/70 text-xl mt-6 max-w-2xl">
                        Documentation focused on clarity, intent, and real implementation.
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-3 font-display text-lg transition-all duration-200 border-2 ${activeCategory === category
                                ? "bg-crimson text-cream border-ink"
                                : "bg-transparent text-cream/70 border-cream/30 hover:border-crimson hover:text-crimson"
                                }`}
                            style={{ transform: "skewX(-6deg)" }}
                        >
                            <span style={{ transform: "skewX(6deg)", display: "inline-block" }}>
                                {category}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Documents Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid md:grid-cols-2 gap-8"
                >
                    {filteredDocs.map((doc) => (
                        <motion.div
                            key={doc.id}
                            variants={fadeUp}
                            className="group h-full"
                        >
                            <Link href={`/gdd/${doc.slug}`} className="block h-full">
                                <div className="game-card h-full flex flex-col group relative">
                                    {/* Top Cover / Category Area */}
                                    <div className="relative h-32 bg-ink-lighter border-b-2 border-cream/10 overflow-hidden">
                                        {doc.image ? (
                                            <>
                                                <Image
                                                    src={doc.image}
                                                    alt={doc.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                                />
                                                <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-300" />
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                                <span className="font-display text-4xl text-crimson/20 group-hover:text-crimson/40 transition-colors duration-300">
                                                    GDD
                                                </span>
                                            </div>
                                        )}

                                        {/* Category Badge */}
                                        <div
                                            className="absolute top-4 right-4 bg-crimson px-3 py-1 border-2 border-ink z-10"
                                            style={{ transform: "skewX(-6deg)" }}
                                        >
                                            <span
                                                className="font-display text-sm text-cream inline-block"
                                                style={{ transform: "skewX(6deg)" }}
                                            >
                                                {doc.category}
                                            </span>
                                        </div>

                                        {/* Red overlay on hover */}
                                        <div className="absolute inset-0 bg-crimson/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="font-display text-3xl text-cream mb-3 group-hover:text-crimson transition-colors">
                                            {doc.title}
                                        </h3>

                                        <p className="text-cream/70 mb-4 flex-grow text-sm leading-relaxed">
                                            {doc.description}
                                        </p>

                                        {/* Pages & Arrow */}
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-cream/10">
                                            <span className="text-cream/40 font-display text-sm">
                                                {doc.pages} PAGES
                                            </span>
                                            <span className="text-crimson font-display group-hover:translate-x-1 transition-transform">
                                                VIEW DOC →
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-crimson transition-all duration-300 group-hover:w-full" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredDocs.length === 0 && (
                    <div className="text-center py-16">
                        <span className="font-display text-4xl text-cream/30">
                            NO DOCUMENTS IN THIS CATEGORY
                        </span>
                    </div>
                )}
            </div>
        </main>
    );
}
