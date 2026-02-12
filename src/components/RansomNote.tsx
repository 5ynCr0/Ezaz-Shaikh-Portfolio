'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface RansomNoteProps {
    text: string;
    className?: string;
    animate?: boolean;
    staggerDelay?: number;
    size?: 'lg' | 'md' | 'sm';
}

const STYLES = [
    { background: '#E73A3A', color: '#FAF7F0' },                                    // Crimson bg
    { background: '#FAF7F0', color: '#0D0D0D' },                                    // Cream bg
    { background: '#0D0D0D', color: '#FAF7F0', border: '2px solid #E73A3A' },       // Ink bg
    { background: 'transparent', color: '#E73A3A' },                                 // Ghost — red text
];

/** Fisher-Yates shuffle (returns a new array) */
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Build a randomised style list for `count` letters.
 */
function buildStyleMap(count: number) {
    if (count === 0) return [];

    if (count < 4) {
        return shuffle(STYLES).slice(0, count);
    }

    const result: typeof STYLES = [];
    while (result.length < count) {
        result.push(...shuffle(STYLES));
    }
    return result.slice(0, count);
}

export default function RansomNote({
    text,
    className = '',
    animate = true,
    staggerDelay = 0.05,
    size = 'lg'
}: RansomNoteProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [styleMap, setStyleMap] = useState<typeof STYLES>([]);
    const [rotations, setRotations] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    // Initial server render state - consistent/empty to avoid mismatch
    const letterChars = text.replace(/ /g, '');

    useEffect(() => {
        // Generate random styles and rotations strictly on client side
        setStyleMap(buildStyleMap(letterChars.length));
        setRotations(letterChars.split('').map(() => `rotate(${Math.random() * 8 - 4}deg)`));
        setMounted(true);
    }, [letterChars, text]);

    useEffect(() => {
        if (!mounted || !animate || !containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.ransom-letter',
                {
                    y: -200,
                    opacity: 0,
                    rotation: () => gsap.utils.random(-12, 12),
                    scale: 1.5
                },
                {
                    y: 0,
                    opacity: 1,
                    rotation: () => gsap.utils.random(-6, 6),
                    scale: 1,
                    duration: 0.4,
                    ease: 'back.out(2)',
                    stagger: { each: staggerDelay, from: 'random' }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [animate, staggerDelay, mounted]);

    let letterIndex = 0;

    return (
        <div
            ref={containerRef}
            className={`ransom-container ${size === 'sm' ? 'ransom-container-sm' : size === 'md' ? 'ransom-container-md' : ''} ${className}`}
        >
            {text.split('').map((letter, index) => {
                if (letter === ' ') {
                    return <span key={index} className="ransom-space" />;
                }

                // Default style for server/initial render
                const style = mounted ? styleMap[letterIndex] : STYLES[0];
                const rotation = mounted ? rotations[letterIndex] : 'rotate(0deg)';

                letterIndex++;

                return (
                    <span
                        key={index}
                        className="ransom-letter"
                        style={{
                            ...style,
                            transform: rotation,
                        }}
                    >
                        {letter}
                    </span>
                );
            })}
        </div>
    );
}
