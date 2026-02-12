import { headers } from 'next/headers';

export default function JsonLd() {
    // Force dynamic rendering to ensure headers are available if needed,
    // though for static site generation this might just be static.
    // The key is it returns a simple script tag.

    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': 'https://ezazshaikh.vercel.app/#person',
                name: 'Ezaz Shaikh',
                url: 'https://ezazshaikh.vercel.app',
                image: {
                    '@type': 'ImageObject',
                    url: 'https://ezazshaikh.vercel.app/og.webp',
                    width: 1200,
                    height: 630,
                    caption: 'Ezaz Shaikh | Gameplay & Systems Designer'
                },
                description: 'Ezaz Shaikh is a Gameplay & Systems Designer focused on clarity, who understands systems, aesthetics, UX, and player psychology.',
                jobTitle: 'Gameplay & Systems Designer',
                sameAs: [
                    'https://www.linkedin.com/in/ezazxshaikh/'
                ]
            },
            {
                '@type': 'WebSite',
                '@id': 'https://ezazshaikh.vercel.app/#website',
                url: 'https://ezazshaikh.vercel.app',
                name: 'Ezaz Shaikh Portfolio',
                description: 'Portfolio of Ezaz Shaikh, A Gameplay & Systems Designer',
                publisher: {
                    '@id': 'https://ezazshaikh.vercel.app/#person'
                },
                inLanguage: 'en-US'
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            id="json-ld-data"
        />
    );
}
