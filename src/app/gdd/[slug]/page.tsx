import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documents } from '@/lib/data';

interface GDDPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return documents.map((doc) => ({
        slug: doc.slug,
    }));
}

export async function generateMetadata({ params }: GDDPageProps): Promise<Metadata> {
    const doc = documents.find((d) => d.slug === params.slug);
    if (!doc) {
        return {
            title: 'Document Not Found',
        };
    }
    return {
        title: `${doc.title} | Ezaz Shaikh`,
        description: doc.description,
        openGraph: {
            title: `${doc.title} | Ezaz Shaikh`,
            description: doc.description,
        },
    };
}

export default function GDDPage({ params }: GDDPageProps) {
    const doc = documents.find((d) => d.slug === params.slug);

    if (!doc) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-16 bg-cream text-ink">
            <div className="container mx-auto px-8 max-w-4xl">
                {/* Back Link */}
                <Link
                    href="/gdd"
                    className="inline-flex items-center gap-2 text-crimson font-display text-lg mb-8 hover:text-crimson-dark transition-colors"
                >
                    ← BACK TO DOCUMENTS
                </Link>

                {/* Header */}
                <span className="font-display text-crimson text-lg block">
                    {doc.category}
                </span>
                <h1 className="font-display text-5xl md:text-6xl text-ink mt-2 mb-6">
                    {doc.title}
                </h1>
                <div className="w-24 h-1 bg-crimson mb-8" />

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <p className="text-ink/80 text-xl mb-6 leading-relaxed">
                        {doc.description}
                    </p>

                    <div className="bg-ink/5 p-8 border-l-4 border-crimson mb-8">
                        <h2 className="font-display text-2xl text-crimson mb-4 mt-0">
                            DOCUMENT PREVIEW
                        </h2>
                        <p className="text-ink/70">
                            {doc.preview}
                        </p>
                    </div>

                    {/* PDF Embed */}
                    {doc.pdfUrl && (
                        <div className="mt-8 border-2 border-ink/20 shadow-lg">
                            <iframe
                                src={doc.pdfUrl}
                                className="w-full h-[80vh] min-h-[500px]"
                                title={doc.title}
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
