"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
        <main className="min-h-screen pt-24 pb-16">
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
                            className="group"
                        >
                            <Link href={`/gdd/${doc.slug}`} className="block h-full">
                                <div
                                    className="bg-cream text-ink p-8 border-4 border-ink transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-brutal h-full flex flex-col"
                                    style={{ transform: "skewX(-3deg)" }}
                                >
                                    <div style={{ transform: "skewX(3deg)" }} className="flex flex-col h-full">
                                        {/* Category Badge */}
                                        <span className="inline-block bg-crimson text-cream px-3 py-1 font-display text-sm mb-4 self-start">
                                            {doc.category}
                                        </span>

                                        {/* Title */}
                                        <h3 className="font-display text-3xl text-ink mb-3 group-hover:text-crimson transition-colors">
                                            {doc.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-ink/70 mb-4 flex-grow">{doc.description}</p>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-ink/50 font-display">
                                                {doc.pages} PAGES
                                            </span>
                                            <span className="text-crimson font-display group-hover:translate-x-2 transition-transform">
                                                VIEW →
                                            </span>
                                        </div>
                                    </div>
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
