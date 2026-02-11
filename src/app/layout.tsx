import type { Metadata } from "next";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OverlayEffects from "@/components/OverlayEffects";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
    title: "Ezaz | Gameplay & Systems Designer",
    description:
        "Portfolio of Ezaz, A Gameplay & Systems Designer focused on clarity, who understands systems, aesthetics, UX, and player psychology.",
    keywords: [
        "Ezaz",
        "gameplay designer",
        "systems designer",
        "game designer",
        "level design",
        "UX design",
        "Unity",
        "mobile games",
        "casual games",
        "pc games",
        "game design portfolio",
        "progression design",
    ],
    authors: [{ name: "Ezaz" }],
    openGraph: {
        title: "Ezaz | Gameplay & Systems Designer",
        description: "Designing systems that feel good to play, not just good on paper.",
        type: "website",
        images: [
            {
                url: "/og.webp",
                width: 1200,
                height: 630,
                alt: "Ezaz | Gameplay & Systems Designer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ezaz | Gameplay & Systems Designer",
        description: "Designing systems that feel good to play, not just good on paper.",
        images: ["/og.webp"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-ink text-cream overflow-x-hidden">
                <OverlayEffects />
                <Navigation />
                {children}
                <Footer />
                <Analytics />
                <SpeedInsights />
            </body >
        </html >
    );
}
