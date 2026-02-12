export interface KeyDecision {
    decision: string;
    tradeoff: string;
}

export interface DesignContributions {
    contribution: string;
}

export interface Screenshot {
    image: string;
    caption: string;
}

export interface Game {
    id: number;
    slug: string;
    title: string;
    platform: string;
    role: string;
    studio: string;
    year: string;
    description: string;
    genres: string[];
    tags: string[];
    youtubeId: string | null;
    storeUrl: string | null;
    tools: string[];
    keyDecisions: KeyDecision[];
    designContributions: DesignContributions[];
    screenshots: Screenshot[];
}

export interface GDD {
    id: number;
    slug: string;
    title: string;
    category: string;
    description: string;
    preview: string;
    pdfUrl: string;
    pages: number;
    image?: string;
}

export const games: Game[] = [
    {
        id: 1,
        slug: "core-trials",
        title: "Core Trials",
        platform: "PC",
        role: "Lead Game Designer",
        studio: "Ohilo Games",
        year: "2025",
        description:
            "Core Trials is a motion-based, pixel-art bullet hell roguelike you play with just your webcam. Move your body to control the core, dodge deadly patterns, strike back at the masters, and survive intense trials. Immerse yourself in high-octane action and unleash the true power of your core!",
        genres: ["Roguelike", "Bullethell", "Casual"],
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
        slug: "move-match-3d",
        title: "Move Match 3D",
        platform: "Android / iOS / WebGL",
        role: "Game Designer",
        studio: "Ohilo Games",
        year: "2024",
        description:
            "First of its kind motion-based match-3D game that has you swaying and swerving to collect falling items before the timer ends.",
        genres: ["Match3D", "Puzzle", "Hybrid-casual"],
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
        slug: "drift-up",
        title: "Drift Up",
        platform: "Android",
        role: "Game Designer",
        studio: "Ohilo Games",
        year: "2024",
        description:
            "Motion-controlled puzzle game where players must safeguard a delicate balloon from numerous obstacles using a protector shield.",
        genres: ["Endless Runner", "Puzzle", "Hyper-casual"],
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
];

export const documents: GDD[] = [
    {
        id: 1,
        slug: "core-trials-gdd",
        title: "Core Trials Complete Design",
        category: "Production GDD",
        description:
            "Complete detailed and structured design document for a bullethell roguelike.",
        preview: "This document outlines the core combat loop, systems, and progression of Core Trials, a bullet-hell roguelike focused on motion-based gameplay, modular core abilities, and escalating encounters driven by curses, blessings, and boss phases.",
        pdfUrl: "/Design Documents/Core Trials GDD.pdf",
        pages: 15,
        image: "/Design Documents/CT_Gdd_img.webp",
    },
    {
        id: 2,
        slug: "blockfest-mvp",
        title: "BlockFest MVP Design",
        category: "MVP Design",
        description:
            "A comprehensive MVP oriented design document for a hybrid casual puzzler.",
        preview: "This document outlines the design and vision for BlockFest, a goal-driven block puzzle game that reimagines classic grid-based gameplay with colored block objectives, level-based progression, power-ups, and retention-focused systems for hybrid-casual mobile audiences.",
        pdfUrl: "/Design Documents/Blockfest GDD.pdf",
        pages: 17,
        image: "/Design Documents/Bf_Gdd_img.webp",
    },
    {
        id: 3,
        slug: "move-or-not-concept",
        title: "Move Or Not Initial Design",
        category: "Concept Design",
        description:
            "The initial version of the design document for a casual puzzle game.",
        preview: "This document captures the initial concept and design exploration for Move Or Not, an original motion-based puzzle idea that blends logical reasoning with real-world movement to create a fast, cognitively engaging experience.",
        pdfUrl: "/Design Documents/Move Or Not GDD.pdf",
        pages: 13,
        image: "/Design Documents/MoN_Gdd_img.webp",
    },
];
