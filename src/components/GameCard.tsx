"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cardHover } from "@/lib/animations";

interface GameCardProps {
    title: string;
    platform: string;
    role: string;
    image?: string;
    youtubeId?: string;
    tags?: string[];
    onClick?: () => void;
}

export default function GameCard({
    title,
    platform,
    role,
    image,
    youtubeId,
    tags = [],
    onClick,
}: GameCardProps) {
    // Use YouTube thumbnail if youtubeId is provided, otherwise use image
    const coverImage = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
        : image;
    return (
        <motion.div
            className="game-card cursor-pointer h-full"
            variants={cardHover}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-ink-lighter">
                {coverImage ? (
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized={!!youtubeId}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-4xl text-crimson/30">GAME</span>
                    </div>
                )}

                {/* Red overlay on hover */}
                <motion.div
                    className="absolute inset-0 bg-crimson/80"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Platform Badge */}
                <div
                    className="absolute top-4 right-4 bg-crimson px-3 py-1 border-2 border-ink"
                    style={{ transform: "skewX(-6deg)" }}
                >
                    <span
                        className="font-display text-sm text-cream"
                        style={{ transform: "skewX(6deg)", display: "inline-block" }}
                    >
                        {platform}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Title */}
                <h3 className="font-display text-3xl text-cream mb-2 leading-tight">
                    {title}
                </h3>

                {/* Role */}
                <p className="text-cream/70 text-sm mb-4">{role}</p>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className="tag">
                                <span className="tag-text">{tag}</span>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Accent Line */}
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-crimson"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}
