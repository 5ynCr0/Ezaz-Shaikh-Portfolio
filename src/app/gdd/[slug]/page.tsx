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
        <main className="min-h-screen pt-24 pb-16 bg-ink-light text-cream">
            <div className="container mx-auto px-8 max-w-4xl">
                {/* Back Link */}


                {/* Header */}
                <span className="font-display text-crimson text-lg block">
                    {doc.category}
                </span>
                <h1 className="font-display text-5xl md:text-6xl text-cream mt-2 mb-6">
                    {doc.title}
                </h1>
                <div className="w-24 h-1 bg-crimson mb-8" />

                {/* Content */}
                <div className="prose prose-lg max-w-none prose-invert">
                    <p className="text-cream/80 text-xl mb-6 leading-relaxed">
                        {doc.description}
                    </p>

                    <div className="bg-ink p-8 border-l-4 border-crimson mb-8">
                        <h2 className="font-display text-2xl text-crimson mb-4 mt-0">
                            DOCUMENT PREVIEW
                        </h2>
                        <p className="text-cream/70">
                            {doc.preview}
                        </p>
                    </div>

                    {/* PDF Embed */}
                    {doc.pdfUrl && (
                        <div className="mt-8 border-2 border-cream/20 shadow-lg">
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
