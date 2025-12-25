import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Color Vision Test - Color Blindness Test (Ishihara)',
    description: 'Free online color blindness test using Ishihara plates. Quickly check if you have color vision deficiency including red-green and blue-yellow color blindness.',
    keywords: [
        'color blindness test',
        'ishihara test',
        'color vision test',
        'red green color blind test',
        'am I color blind',
        'color deficiency test',
        'colorblind test online',
        'vision test',
    ],
    openGraph: {
        title: 'Color Vision Test - Free Ishihara Color Blindness Test | Zap Mind',
        description: 'Check your color vision with our free Ishihara-based color blindness test. Detect red-green and other color deficiencies.',
        url: 'https://zapmind.org/games/colorblind-test',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Color Vision Test - Zap Mind' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Color Blindness Test - Check Your Color Vision',
        description: 'Free Ishihara-based color vision test. Are you color blind?',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games/colorblind-test',
    },
};

const colorTestSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Color Vision Test',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '18750' },
    description: 'Free online Ishihara color blindness test to check for color vision deficiencies.',
};

export default function ColorBlindLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(colorTestSchema) }} />
            {children}
        </>
    );
}
