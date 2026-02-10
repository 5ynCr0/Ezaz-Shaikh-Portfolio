'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TornRevealProps {
    imageSrc: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

/**
 * Persona 5-style torn paper reveal.
 * Uses HTML Canvas to draw organic, fibrous torn-paper edges
 * around an image — like the screen is being ripped apart.
 */
export default function TornReveal({
    imageSrc,
    alt = '',
    width = 500,
    height = 600,
    className = '',
}: TornRevealProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;

        img.onload = () => {
            canvas.width = width * 2; // 2x for retina
            canvas.height = height * 2;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(2, 2);

            drawTornReveal(ctx, img, width, height);
            setLoaded(true);

            // GSAP entrance animation
            if (containerRef.current) {
                gsap.fromTo(
                    containerRef.current,
                    { opacity: 0, scale: 1.08, x: 30 },
                    {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        duration: 0.7,
                        delay: 0.5,
                        ease: 'power3.out',
                    }
                );
            }
        };
    }, [imageSrc, width, height]);

    return (
        <div
            ref={containerRef}
            className={`torn-reveal-canvas-wrapper ${className}`}
            style={{ opacity: 0, width, height }}
        >
            <canvas ref={canvasRef} />
        </div>
    );
}

// ─── DRAWING ENGINE ────────────────────────────────────────

function drawTornReveal(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number
) {
    // Inset from edges — the tear sits inside this margin
    const margin = 28;
    const tearWidth = 18; // thickness of the white torn paper border
    const crimsonWidth = 6; // crimson accent strip width

    // Generate organic tear path points for all 4 edges
    const tearPath = generateTearPath(w, h, margin);

    // 1. Draw outer shadow/glow
    ctx.save();
    ctx.shadowColor = 'rgba(231, 58, 58, 0.4)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    drawPath(ctx, tearPath);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
    ctx.fill();
    ctx.restore();

    // 2. Draw the white torn paper border (outer edge)
    ctx.save();
    const outerTearPath = generateTearPath(w, h, margin - tearWidth);
    drawPath(ctx, outerTearPath);
    ctx.fillStyle = '#FAF7F0';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fill();
    ctx.restore();

    // 3. Draw crimson accent strip
    ctx.save();
    const crimsonPath = generateTearPath(w, h, margin - tearWidth + crimsonWidth);
    drawPath(ctx, crimsonPath);
    ctx.fillStyle = '#E73A3A';
    ctx.fill();
    ctx.restore();

    // 4. Draw the image clipped to the inner tear shape
    ctx.save();
    drawPath(ctx, tearPath);
    ctx.clip();

    // Draw image covering the clipped area
    const imgAspect = img.width / img.height;
    const canvasAspect = w / h;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgAspect > canvasAspect) {
        drawH = h;
        drawW = h * imgAspect;
        drawX = (w - drawW) / 2;
        drawY = 0;
    } else {
        drawW = w;
        drawH = w / imgAspect;
        drawX = 0;
        drawY = (h - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Add subtle vignette/shadow at torn edges
    const gradient = ctx.createRadialGradient(
        w / 2, h / 2, Math.min(w, h) * 0.25,
        w / 2, h / 2, Math.max(w, h) * 0.55
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();

    // 5. Draw torn paper fiber details along edges
    drawPaperFibers(ctx, tearPath, tearWidth);
}

/**
 * Generates an organic tear path with jagged, irregular edges.
 * Uses random displacement for that ripped-paper feel.
 */
function generateTearPath(
    w: number,
    h: number,
    margin: number
): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const segLen = 6; // length of each segment — smaller = more detailed

    // Seed for consistent randomness per edge
    const rand = seededRandom(42);

    // Top edge (left to right)
    for (let x = margin; x <= w - margin; x += segLen) {
        const jitter = (rand() - 0.5) * 16;
        const spike = rand() < 0.15 ? (rand() - 0.5) * 28 : 0;
        points.push({ x, y: margin + jitter + spike });
    }

    // Right edge (top to bottom)
    for (let y = margin; y <= h - margin; y += segLen) {
        const jitter = (rand() - 0.5) * 16;
        const spike = rand() < 0.15 ? (rand() - 0.5) * 28 : 0;
        points.push({ x: w - margin + jitter + spike, y });
    }

    // Bottom edge (right to left)
    for (let x = w - margin; x >= margin; x -= segLen) {
        const jitter = (rand() - 0.5) * 16;
        const spike = rand() < 0.15 ? (rand() - 0.5) * 28 : 0;
        points.push({ x, y: h - margin + jitter + spike });
    }

    // Left edge (bottom to top)
    for (let y = h - margin; y >= margin; y -= segLen) {
        const jitter = (rand() - 0.5) * 16;
        const spike = rand() < 0.15 ? (rand() - 0.5) * 28 : 0;
        points.push({ x: margin + jitter + spike, y });
    }

    return points;
}

/** Draws a path from an array of points using quadratic curves for smoothness */
function drawPath(ctx: CanvasRenderingContext2D, points: { x: number; y: number }[]) {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
        const cpx = (points[i].x + points[i + 1].x) / 2;
        const cpy = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cpx, cpy);
    }

    // Close back to start
    const last = points[points.length - 1];
    ctx.quadraticCurveTo(last.x, last.y, points[0].x, points[0].y);
    ctx.closePath();
}

/** Draws small paper fiber lines along the tear edges */
function drawPaperFibers(
    ctx: CanvasRenderingContext2D,
    tearPath: { x: number; y: number }[],
    tearWidth: number
) {
    const rand = seededRandom(99);
    ctx.save();
    ctx.strokeStyle = 'rgba(250, 247, 240, 0.6)';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < tearPath.length; i += 3) {
        if (rand() > 0.4) continue; // only some points get fibers
        const p = tearPath[i];
        const fiberLen = rand() * tearWidth * 0.7;
        const angle = rand() * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(
            p.x + Math.cos(angle) * fiberLen,
            p.y + Math.sin(angle) * fiberLen
        );
        ctx.stroke();
    }
    ctx.restore();
}

/** Seeded pseudo-random number generator for consistent results */
function seededRandom(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return s / 2147483647;
    };
}
