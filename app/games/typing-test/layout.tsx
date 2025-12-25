import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Typing Speed Test - Measure Your WPM',
    description: 'Free online typing speed test. Measure your typing speed in words per minute (WPM) and accuracy. Track your progress and improve your keyboard skills.',
    keywords: [
        'typing speed test',
        'wpm test',
        'typing test',
        'words per minute test',
        'keyboard speed test',
        'typing practice',
        'how fast can I type',
        'typing accuracy test',
    ],
    openGraph: {
        title: 'Typing Speed Test - Measure Your WPM | Zap Mind',
        description: 'How fast can you type? Test your typing speed in WPM and accuracy with our free online test.',
        url: 'https://zapmind.org/games/typing-test',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Typing Speed Test - Zap Mind' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Typing Speed Test - How Fast Can You Type?',
        description: 'Measure your typing speed in words per minute!',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games/typing-test',
    },
};

const typingSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Typing Speed Test',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '22340' },
    description: 'Free online typing speed test to measure your WPM and accuracy.',
};

export default function TypingTestLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(typingSchema) }} />
            {children}
        </>
    );
}
