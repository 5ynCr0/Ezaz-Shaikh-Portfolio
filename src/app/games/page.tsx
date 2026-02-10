"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GameCard from "@/components/GameCard";
import { staggerContainer, fadeUp } from "@/lib/animations";
import RansomNote from "@/components/RansomNote";

// Type definitions
interface KeyDecision {
    decision: string;
    tradeoff: string;
}
interface DesignContributions {
    contribution: string;
}

interface Screenshot {
    image: string;
    caption: string;
}

interface Game {
    id: number;
    title: string;
    platform: string;
    role: string;
    studio: string;
    year: string;
    description: string;
    tags: string[];
    youtubeId: string | null;
    storeUrl: string | null;
    tools: string[];
    keyDecisions: KeyDecision[];
    designContributions: DesignContributions[];
    screenshots: Screenshot[];
}

// Sample games data - Replace with your actual games
const games: Game[] = [
    {
        id: 1,
        title: "Core Trials",
        platform: "PC",
        role: "Lead Game Designer",
        studio: "Ohilo Games",
        year: "2025",
        description:
            "Core Trials is a motion-based, pixel-art bullet hell roguelike you play with just your webcam. Move your body to control the core, dodge deadly patterns, strike back at the masters, and survive intense trials. Immerse yourself in high-octane action and unleash the true power of your core!",
        tags: ["Systems Design", "Combat Design", "Level Design", "Balance", "Marketing", "UI/UX", "Sound Design", "Technical Setup"],
        youtubeId: "N1biXvbHSZM",
        storeUrl: "https://store.steampowered.com/app/2549160/Core_Trials/",
        tools: ["Unity", "Figma", "VS Code", "DOTween", "Premiere Pro", "Photoshop", "Xcode", "Steamworks"],
        keyDecisions: [
            {
                decision: "Chose a roguelike run structure over linear progression to support replayability and sustained player engagement.",
                tradeoff: "Accepted higher design complexity and balance overhead in exchange for runs that felt meaningfully different, avoiding repetition and rigid difficulty ramps."
            },
            {
                decision: "Designed certain levels where environmental hazards, rather than enemies, acted as the primary source of challenge.",
                tradeoff: "Reduced enemy variety in these segments to focus on spatial awareness and movement mastery, breaking combat monotony while maintaining tension."
            },
            {
                decision: "Restricted healing to a single optional level per run, framing recovery as a deliberate strategic decision.",
                tradeoff: "Increased short-term risk for players who skipped healing, but reinforced meaningful choice and added a distinct motion-based collection challenge within the run."
            },
            {
                decision: "Approached difficulty as a system-level problem, using A/B testing and analytics to identify root causes rather than treating difficulty as a single-variable issue.",
                tradeoff: "Prioritized deeper system understanding over rapid parameter tweaks, trading speed for more reliable balance outcomes."
            },
            {
                decision: "Made the tutorial optional after player feedback and early-session analytics indicated that mandatory onboarding was unnecessary for most players.",
                tradeoff: "Trusted organic learning through play and feedback systems, accepting that a small portion of players would prefer explicit instruction."
            },
        ],
        designContributions: [
            {
                contribution: "Took end-to-end ownership from documentation and prototyping through iterative refinement, rapidly validating mechanics through playtests and discarding weak concepts early to focus polish on what truly improved the experience."
            },
            {
                contribution: "Created 15+ combat levels featuring 100+ enemy attack patterns and behaviors, tuning difficulty to support both onboarding and mastery without punishing failure."
            },
            {
                contribution: "Built progression systems including achievements and unlocks to reinforce player learning and experimentation."
            },
            {
                contribution: "Executed system-level difficulty tuning by adjusting abilities, health, enemy density, and pacing based on analytics insights."
            },
            {
                contribution: "Designed and implemented 40+ UI screens, ensuring clarity, readability, and consistency across PC builds while preserving moment-to-moment gameplay focus."
            },
            {
                contribution: "Translated player feedback from Discord, Steam reviews, and playtests into actionable design updates, improving onboarding, readability, and balance post-launch."
            },
        ],
        screenshots: [
            {
                image: "/Screenshots/Core Trials/CT4.webp",
                caption: "Prototyping and iterating on core combat system variants to test mechanics."
            },
            {
                image: "/Screenshots/Core Trials/CT5.webp",
                caption: "Prototyping and iterating on core combat system variants to test mechanics."
            },
            {
                image: "/Screenshots/Core Trials/CT6.webp",
                caption: "Prototyping and iterating on core ability ideas."
            },
            {
                image: "/Screenshots/Core Trials/CT7.webp",
                caption: "Prototyping environmental traversal levels to evaluate feel and engagement."
            },
            {
                image: "/Screenshots/Core Trials/CT8.webp",
                caption: "Building dialogue sheets that bridge narrative design and gameplay."
            },
            {
                image: "/Screenshots/Core Trials/CT9.webp",
                caption: "Building a localization tree directly exportable to Unity for seamless multilingual support."
            },
            {
                image: "/Screenshots/Core Trials/CT2.webp",
                caption: "Designing the UI flow before creating wireframes to ensure intuitive navigation."
            },
            {
                image: "/Screenshots/Core Trials/CT3.webp",
                caption: "Developing the first draft wireframes for the game's UI."
            },
            {
                image: "/Screenshots/Core Trials/CT1.webp",
                caption: "Leveraging player psychology on Reddit, generating 11k+ upvotes, converting 25% into wishlists with 70% conversion, and gaining features on 80LV; streamed by top creators like Sodapoppin."
            },
        ],
    },
    {
        id: 2,
        title: "Move Match 3D",
        platform: "Android / iOS / WebGL",
        role: "Game Designer",
        studio: "Ohilo Games",
        year: "2024",
        description:
            "First of its kind motion-based match-3D game that has you swaying and swerving to collect falling items before the timer ends.",
        tags: ["Puzzle Design", "Level Design", "LiveOps Design", "Balance", "Sound Design", "LiveOps", "Technical Setup", "UI/UX"],
        youtubeId: "35pZw8WeeFE",
        storeUrl: "https://play.google.com/store/apps/details?id=io.Ohilo.MoveMatch3D",
        tools: ["Unity", "Figma", "UI/UX", "UI Toolkit", "VS Code", "DOTween"],
        keyDecisions: [
            {
                decision: "Designed difficulty curves around player mastery rather than time-based randomness.",
                tradeoff: "Reduced variability and updated logic in spawn logic and timers to ensure three-star completion was consistently achievable through player mastery to promote fairness and learning."
            },
            {
                decision: "Structured LiveOps events around distinct time loops and short, physically sustainable play sessions.",
                tradeoff: "Limited event stacking and peak challenge density in favor of clarity, physical comfort, and repeat engagement."
            },
            {
                decision: "Designed UI systems to support rapid iteration and long-term scalability.",
                tradeoff: "Chose a more structured UI framework to support faster iteration on feedback and animation, trading initial setup complexity for consistent, scalable UX across content updates."
            },

        ],
        designContributions: [
            {
                contribution: "Designed and balanced 100+ levels using playtests, analytics, and A/B builds, shaping difficulty curves through object density, spawn logic, and time constraints to maintain steady challenge and player flow."
            },
            {
                contribution: "Iteratively designed the core collect-and-match mechanic, focusing on clarity, responsiveness, and playability from a distance to ensure instant readability and low friction for players new to motion-based games."
            },
            {
                contribution: "Designed and implemented LiveOps systems, iterating on events and parameters using player analytics to improve engagement and pacing."
            },
            {
                contribution: "Implemented and refined UI, animations, and visual feedback to reinforce successful matches, progress, and urgency, enhancing satisfaction without visual clutter."
            },
            {
                contribution: "Contributed to polishing and shipping the game across Android, iOS, and Web (CrazyGames), ensuring consistent gameplay feel and performance across platforms."
            },
        ],
        screenshots: [
            {
                image: "/Screenshots/Move Match 3D/MM3D1.webp",
                caption: "Iterating with the UI designer to finalize and implement the game scene UI."
            },
            {
                image: "/Screenshots/Move Match 3D/MM3D2.webp",
                caption: "Designing a level difficulty benchmarking system to generate balanced level sets up to level 100."
            },
            {
                image: "/Screenshots/Move Match 3D/MM3D3.webp",
                caption: "Collaborating with the UI designer to define the game's UI and color theme."
            },
            {
                image: "/Screenshots/Move Match 3D/MM3D4.webp",
                caption: "Creating and implementing juicy UI effects for power-ups that are optimized for clarity and long-range visibility."
            },
            {
                image: "/Screenshots/Move Match 3D/MM3D5.webp",
                caption: "Authoring LiveOps documentation outlining flows and examples for fluid implementation."
            },
        ],
    },
    {
        id: 3,
        title: "Drift Up",
        platform: "Android",
        role: "Game Designer",
        studio: "Ohilo Games",
        year: "2024",
        description:
            "Motion-controlled puzzle game where players must safeguard a delicate balloon from numerous obstacles using a protector shield.",
        tags: ["Puzzle Design", "Systems Design", "Level Design", "LiveOps Design", "Balance", "UI/UX"],
        youtubeId: "4DlSo3C8KzA",
        storeUrl: "https://play.google.com/store/apps/details?id=io.ohilo.DriftUp",
        tools: ["Unity", "Figma", "UI/UX Toolkit", "VS Code", "DOTween", "Photoshop"],
        keyDecisions: [
            {
                decision: "Built upon a proven game structure rather than reinventing the core experience.",
                tradeoff: "Leaning on an existing foundation reduced systemic novelty, but allowed focus on expanding variety, challenge, and moment-to-moment gameplay."
            },
            {
                decision: "Expanded playstyles through power-ups.",
                tradeoff: "Power-ups added variety and moment-to-moment decision-making, at the cost of additional balance considerations during high-intensity sections."
            },
            {
                decision: "Prioritized gameplay over interface complexity.",
                tradeoff: "UI was intentionally kept minimal to reduce visual noise, trusting gameplay readability over explicit on-screen guidance."
            },
        ],
        designContributions: [
            {
                contribution: "Prototyped and contributed 20+ obstacle sets, collaborating with the design team to expand gameplay variety while respecting the constraints of an established core structure."
            },
            {
                contribution: "Contributed to LiveOps iteration by supporting event tuning decisions and reviewing player feedback and analytics with the design team."
            },
            {
                contribution: "Documented designs for meta progression and intentional friction points to support long-term engagement and monetization, which were later deprioritized due to a shift in project focus."
            },
            {
                contribution: "Actively kept the design tightly scoped, favoring depth and polish over additional mechanics. "
            },
            {
                contribution: "Collaborated with the UI designer to define the game's UI structure and color theme, ensuring clarity, simplicity, and visual appeal without distracting from gameplay."
            },
        ],
        screenshots: [
            {
                image: "/Screenshots/Drift Up/DU2.webp",
                caption: "Prototyping and contributing 20+ obstacle sets, collaborating alongside the design team to expand gameplay variety."
            },
            {
                image: "/Screenshots/Drift Up/DU1.webp",
                caption: "Collaborating with the UI designer to define the game's UI and color theme, ensuring clarity, simplicity, and visual appeal."
            },
        ],
    },
    // {
    //     id: 4,
    //     title: "Echoes",
    //     platform: "PC / Console",
    //     role: "UX Designer",
    //     studio: "Narrative Studio",
    //     year: "2022",
    //     description:
    //         "Atmospheric puzzle game exploring themes of memory and loss through environmental storytelling.",
    //     tags: ["UX", "Puzzle Design", "Narrative"],
    //     trailer: null,
    //     tools: ["Unity", "Figma", "Miro"],
    //     keyDecisions: [
    //         {
    //             decision: "Zero tutorial text - all learning through environmental cues",
    //             tradeoff: "10% of players struggled initially but 95% reported higher immersion"
    //         },
    //         {
    //             decision: "Puzzles tied to narrative themes rather than abstract logic",
    //             tradeoff: "Harder to design but emotional resonance increased completion rate by 35%"
    //         },
    //         {
    //             decision: "Implemented subtle hint system triggered by player stillness",
    //             tradeoff: "Maintains immersion while preventing frustration - average stuck time reduced 50%"
    //         },
    //         {
    //             decision: "No fail states - only forward progress",
    //             tradeoff: "Accessible to non-gamers; some hardcore players wanted more challenge"
    //         },
    //     ],
    //     screenshots: [
    //         {
    //             image: "/screenshots/echoes-puzzle.jpg",
    //             caption: "Memory fragment puzzle - visual language teaches mechanics without words"
    //         },
    //         {
    //             image: "/screenshots/echoes-environment.jpg",
    //             caption: "Environmental storytelling: room details reveal character backstory organically"
    //         },
    //     ],
    // },
];

export default function GamesPage() {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

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
                            <GameCard
                                title={game.title}
                                platform={game.platform}
                                role={game.role}
                                youtubeId={game.youtubeId || undefined}
                                tags={game.tags}
                                onClick={() => setSelectedGame(game)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Game Detail Modal */}
            <AnimatePresence>
                {selectedGame && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-ink/90 z-40"
                            onClick={() => setSelectedGame(null)}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, skewX: -6 }}
                            animate={{ opacity: 1, x: 0, skewX: 0 }}
                            exit={{ opacity: 0, x: 100, skewX: 6 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-ink-light border-l-4 border-crimson z-50 overflow-y-auto"
                        >
                            <div className="p-8 md:p-12">
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedGame(null)}
                                    className="absolute top-6 right-6 w-12 h-12 bg-crimson flex items-center justify-center font-display text-2xl text-cream border-2 border-ink hover:bg-crimson-dark transition-colors"
                                    style={{ transform: "skewX(-6deg)" }}
                                >
                                    <span style={{ transform: "skewX(6deg)" }}>✕</span>
                                </button>

                                {/* Game Info */}
                                <div className="mb-8">
                                    <span className="font-display text-crimson text-lg">
                                        {selectedGame.studio} | {selectedGame.year}
                                    </span>
                                    <h2 className="font-display text-5xl md:text-6xl text-cream mt-2">
                                        {selectedGame.title}
                                    </h2>
                                </div>

                                {/* Platform & Role */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <div
                                        className="bg-crimson px-4 py-2 border-2 border-ink"
                                        style={{ transform: "skewX(-6deg)" }}
                                    >
                                        <span
                                            className="font-display text-cream"
                                            style={{ transform: "skewX(6deg)", display: "inline-block" }}
                                        >
                                            {selectedGame.platform}
                                        </span>
                                    </div>
                                    <div
                                        className="bg-cream px-4 py-2 border-2 border-ink"
                                        style={{ transform: "skewX(-6deg)" }}
                                    >
                                        <span
                                            className="font-display text-ink"
                                            style={{ transform: "skewX(6deg)", display: "inline-block" }}
                                        >
                                            {selectedGame.role}
                                        </span>
                                    </div>
                                    {selectedGame.storeUrl && (
                                        <a
                                            href={selectedGame.storeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-ink px-4 py-2 border-2 border-crimson hover:bg-crimson transition-colors"
                                            style={{ transform: "skewX(-6deg)" }}
                                        >
                                            <span
                                                className="font-display text-cream"
                                                style={{ transform: "skewX(6deg)", display: "inline-block" }}
                                            >
                                                PLAY GAME
                                            </span>
                                        </a>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h3 className="font-display text-2xl text-crimson mb-4">
                                        OVERVIEW
                                    </h3>
                                    <p className="text-cream/80 text-lg leading-relaxed">
                                        {selectedGame.description}
                                    </p>
                                </div>

                                {/* Trailer */}
                                {selectedGame.youtubeId && (
                                    <div className="mb-8">
                                        <h3 className="font-display text-2xl text-crimson mb-4">
                                            TRAILER
                                        </h3>
                                        <div className="aspect-video border-2 border-cream/20 overflow-hidden">
                                            <iframe
                                                src={`https://www.youtube-nocookie.com/embed/${selectedGame.youtubeId}?modestbranding=1&rel=0&iv_load_policy=3&disablekb=0&fs=1`}
                                                title={`${selectedGame.title} Trailer`}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Contributions */}
                                <div className="mb-8">
                                    <h3 className="font-display text-2xl text-crimson mb-4">
                                        CONTRIBUTIONS
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedGame.tags.map((tag) => (
                                            <span key={tag} className="tag">
                                                <span className="tag-text">{tag}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Tools */}
                                <div className="mb-8">
                                    <h3 className="font-display text-2xl text-crimson mb-4">
                                        TOOLS USED
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        {selectedGame.tools.map((tool) => (
                                            <span
                                                key={tool}
                                                className="text-cream/60 font-display text-lg"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Design Decisions */}
                                {selectedGame.keyDecisions && selectedGame.keyDecisions.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-display text-2xl text-crimson mb-4">
                                            KEY DESIGN DECISIONS
                                        </h3>
                                        <div className="space-y-4">
                                            {selectedGame.keyDecisions.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="relative bg-ink border-l-4 border-crimson p-4"
                                                    style={{ transform: "skewX(-2deg)" }}
                                                >
                                                    <div style={{ transform: "skewX(2deg)" }}>
                                                        <div className="flex items-start gap-3 mb-2">
                                                            <span className="font-display text-crimson text-xl flex-shrink-0">
                                                                {String(index + 1).padStart(2, '0')}
                                                            </span>
                                                            <p className="text-cream font-medium leading-tight">
                                                                {item.decision}
                                                            </p>
                                                        </div>
                                                        <div className="ml-9 flex items-start gap-2">
                                                            <span className="text-crimson/80 text-sm">↳</span>
                                                            <p className="text-cream/60 text-sm italic">
                                                                {item.tradeoff}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Design Contributions */}
                                {selectedGame.designContributions && selectedGame.designContributions.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-display text-2xl text-crimson mb-4">
                                            DESIGN CONTRIBUTIONS
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedGame.designContributions.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="relative bg-ink border-l-4 border-crimson p-4"
                                                    style={{ transform: "skewX(-2deg)" }}
                                                >
                                                    <div style={{ transform: "skewX(2deg)" }}>
                                                        <div className="flex items-start gap-3">
                                                            <span className="font-display text-crimson text-xl flex-shrink-0">
                                                                {String(index + 1).padStart(2, '0')}
                                                            </span>
                                                            <p className="text-cream font-medium leading-tight">
                                                                {item.contribution}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Screenshots with Commentary */}
                                {selectedGame.screenshots && selectedGame.screenshots.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-display text-2xl text-crimson mb-4">
                                            SCREENSHOTS
                                        </h3>
                                        <div className="space-y-6">
                                            {selectedGame.screenshots.map((screenshot, index) => (
                                                <div key={index} className="group">
                                                    {/* Image Container */}
                                                    <div
                                                        className="relative aspect-video bg-ink-lighter border-2 border-cream/20 overflow-hidden mb-3"
                                                        style={{ transform: "skewX(-3deg)" }}
                                                    >
                                                        <Image
                                                            src={screenshot.image}
                                                            alt={screenshot.caption}
                                                            fill
                                                            className="object-cover"
                                                            style={{ transform: "skewX(3deg) scale(1.1)" }}
                                                        />
                                                        {/* Hover accent */}
                                                        <div className="absolute bottom-0 left-0 h-1 w-0 bg-crimson group-hover:w-full transition-all duration-300" />
                                                    </div>
                                                    {/* Caption */}
                                                    <div className="flex items-start gap-3 pl-2">
                                                        <span className="text-crimson font-display text-lg flex-shrink-0">▸</span>
                                                        <p className="text-cream/70 text-sm leading-relaxed">
                                                            {screenshot.caption}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}
