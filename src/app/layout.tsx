import type { Metadata } from "next";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OverlayEffects from "@/components/OverlayEffects";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
    title: "Ezaz Shaikh | Gameplay & Systems Designer",
    description:
        "Portfolio of Ezaz Shaikh, A Gameplay & Systems Designer focused on clarity, who understands systems, aesthetics, UX, and player psychology.",
    keywords: [
        "Ezaz Shaikh",
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
        title: "Ezaz Shaikh | Gameplay & Systems Designer",
        description: "Designing systems that feel good to play, not just good on paper.",
        type: "website",
        images: [
            {
                url: "/og.webp",
                width: 1200,
                height: 630,
                alt: "Ezaz Shaikh | Gameplay & Systems Designer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ezaz Shaikh | Gameplay & Systems Designer",
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            name: 'Ezaz Shaikh',
                            url: 'https://ezazshaikh.vercel.app',
                            jobTitle: 'Gameplay & Systems Designer',
                            sameAs: [
                                'https://www.linkedin.com/in/ezazxshaikh/',
                            ]
                        })
                    }}
                />
            </body >
        </html >
    );
}
