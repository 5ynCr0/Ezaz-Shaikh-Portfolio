"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Hero from "@/components/Hero";
import SlantedPanel from "@/components/SlantedPanel";
import Button from "@/components/Button";
import { staggerContainer, fadeUp } from "@/lib/animations";
import RansomNote from "@/components/RansomNote";

export default function HomePage() {
    return (
        <>

            {/* Hero Section */}
            <Hero
                name="EZAZ SHAIKH"
                title="Gameplay and Systems Designer"
                tagline="Driven by imagination, and powered by iteration."
            />

            {/* About Section */}
            <section id="about" className="py-24 relative">
                <div className="container mx-auto px-8">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        {/* Section Header */}
                        <motion.div variants={fadeUp}>
                            <div className="mb-6">
                                <span className="font-display text-crimson text-xl tracking-widest">
                                    01 — ABOUT
                                </span>
                            </div>
                            <div className="mb-6">
                                <RansomNote text="THE DESIGNER" size="md" />
                            </div>
                            <div className="w-24 h-1 bg-crimson mb-8" />
                            <p className="text-cream/80 text-lg leading-relaxed mb-6">
                                A <strong className="text-crimson">Gameplay & Systems Designer </strong>
                                who gives life to ideas, shaping worlds and systems that invite players to explore, feel, and engage. My work has been recognized at India GDC in the PC/Console Game of the Year category and was selected for Tokyo Game Show&apos;s Indie 80 showcase.
                            </p>
                            <p className="text-cream/80 text-lg leading-relaxed mb-6">
                                While direction and clarity matter, I believe the most meaningful experiences come from the choices no one expects. Somewhere underground, a little monster would probably agree. <i className="text-cream/10">Definitely not an Undertale reference. Definitely.</i>
                            </p>
                        </motion.div>

                        {/* Philosophy Panel */}
                        <motion.div variants={fadeUp}>
                            <SlantedPanel variant="red" className="mb-6">
                                <span className="font-display text-2xl block mb-2">
                                    DESIGN PHILOSOPHY
                                </span>
                                <p className="text-cream/90 text-lg">
                                    Deliver what players want. And what they don&apos;t yet know they want.
                                </p>
                            </SlantedPanel>

                            <SlantedPanel variant="default">
                                <span className="font-display text-xl text-crimson block mb-4">
                                    WHAT I BRING
                                </span>
                                <ul className="space-y-2 text-ink/80">
                                    <li className="flex items-center gap-2">
                                        <span className="text-crimson">▸</span> Core Gameplay & Moment-to-Moment Feel
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-crimson">▸</span> Systems Design, Balance & Progression
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-crimson">▸</span> Rapid Prototyping → Playtest → Polish
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-crimson">▸</span> Clear Design Communication (Docs & UI)
                                    </li>
                                </ul>
                            </SlantedPanel>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-24 bg-ink-light relative overflow-hidden">
                <div className="container mx-auto px-8">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeUp} className="text-center mb-16">
                            <span className="font-display text-crimson text-xl tracking-widest">
                                02 — SKILLS
                            </span>
                            <div className="mt-4">
                                <RansomNote text="TOOLKIT" size="md" />
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            {[
                                { name: "Unity", category: "Game Engine", icon: "/icons/unity.png" },
                                { name: "VS Code", category: "IDE", icon: "/icons/vscode.png" },
                                { name: "Figma", category: "Design", icon: "/icons/figma.png" },
                                { name: "Photoshop", category: "Design", icon: "/icons/photoshop.png" },
                                { name: "Premiere Pro", category: "Video Editing", icon: "/icons/premierepro.png" },
                                { name: "DOTween", category: "Animation", icon: "/icons/dotween.png" },
                                { name: "Play Console", category: "Publishing", icon: "/icons/playconsole.png" },
                                { name: "Xcode", category: "Publishing", icon: "/icons/xcode.png" },
                                { name: "Git", category: "Version Control", icon: "/icons/git.png" },
                                { name: "Spreadsheet", category: "Management", icon: "/icons/spreadsheet.png" },
                                { name: "Discord", category: "Communication", icon: "/icons/discord.png" },
                                { name: "Slack", category: "Communication", icon: "/icons/slack.png" },
                            ].map((skill) => (
                                <motion.div
                                    key={skill.name}
                                    className="group relative p-6 bg-ink border-2 border-cream/20 hover:border-crimson transition-colors duration-300"
                                    initial={{ skewX: -6 }}
                                    whileHover={{
                                        skewX: 0,
                                        x: -4,
                                        y: -4,
                                        boxShadow: "8px 8px 0px #E73A3A"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div style={{ transform: "skewX(6deg)" }} className="flex items-center gap-4">
                                        <Image
                                            src={skill.icon}
                                            alt={skill.name}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 object-contain flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                        <div>
                                            <span className="font-display text-2xl text-cream group-hover:text-crimson transition-colors">
                                                {skill.name}
                                            </span>
                                            <span className="block text-cream/50 text-sm mt-1">
                                                {skill.category}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 relative">
                <div className="container mx-auto px-8">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <motion.div variants={fadeUp}>
                            <span className="font-display text-crimson text-xl tracking-widest">
                                03 — CONTACT
                            </span>
                            <div className="mt-4 mb-8">
                                <RansomNote text="LET'S TALK" size="md" />
                            </div>
                        </motion.div>

                        <motion.p
                            variants={fadeUp}
                            className="text-cream/80 text-xl mb-12"
                        >
                            Insert coin to begin… or just drop me a message.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                            <Button href="mailto:ezazxshaikh@gmail.com" variant="primary" size="lg">
                                Email Me
                            </Button>
                            <Button href="/resume.pdf" variant="outline" size="lg" download>
                                Download Resume
                            </Button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={fadeUp}
                            className="flex justify-center gap-8 mt-12"
                        >
                            {[
                                { name: "LinkedIn", href: "https://www.linkedin.com/in/ezazxshaikh/" },
                                { name: "Whatsapp", href: "https://api.whatsapp.com/send?phone=918327761371" },
                                // { name: "Itch.io", href: "#" },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-display text-xl text-cream/50 hover:text-crimson transition-colors"
                                >
                                    {social.name}
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
