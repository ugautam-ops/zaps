import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Simon Says - Pattern Memory Game',
    description: 'Play the classic Simon Says memory game! Test your pattern recognition and sequential memory by repeating color sequences of increasing difficulty.',
    keywords: [
        'simon says game',
        'pattern memory game',
        'sequence memory test',
        'color memory game',
        'simon game online',
        'memory sequence game',
        'brain training game',
    ],
    openGraph: {
        title: 'Simon Says - Pattern Memory Game | Zap Mind',
        description: 'Challenge your memory with the classic Simon Says game. Repeat color patterns of increasing difficulty!',
        url: 'https://zapmind.org/games/simon-says',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Simon Says Game - Zap Mind' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Simon Says - Test Your Pattern Memory',
        description: 'How long can you remember the sequence? Play Simon Says!',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games/simon-says',
    },
};

const simonSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Simon Says',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '10540' },
    description: 'Classic Simon Says pattern memory game to test and improve sequential memory.',
};

export default function SimonSaysLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(simonSchema) }} />
            {children}
        </>
    );
}
