import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'N-Back Memory Test - Working Memory Training',
    description: 'Challenge your working memory with the N-Back test. This scientifically-validated cognitive test measures and improves your mental flexibility and memory capacity.',
    keywords: [
        'n-back test',
        'working memory test',
        'n-back memory game',
        'cognitive training',
        'brain training',
        'memory improvement',
        'dual n-back',
        'mental flexibility test',
    ],
    openGraph: {
        title: 'N-Back Memory Test - Train Your Working Memory | Zap Mind',
        description: 'Challenge and improve your working memory with the scientifically-validated N-Back test.',
        url: 'https://zapmind.org/games/nback-test',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'N-Back Memory Test - Zap Mind' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'N-Back Memory Test - Brain Training',
        description: 'Train your working memory with this scientifically-validated cognitive test!',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games/nback-test',
    },
};

const nbackSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'N-Back Memory Test',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', ratingCount: '8920' },
    description: 'Scientifically-validated N-Back test for working memory training and cognitive improvement.',
};

export default function NBackLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nbackSchema) }} />
            {children}
        </>
    );
}
