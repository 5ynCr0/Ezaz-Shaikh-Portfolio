"use client";

export default function OverlayEffects() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
            {/* Scanlines */}
            <div className="overlay-scanlines" />

            {/* Glitch sweep bar */}
            <div className="overlay-glitch-bar" />

            {/* Glitch shift */}
            <div className="overlay-glitch-shift" />

            {/* Vignette */}
            <div className="overlay-vignette" />
        </div>
    );
}

