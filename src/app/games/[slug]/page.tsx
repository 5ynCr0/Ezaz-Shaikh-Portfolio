import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { games } from '@/lib/data';

interface GamePageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return games.map((game) => ({
        slug: game.slug,
    }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
    const game = games.find((g) => g.slug === params.slug);
    if (!game) {
        return {
            title: 'Game Not Found',
        };
    }
    return {
        title: `${game.title} | Ezaz Shaikh`,
        description: game.description,
        openGraph: {
            title: `${game.title} | Ezaz Shaikh`,
            description: game.description,
            images: game.screenshots.length > 0 ? [game.screenshots[0].image] : [],
        },
    };
}

export default function GamePage({ params }: GamePageProps) {
    const game = games.find((g) => g.slug === params.slug);

    if (!game) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-16 bg-ink-light">
            <div className="container mx-auto px-8 max-w-4xl">
                {/* Back Link */}


                {/* Game Info */}
                <div className="mb-8">
                    <span className="font-display text-crimson text-lg">
                        {game.studio} | {game.year}
                    </span>
                    <h1 className="font-display text-5xl md:text-6xl text-cream mt-2">
                        {game.title}
                    </h1>
                </div>

                {/* Platform & Role */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <div
                        className="bg-crimson px-4 py-2 border-2 border-ink"
                        style={{ transform: "skewX(-6deg)" }}
                    >
                        <span
                            className="font-display text-cream"
                            style={{ transform: "skewX(6deg)", display: "inline-block" }}
                        >
                            {game.platform}
                        </span>
                    </div>
                    <div
                        className="bg-cream px-4 py-2 border-2 border-ink"
                        style={{ transform: "skewX(-6deg)" }}
                    >
                        <span
                            className="font-display text-ink"
                            style={{ transform: "skewX(6deg)", display: "inline-block" }}
                        >
                            {game.role}
                        </span>
                    </div>
                    {game.storeUrl && (
                        <a
                            href={game.storeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-ink px-4 py-2 border-2 border-crimson hover:bg-crimson transition-colors"
                            style={{ transform: "skewX(-6deg)" }}
                        >
                            <span
                                className="font-display text-cream"
                                style={{ transform: "skewX(6deg)", display: "inline-block" }}
                            >
                                PLAY GAME
                            </span>
                        </a>
                    )}
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h2 className="font-display text-2xl text-crimson mb-4">
                        OVERVIEW
                    </h2>
                    <p className="text-cream/80 text-lg leading-relaxed">
                        {game.description}
                    </p>
                </div>

                {/* Trailer */}
                {game.youtubeId && (
                    <div className="mb-12">
                        <h2 className="font-display text-2xl text-crimson mb-4">
                            TRAILER
                        </h2>
                        <div className="aspect-video border-2 border-cream/20 overflow-hidden">
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${game.youtubeId}?modestbranding=1&rel=0&iv_load_policy=3&disablekb=0&fs=1`}
                                title={`${game.title} Trailer`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                {/* Contributions Tags */}
                <div className="mb-12">
                    <h2 className="font-display text-2xl text-crimson mb-4">
                        CONTRIBUTIONS
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {game.tags.map((tag) => (
                            <span key={tag} className="tag">
                                <span className="tag-text">{tag}</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tools */}
                <div className="mb-12">
                    <h2 className="font-display text-2xl text-crimson mb-4">
                        TOOLS USED
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {game.tools.map((tool) => (
                            <span
                                key={tool}
                                className="text-cream/60 font-display text-lg"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Key Design Decisions */}
                {game.keyDecisions && game.keyDecisions.length > 0 && (
                    <div className="mb-12">
                        <h2 className="font-display text-2xl text-crimson mb-4">
                            KEY DESIGN DECISIONS
                        </h2>
                        <div className="space-y-4">
                            {game.keyDecisions.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative bg-ink border-l-4 border-crimson p-6"
                                    style={{ transform: "skewX(-2deg)" }}
                                >
                                    <div style={{ transform: "skewX(2deg)" }}>
                                        <div className="flex items-start gap-3 mb-2">
                                            <span className="font-display text-crimson text-xl flex-shrink-0">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <p className="text-cream font-medium leading-tight text-lg">
                                                {item.decision}
                                            </p>
                                        </div>
                                        <div className="ml-9 flex items-start gap-2 mt-3">
                                            <span className="text-crimson/80 text-sm">↳</span>
                                            <p className="text-cream/60 text-base italic">
                                                {item.tradeoff}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Design Contributions */}
                {game.designContributions && game.designContributions.length > 0 && (
                    <div className="mb-12">
                        <h2 className="font-display text-2xl text-crimson mb-4">
                            DESIGN CONTRIBUTIONS
                        </h2>
                        <div className="space-y-3">
                            {game.designContributions.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative bg-ink border-l-4 border-crimson p-4"
                                    style={{ transform: "skewX(-2deg)" }}
                                >
                                    <div style={{ transform: "skewX(2deg)" }}>
                                        <div className="flex items-start gap-3">
                                            <span className="font-display text-crimson text-xl flex-shrink-0">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <p className="text-cream font-medium leading-tight">
                                                {item.contribution}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Screenshots */}
                {game.screenshots && game.screenshots.length > 0 && (
                    <div className="mb-12">
                        <h2 className="font-display text-2xl text-crimson mb-4">
                            SCREENSHOTS
                        </h2>
                        <div className="space-y-8">
                            {game.screenshots.map((screenshot, index) => (
                                <div key={index} className="group">
                                    <div
                                        className="relative aspect-video bg-ink-lighter border-2 border-cream/20 overflow-hidden mb-4 shadow-lg"
                                        style={{ transform: "skewX(-1deg)" }}
                                    >
                                        <Image
                                            src={screenshot.image}
                                            alt={screenshot.caption}
                                            fill
                                            className="object-cover"
                                            style={{ transform: "skewX(1deg)" }}
                                        />
                                    </div>
                                    <div className="flex items-start gap-3 pl-2 max-w-2xl mx-auto">
                                        <span className="text-crimson font-display text-lg flex-shrink-0">▸</span>
                                        <p className="text-cream/70 text-base leading-relaxed">
                                            {screenshot.caption}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
