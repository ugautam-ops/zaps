import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Precision Click Challenge - Timing Accuracy Game',
    description: 'Test your timing precision with the precision click challenge. Click at exactly the right moment to score points. Improve your hand-eye coordination and timing accuracy.',
    keywords: [
        'precision click game',
        'timing accuracy test',
        'click precision test',
        'timing game',
        'accuracy challenge',
        'hand eye coordination game',
        'precision timing',
    ],
    openGraph: {
        title: 'Precision Click Challenge - Timing Accuracy Game | Zap Mind',
        description: 'Can you click at exactly the right moment? Test your timing precision!',
        url: 'https://zapmind.org/games/precision-click',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Precision Click Challenge - Zap Mind' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Precision Click Challenge',
        description: 'Test your timing accuracy with the precision click challenge!',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games/precision-click',
    },
};

const precisionSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Precision Click Challenge',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', ratingCount: '7650' },
    description: 'Timing accuracy game to test and improve your precision clicking skills.',
};

export default function PrecisionClickLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(precisionSchema) }} />
            {children}
        </>
    );
}
