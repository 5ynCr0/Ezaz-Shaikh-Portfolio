import type { Metadata } from "next";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OverlayEffects from "@/components/OverlayEffects";

export const metadata: Metadata = {
    title: "Ezaz | Full Stack Game Designer",
    description:
        "Portfolio of Ezaz — A Full Stack Game Designer who understands systems, aesthetics, UX, and player psychology.",
    keywords: ["game designer", "game development", "portfolio", "UX design", "game systems"],
    authors: [{ name: "Ezaz" }],
    openGraph: {
        title: "Ezaz | Full Stack Game Designer",
        description: "Designing systems that players feel, not just see.",
        type: "website",
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
            </body>
        </html>
    );
}
