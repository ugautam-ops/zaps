import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reaction Time Test - Free Online Reflexes Test',
    description: 'Test your reaction time with our free online reflexes test. Measure how quickly you respond to visual stimuli. Average human reaction time is 200-300ms. Practice to improve your reflexes!',
    keywords: [
        'reaction time test',
        'reflexes test',
        'reaction speed test',
        'how fast are my reflexes',
        'measure reaction time',
        'reaction time game',
        'reflex test online',
        'click speed test',
    ],
    openGraph: {
        title: 'Reaction Time Test - Free Online Reflexes Test | Zap Mind',
        description: 'Test how fast your reflexes are! Measure your reaction time in milliseconds. Average human reaction time: 200-300ms.',
        url: 'https://zapmind.org/games/reaction',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Reaction Time Test - Zap Mind',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Reaction Time Test - Test Your Reflexes',
        description: 'How fast are your reflexes? Test your reaction time now!',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games/reaction',
    },
};

const reactionGameSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Reaction Time Test',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '15420',
    },
    description: 'Test your reaction time with our free online reflexes test. Measure how quickly you respond to visual stimuli.',
};

export default function ReactionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reactionGameSchema) }}
            />
            {children}
        </>
    );
}
