import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Visual Memory Test - Pattern Recall Game',
    description: 'Test and improve your visual memory with our pattern recall game. Remember and reproduce increasingly complex tile patterns to measure your visual memory capacity.',
    keywords: [
        'visual memory test',
        'pattern memory game',
        'visual recall test',
        'memory grid game',
        'tile memory test',
        'spatial memory test',
        'visual memory training',
    ],
    openGraph: {
        title: 'Visual Memory Test - Pattern Recall Game | Zap Mind',
        description: 'Challenge your visual memory! Remember and reproduce tile patterns of increasing complexity.',
        url: 'https://zapmind.org/games/visual-memory',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Visual Memory Test - Zap Mind' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Visual Memory Test - How Good Is Your Memory?',
        description: 'Test your visual memory with increasingly complex patterns!',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games/visual-memory',
    },
};

const visualMemorySchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Visual Memory Test',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', ratingCount: '9870' },
    description: 'Pattern recall game to test and improve your visual memory capacity.',
};

export default function VisualMemoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(visualMemorySchema) }} />
            {children}
        </>
    );
}
