"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SlantedPanel from "@/components/SlantedPanel";
import { staggerContainer, fadeUp } from "@/lib/animations";
import RansomNote from "@/components/RansomNote";

// Sample GDD data - Replace with your actual documents
// To add a new document, copy the template below:
// {
//     id: [unique number],
//     title: "Document Title",
//     category: "Mechanics" | "Systems" | "UX" | "Story",
//     description: "Brief description...",
//     preview: "Preview text for the modal...",
//     pdfUrl: "/Design Documents/YourDocument.pdf",
//     pages: [number],
// },
const documents = [
    {
        id: 1,
        title: "Core Trials Complete Design",
        category: "Production GDD",
        description:
            "Complete detailed and structured design document for a bullethell roguelike.",
        preview: "This document outlines the core combat loop, systems, and progression of Core Trials, a bullet-hell roguelike focused on motion-based gameplay, modular core abilities, and escalating encounters driven by curses, blessings, and boss phases.",
        pdfUrl: "/Design Documents/Core Trials GDD.pdf",
        pages: 15,
    },
    {
        id: 2,
        title: "BlockFest MVP Design",
        category: "MVP Design",
        description:
            "A comprehensive MVP oriented design document for a hybrid casual puzzler.",
        preview: "This document outlines the design and vision for BlockFest, a goal-driven block puzzle game that reimagines classic grid-based gameplay with colored block objectives, level-based progression, power-ups, and retention-focused systems for hybrid-casual mobile audiences.",
        pdfUrl: "/Design Documents/Blockfest GDD.pdf",
        pages: 17,
    },
    {
        id: 3,
        title: "Move Or Not Initial Design",
        category: "Concept Design",
        description:
            "The initial version of the design document for a casual puzzle game.",
        preview: "This document captures the initial concept and design exploration for Move Or Not, an original motion-based puzzle idea that blends logical reasoning with real-world movement to create a fast, cognitively engaging experience.",
        pdfUrl: "/Design Documents/Move Or Not GDD.pdf",
        pages: 13,
    },
];

const categories = ["All", "Concept Design", "Production GDD", "MVP Design", "Level Design", "Narrative Design"];

export default function GDDPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(
        null
    );

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
                            className="group cursor-pointer"
                            onClick={() => setSelectedDoc(doc)}
                        >
                            <div
                                className="bg-cream text-ink p-8 border-4 border-ink transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-brutal"
                                style={{ transform: "skewX(-3deg)" }}
                            >
                                <div style={{ transform: "skewX(3deg)" }}>
                                    {/* Category Badge */}
                                    <span className="inline-block bg-crimson text-cream px-3 py-1 font-display text-sm mb-4">
                                        {doc.category}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-display text-3xl text-ink mb-3 group-hover:text-crimson transition-colors">
                                        {doc.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-ink/70 mb-4">{doc.description}</p>

                                    {/* Meta */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-ink/50 font-display">
                                            {doc.pages} PAGES
                                        </span>
                                        <span className="text-crimson font-display group-hover:translate-x-2 transition-transform">
                                            VIEW →
                                        </span>
                                    </div>
                                </div>
                            </div>
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

            {/* Document Preview Modal */}
            {selectedDoc && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-ink/90 z-40"
                        onClick={() => setSelectedDoc(null)}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed inset-8 md:inset-16 bg-cream text-ink z-50 overflow-y-auto"
                    >
                        <div className="p-8 md:p-12">
                            {/* Close */}
                            <button
                                onClick={() => setSelectedDoc(null)}
                                className="absolute top-6 right-6 w-12 h-12 bg-crimson text-cream font-display text-2xl border-2 border-ink"
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <span className="font-display text-crimson text-lg">
                                {selectedDoc.category}
                            </span>
                            <h2 className="font-display text-5xl text-ink mt-2 mb-6">
                                {selectedDoc.title}
                            </h2>
                            <div className="w-24 h-1 bg-crimson mb-8" />

                            {/* Content Preview */}
                            <div className="prose prose-lg max-w-none">
                                <p className="text-ink/80 text-xl mb-6">
                                    {selectedDoc.description}
                                </p>

                                <div className="bg-ink/5 p-8 border-l-4 border-crimson">
                                    <h3 className="font-display text-2xl text-crimson mb-4">
                                        DOCUMENT PREVIEW
                                    </h3>
                                    <p className="text-ink/70">
                                        {selectedDoc.preview}
                                    </p>
                                </div>

                                {/* PDF Embed */}
                                {selectedDoc.pdfUrl && (
                                    <div className="mt-8 border-2 border-ink/20">
                                        <iframe
                                            src={selectedDoc.pdfUrl}
                                            className="w-full h-[70vh] min-h-[500px]"
                                            title={selectedDoc.title}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </main>
    );
}
