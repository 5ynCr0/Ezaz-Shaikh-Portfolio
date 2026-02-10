'use client';

import React, { useEffect, useRef, useMemo } from 'react';
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
 * - For 4+ letters: every group of 4 uses all 4 styles in a shuffled order.
 * - For < 4 letters: pick a random subset so no two letters share a style.
 */
function buildStyleMap(count: number) {
    if (count === 0) return [];

    if (count < 4) {
        // Pick `count` unique styles at random
        return shuffle(STYLES).slice(0, count);
    }

    // For 4+ letters, fill in groups of 4 (each group is a fresh shuffle)
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

    // Build the randomised style map once per mount
    const letterChars = text.replace(/ /g, '');
    const styleMap = useMemo(() => buildStyleMap(letterChars.length), [letterChars.length]);

    useEffect(() => {
        if (!animate || !containerRef.current) return;

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
    }, [animate, staggerDelay]);

    const getRandomRotation = () => {
        return `rotate(${Math.random() * 8 - 4}deg)`;
    };

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

                const style = styleMap[letterIndex];
                letterIndex++;
                const rotation = getRandomRotation();

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
