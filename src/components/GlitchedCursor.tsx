"use client";

import { useEffect, useRef, useState } from "react";

// ─── Palette ─────────────────────────────────────────────────────────────────
const CRIMSON = "#E73A3A";
const ELECTRIC = "#00D4FF";
const CREAM = "#FAF7F0";
const INK = "#0D0D0D";

// ─── Types ───────────────────────────────────────────────────────────────────
type CursorState = "idle" | "moving" | "clicking" | "holding";

interface TrailPt { x: number; y: number; age: number; vx: number; vy: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string; }

// ─── Helpers ─────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function drawBrokenOutline(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number,
    size: number,
    color: string,
    alpha: number,
    jitter: number,
    noise: number[],
    missing: boolean[],
    rotation: number,
    lineWidth = 1.8,
) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    const verts = [
        { x: noise[0] * jitter, y: -size + noise[1] * jitter },
        { x: size + noise[2] * jitter, y: noise[3] * jitter },
        { x: noise[4] * jitter, y: size + noise[5] * jitter },
        { x: -size + noise[6] * jitter, y: noise[7] * jitter },
    ];

    for (let i = 0; i < 4; i++) {
        if (missing[i]) continue;
        const a = verts[i];
        const b = verts[(i + 1) % 4];

        if (jitter > 2 && Math.random() < 0.07) {
            const t = 0.3 + Math.random() * 0.4;
            const mx = lerp(a.x, b.x, t) + (Math.random() - 0.5) * jitter * 0.8;
            const my = lerp(a.y, b.y, t) + (Math.random() - 0.5) * jitter * 0.8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(mx + (Math.random() - 0.5) * jitter, my + (Math.random() - 0.5) * jitter);
            ctx.lineTo(b.x, b.y); ctx.stroke();
        } else {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
    }
    ctx.restore();
}

function drawRGBDiamond(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number,
    size: number,
    alpha: number,
    jitter: number,
    noise: number[],
    missing: boolean[],
    rotation: number,
    rgbOff: { x: number; y: number },
) {
    drawBrokenOutline(ctx, cx + rgbOff.x, cy + rgbOff.y, size, "rgba(231,58,58,0.85)", alpha * 0.75, jitter, noise, missing, rotation);
    drawBrokenOutline(ctx, cx - rgbOff.x * 0.7, cy, size, "rgba(0,212,255,0.85)", alpha * 0.75, jitter, noise, missing, rotation + 0.06);
    drawBrokenOutline(ctx, cx, cy, size, "rgba(250,247,240,0.95)", alpha, jitter, noise, missing, rotation, 2.2);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function GlitchedCursor() {
    // Only render on devices with a fine pointer (mouse). Skips touch / mobile.
    const [hasMouse, setHasMouse] = useState(false);
    useEffect(() => {
        setHasMouse(window.matchMedia("(pointer: fine)").matches);
    }, []);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -400, y: -400 });
    const prevMouse = useRef({ x: -400, y: -400 });
    const isVisible = useRef(false);

    const cursorState = useRef<CursorState>("idle");
    const idleTimer = useRef(0);
    const isDown = useRef(false);
    const holdDur = useRef(0);
    const clickProg = useRef(0);

    const trail = useRef<TrailPt[]>([]);
    const particles = useRef<Particle[]>([]);

    const glitchI = useRef(0);
    const glitchTgt = useRef(0);
    const rgbOff = useRef({ x: 0, y: 0 });
    const missing = useRef<boolean[]>([false, false, false, false]);
    const vNoise = useRef<number[]>(Array(8).fill(0));
    const vNoiseTgt = useRef<number[]>(Array(8).fill(0));
    const glitchFlash = useRef(0);

    const raf = useRef(0);
    const frame = useRef(0);
    const rotation = useRef(0);

    useEffect(() => {
        if (!hasMouse) return;

        const canvas = canvasRef.current as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!ctx) return;

        // ── Resize ──────────────────────────────────────────────────────────
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // ── Events ──────────────────────────────────────────────────────────
        const onMove = (e: MouseEvent) => {
            prevMouse.current = { ...mouse.current };
            mouse.current = { x: e.clientX, y: e.clientY };
            isVisible.current = true;
            idleTimer.current = 0;
        };
        const onLeave = () => { isVisible.current = false; };
        const onDown = () => {
            isDown.current = true;
            holdDur.current = 0;
            clickProg.current = 0;
            spawnBurst(mouse.current.x, mouse.current.y, 10);
        };
        const onUp = () => { isDown.current = false; holdDur.current = 0; };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", onLeave);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);

        // ── Particle helpers ─────────────────────────────────────────────────
        function spawnBurst(x: number, y: number, count: number) {
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
                const spd = 2.5 + Math.random() * 5;
                particles.current.push({
                    x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
                    life: 1, maxLife: 18 + Math.random() * 20, size: 2 + Math.random() * 3,
                    color: Math.random() > 0.5 ? CRIMSON : ELECTRIC
                });
            }
        }
        function spawnIdleParticle(x: number, y: number) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 8 + Math.random() * 20;
            particles.current.push({
                x: x + Math.cos(angle) * dist, y: y + Math.sin(angle) * dist,
                vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
                life: 1, maxLife: 20 + Math.random() * 25, size: 1 + Math.random() * 1.5,
                color: Math.random() > 0.6 ? CRIMSON : ELECTRIC
            });
        }

        // ── Main loop ────────────────────────────────────────────────────────
        function animate() {
            if (document.hidden) { raf.current = requestAnimationFrame(animate); return; }
            frame.current++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!isVisible.current) { raf.current = requestAnimationFrame(animate); return; }

            const { x, y } = mouse.current;
            const dx = x - prevMouse.current.x;
            const dy = y - prevMouse.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // ── State machine ─────────────────────────────────────────────
            if (isDown.current) {
                holdDur.current++;
                cursorState.current = holdDur.current > 18 ? "holding" : "clicking";
                clickProg.current = Math.min(1, clickProg.current + 0.07);
            } else {
                if (speed > 1.5) {
                    idleTimer.current = 0;
                    cursorState.current = "moving";
                } else {
                    idleTimer.current++;
                    if (idleTimer.current > 45) cursorState.current = "idle";
                }
                clickProg.current = Math.max(0, clickProg.current - 0.04);
            }
            const st = cursorState.current;

            // ── Glitch intensity ──────────────────────────────────────────
            if (st === "idle") {
                if (Math.random() < 0.02) glitchTgt.current = 0.5 + Math.random() * 0.5;
                else if (Math.random() < 0.04) glitchTgt.current = Math.max(0.1, glitchTgt.current - 0.2);
            } else if (st === "moving") { glitchTgt.current = 0.15 + Math.min(speed * 0.02, 0.4); }
            else if (st === "clicking") { glitchTgt.current = 0.7 + Math.random() * 0.3; }
            else if (st === "holding") { glitchTgt.current = 0.9; }

            glitchI.current += (glitchTgt.current - glitchI.current) * 0.14;
            const gi = glitchI.current;

            // ── RGB offset ────────────────────────────────────────────────
            rgbOff.current.x += ((gi > 0.25 ? (Math.random() - 0.5) * gi * 16 : 0) - rgbOff.current.x) * 0.25;
            rgbOff.current.y += ((gi > 0.25 ? (Math.random() - 0.5) * gi * 5 : 0) - rgbOff.current.y) * 0.25;

            // ── Missing segments ──────────────────────────────────────────
            if (Math.random() < 0.05 * gi) {
                missing.current = [Math.random() < gi * 0.45, Math.random() < gi * 0.35, Math.random() < gi * 0.45, Math.random() < gi * 0.35];
            } else if (Math.random() < 0.12) {
                missing.current = [false, false, false, false];
            }

            // ── Vertex noise ──────────────────────────────────────────────
            for (let i = 0; i < 8; i++) {
                if (Math.random() < 0.07) vNoiseTgt.current[i] = (Math.random() - 0.5) * 2 * (1 + gi * 2.5);
                vNoise.current[i] += (vNoiseTgt.current[i] - vNoise.current[i]) * 0.1;
            }
            const jitter = gi * 4.5 + 0.5;

            // ── Cursor size & rotation ────────────────────────────────────
            let baseSize: number;
            if (st === "idle") baseSize = 10 + Math.sin(frame.current * 0.045) * 2.5;
            else if (st === "moving") baseSize = 10 + Math.min(speed * 0.25, 5);
            else if (st === "clicking") baseSize = 10 + clickProg.current * 7;
            else baseSize = 14 + Math.sin(frame.current * 0.18) * 4.5;

            const rotSpeed = st === "holding" ? 0.12 : st === "clicking" ? 0.07 : st === "moving" ? 0.045 + speed * 0.001 : 0.012;
            rotation.current += rotSpeed;
            if (gi > 0.65 && Math.random() < 0.1) rotation.current += (Math.random() - 0.5) * 0.5;
            const rot = rotation.current;

            // ── Trail ─────────────────────────────────────────────────────
            if (speed > 0.5 || st !== "idle") trail.current.push({ x, y, age: 0, vx: dx, vy: dy });
            const maxTrail = st === "moving" ? 35 : st === "holding" ? 20 : 12;
            trail.current = trail.current.map(p => ({ ...p, age: p.age + 1 })).filter(p => p.age < 35);
            if (trail.current.length > maxTrail) trail.current = trail.current.slice(-maxTrail);

            trail.current.forEach((pt, i) => {
                const progress = (i + 1) / trail.current.length;
                const ageFade = 1 - pt.age / 35;
                const alpha = progress * ageFade * (st === "moving" ? 0.85 : 0.45);
                const tSize = baseSize * progress * 0.68;
                const tRot = rot - i * 0.07;
                const tGi = gi * progress;
                const r = Math.floor(231 + (0 - 231) * progress);
                const g = Math.floor(58 + (212 - 58) * progress);
                const b = Math.floor(58 + (255 - 58) * progress);
                const tMissing = [Math.random() < tGi * 0.5, Math.random() < tGi * 0.4, Math.random() < tGi * 0.5, Math.random() < tGi * 0.4];

                if (tGi > 0.35 && i % 4 === 0) {
                    const gOff = (Math.random() - 0.5) * tGi * 14;
                    ctx.save();
                    ctx.lineWidth = 1.5;
                    ctx.globalAlpha = alpha * 0.6;
                    ctx.strokeStyle = CRIMSON;
                    ctx.beginPath(); ctx.moveTo(pt.x + gOff, pt.y - tSize); ctx.lineTo(pt.x + tSize + gOff, pt.y); ctx.lineTo(pt.x + gOff, pt.y + tSize); ctx.lineTo(pt.x - tSize + gOff, pt.y); ctx.closePath(); ctx.stroke();
                    ctx.strokeStyle = ELECTRIC;
                    ctx.globalAlpha = alpha * 0.5;
                    ctx.beginPath(); ctx.moveTo(pt.x - gOff * 0.5, pt.y - tSize); ctx.lineTo(pt.x + tSize - gOff * 0.5, pt.y); ctx.lineTo(pt.x - gOff * 0.5, pt.y + tSize); ctx.lineTo(pt.x - tSize - gOff * 0.5, pt.y); ctx.closePath(); ctx.stroke();
                    ctx.restore();
                } else {
                    drawBrokenOutline(ctx, pt.x, pt.y, tSize, `rgb(${r},${g},${b})`, alpha, jitter * progress, vNoise.current, tMissing, tRot);
                }

                if (st === "moving" && i >= trail.current.length - 4) {
                    const ptSpd = Math.sqrt(pt.vx * pt.vx + pt.vy * pt.vy);
                    if (ptSpd > 2) {
                        ctx.save();
                        ctx.globalAlpha = 0.22 * progress * ageFade;
                        ctx.strokeStyle = ELECTRIC; ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(pt.x, pt.y); ctx.lineTo(pt.x - pt.vx * 4, pt.y - pt.vy * 4); ctx.stroke();
                        ctx.restore();
                    }
                }
            });

            // ── Idle FX ───────────────────────────────────────────────────
            if (st === "idle" && idleTimer.current > 55) {
                if (Math.random() < gi * 0.18) {
                    ctx.save();
                    ctx.globalAlpha = 0.5 * gi;
                    ctx.fillStyle = Math.random() > 0.5 ? CRIMSON : ELECTRIC;
                    ctx.fillRect(x - 22 + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 35, 44 + Math.random() * 18, 1.5);
                    ctx.restore();
                }
                if (Math.random() < 0.05) spawnIdleParticle(x, y);
            }

            // ── Click / Hold rings ────────────────────────────────────────
            if (clickProg.current > 0.01) {
                const ringR = baseSize + clickProg.current * 28;
                ctx.save();
                ctx.globalAlpha = (1 - clickProg.current) * (st === "clicking" ? 0.85 : 0.4);
                ctx.strokeStyle = CRIMSON; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.arc(x, y, ringR, 0, Math.PI * 2); ctx.stroke();
                ctx.globalAlpha = (1 - clickProg.current) * 0.5;
                ctx.strokeStyle = ELECTRIC; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(x + rgbOff.current.x, y, ringR * 0.88, 0, Math.PI * 2); ctx.stroke();
                ctx.restore();
            }

            if (st === "holding") {
                for (let k = 0; k < 2; k++) {
                    const age = ((frame.current + k * 12) % 22) / 22;
                    const ringR = 14 + age * 44;
                    ctx.save();
                    ctx.globalAlpha = (1 - age) * 0.65;
                    ctx.strokeStyle = k === 0 ? CRIMSON : ELECTRIC; ctx.lineWidth = 1.8;
                    ctx.beginPath(); ctx.arc(x, y, ringR, 0, Math.PI * 2); ctx.stroke();
                    ctx.restore();
                }
            }

            // ── Particles ─────────────────────────────────────────────────
            particles.current = particles.current.filter(p => p.life > 0);
            for (const p of particles.current) {
                p.x += p.vx; p.y += p.vy; p.vx *= 0.93; p.vy *= 0.93; p.life -= 1 / p.maxLife;
                ctx.save();
                ctx.globalAlpha = p.life * 0.85;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                ctx.restore();
            }

            // ── Main cursor ───────────────────────────────────────────────
            let cx = x, cy = y;
            if (gi > 0.7 && Math.random() < 0.12) {
                cx += (Math.random() - 0.5) * gi * 18;
                cy += (Math.random() - 0.5) * gi * 6;
            }

            ctx.save();
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = INK;
            ctx.translate(cx, cy); ctx.rotate(rot);
            const n = vNoise.current;
            ctx.beginPath();
            ctx.moveTo(n[0] * jitter, -baseSize + n[1] * jitter);
            ctx.lineTo(baseSize + n[2] * jitter, n[3] * jitter);
            ctx.lineTo(n[4] * jitter, baseSize + n[5] * jitter);
            ctx.lineTo(-baseSize + n[6] * jitter, n[7] * jitter);
            ctx.closePath(); ctx.fill();
            ctx.restore();

            drawRGBDiamond(ctx, cx, cy, baseSize, 1, jitter, vNoise.current, missing.current, rot, rgbOff.current);

            ctx.save();
            ctx.globalAlpha = 0.9; ctx.fillStyle = CRIMSON;
            ctx.beginPath(); ctx.arc(cx, cy, 2.5, 0, Math.PI * 2); ctx.fill();
            ctx.restore();

            // ── Glitch flash ──────────────────────────────────────────────
            if (Math.random() < 0.007) glitchFlash.current = 4;
            if (glitchFlash.current > 0) {
                glitchFlash.current--;
                const fAlpha = glitchFlash.current / 4;
                ctx.save();
                ctx.globalAlpha = 0.18 * fAlpha;
                ctx.fillStyle = CRIMSON; ctx.fillRect(x - 35, y - 3, 70, 5);
                ctx.fillStyle = ELECTRIC; ctx.fillRect(x - 28, y + 3, 56, 2);
                ctx.fillStyle = CREAM; ctx.fillRect(x - 40, y - 1, 80, 1);
                ctx.restore();
            }

            raf.current = requestAnimationFrame(animate);
        }

        raf.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(raf.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
        };
    }, [hasMouse]);  // re-run only when hasMouse resolves

    if (!hasMouse) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
        />
    );
}
