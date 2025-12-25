import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Number Memory Test - Digit Span Memory Game',
    description: 'Test your short-term memory with the number memory test. Remember sequences of digits that get progressively longer. How many numbers can you memorize?',
    keywords: [
        'number memory test',
        'digit span test',
        'number sequence memory',
        'short term memory test',
        'digit memory game',
        'how many numbers can I remember',
        'memory capacity test',
    ],
    openGraph: {
        title: 'Number Memory Test - Digit Span Game | Zap Mind',
        description: 'How many digits can you remember? Test your short-term memory with increasing number sequences.',
        url: 'https://zapmind.org/games/number-memory',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Number Memory Test - Zap Mind' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Number Memory Test - How Many Digits Can You Remember?',
        description: 'Test your digit span memory!',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games/number-memory',
    },
};

const numberMemorySchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Number Memory Test',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '11230' },
    description: 'Digit span memory test to measure your short-term memory capacity.',
};

export default function NumberMemoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(numberMemorySchema) }} />
            {children}
        </>
    );
}
