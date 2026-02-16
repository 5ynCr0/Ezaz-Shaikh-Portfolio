"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import RansomNote from "@/components/RansomNote";

// Sample breakdowns data - Replace with your actual content
// To add a new card, copy the template below and fill in your details:
// {
//     id: [unique number],
//     title: "Your Analysis Title",
//     game: "Game Name",
//     type: "Analysis" | "Deep Dive" | "UX Critique",
//     excerpt: "Brief description of your analysis...",
//     link: "https://your-link-here.com",
//     sections: ["Section 1", "Section 2", ...],
// },
const breakdowns = [
    {
        id: 1,
        title: "Royal Match's Secret of Success",
        game: "Royal Match",
        type: "Analysis",
        excerpt:
            "Breaking down Dream Games' recipe for nailing retention and monetization without compromising player experience.",
        link: "https://docs.google.com/document/d/1d3JFQ1EmJ8dtBKDrvkXw6jIxP5gJe1jB5y9tpSNjEEk/edit?usp=sharing",
        sections: [
            "Gameplay",
            "Core Loop",
            "Difficulty Curve",
            "Progression",
            "Core Meta",
            "LiveOps",
            "Monetization",
        ],
    },
    {
        id: 2,
        title: "Complex vs Complicated in Game Design",
        game: "Game Systems Design",
        type: "System Design Fundamentals",
        excerpt:
            "Why true depth comes from emergent interaction and readable feedback loops, not rule density or cognitive overload.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7429125153684520960/",
        sections: [
            "Structural Clarity",
            "Systemic Foundations",
            "Cognitive Load vs Mental Model",
            "Emergent Behavior",
            "Decision Space Dynamics"
        ],
    },
    {
        id: 3,
        title: "Confusion Is Feedback",
        game: "Gameplay Design",
        type: "Design Principles",
        excerpt:
            "Why mechanics that require repeated explanation signal a clarity issue, and why player confusion should trigger redesign, not defense.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7428791211886497792/",
        sections: [
            "UX Clarity",
            "Cognitive Misattribution",
            "Player Psychology",
            "Iteration"
        ],
    },
    {
        id: 4,
        title: "Start With the Hook",
        game: "Showcase & Presentation",
        type: "Design Principles",
        excerpt:
            "Why your showcase should begin with the strongest 5 seconds of gameplay — and why menus, settings, and polish come after the hook.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7427808535201112064/",
        sections: [
            "Completeness Bias",
            "Showcase Sequencing",
            "Attention Bandwidth Constraint",
            "Value Hierarchy",
            "Impact-First Framing",
        ],
    }
];

export default function BreakdownsPage() {
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
                        BREAKDOWNS
                    </span>
                    <div className="mt-2">
                        <RansomNote text="GAME ANALYSIS" size="md" />
                    </div>
                    <div className="w-32 h-1 bg-crimson mt-6" />
                    <p className="text-cream/70 text-xl mt-6 max-w-2xl">
                        Breaking down systems, mechanics, and player experience.
                    </p>
                </motion.div>

                {/* Breakdowns List */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-12"
                >
                    {breakdowns.map((breakdown, index) => (
                        <motion.article
                            key={breakdown.id}
                            variants={fadeUp}
                            className="group relative"
                        >
                            {/* Number - above card on mobile/tablet, outside on xl+ */}
                            <div className="font-display text-5xl sm:text-6xl xl:text-8xl text-crimson/30 mb-2 xl:mb-0 xl:absolute xl:-left-20 xl:top-0">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            {/* Content */}
                            <div className="relative bg-ink-light border-l-4 border-crimson p-6 sm:p-8 md:p-12">
                                {/* Meta */}
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <span
                                        className="bg-crimson px-4 py-1 font-display text-sm text-cream"
                                        style={{ transform: "skewX(-6deg)" }}
                                    >
                                        <span style={{ transform: "skewX(6deg)", display: "inline-block" }}>
                                            {breakdown.type}
                                        </span>
                                    </span>
                                    <span className="text-cream/50 font-display">
                                        {breakdown.game}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="font-display text-4xl md:text-5xl text-cream mb-4 group-hover:text-crimson transition-colors">
                                    {breakdown.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-cream/70 text-lg mb-6 max-w-3xl">
                                    {breakdown.excerpt}
                                </p>

                                {/* Sections Preview */}
                                <div className="mb-6">
                                    <h4 className="font-display text-crimson text-lg mb-3">
                                        SECTIONS
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {breakdown.sections.map((section) => (
                                            <span
                                                key={section}
                                                className="px-4 py-2 bg-ink border border-cream/20 text-cream/70 text-sm"
                                            >
                                                {section}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Read Link */}
                                <motion.a
                                    href={breakdown.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 font-display text-xl text-crimson group/link"
                                    whileHover={{ x: 10 }}
                                >
                                    <span>READ ANALYSIS</span>
                                    <span className="text-2xl group-hover/link:translate-x-2 transition-transform">
                                        →
                                    </span>
                                </motion.a>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-crimson" />
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <div
                        className="inline-block bg-crimson p-8 md:p-12 border-4 border-ink"
                        style={{ transform: "skewX(-3deg)" }}
                    >
                        <div style={{ transform: "skewX(3deg)" }}>
                            <h3 className="font-display text-3xl md:text-4xl text-cream mb-4">
                                ENJOYED THE DISSECTION?
                            </h3>
                            <p className="text-cream/80 mb-6 max-w-lg mx-auto">
                                Follow along for more breakdowns, design thoughts, quiet overthinking, and the occasional hot take.
                            </p>
                            <motion.a
                                href="https://www.linkedin.com/in/ezazxshaikh/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-cream text-ink px-8 py-4 font-display text-xl border-4 border-ink hover:bg-ink hover:text-cream transition-colors"
                                initial={{ skewX: -6 }}
                                whileHover={{
                                    skewX: 0,
                                    x: -4,
                                    y: -4,
                                    boxShadow: "8px 8px 0px #E73A3A"
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
                            >
                                <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
                                    CONNECT ON LINKEDIN
                                </span>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
