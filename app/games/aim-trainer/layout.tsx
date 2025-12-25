import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Aim Trainer - Improve Mouse Accuracy & Precision',
    description: 'Free online aim trainer to improve your mouse accuracy and precision. Perfect for gamers looking to enhance hand-eye coordination and clicking speed.',
    keywords: [
        'aim trainer',
        'aim practice',
        'mouse accuracy test',
        'aim training',
        'click accuracy',
        'gaming aim trainer',
        'mouse precision test',
        'fps aim trainer',
    ],
    openGraph: {
        title: 'Aim Trainer - Improve Mouse Accuracy | Zap Mind',
        description: 'Train your aim and improve mouse precision with our free online aim trainer. Perfect for FPS gamers!',
        url: 'https://zapmind.org/games/aim-trainer',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Aim Trainer - Zap Mind' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Aim Trainer - Improve Your Accuracy',
        description: 'Train your mouse aim and precision for better gaming performance!',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games/aim-trainer',
    },
};

const aimGameSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Aim Trainer',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '12350' },
    description: 'Free online aim trainer to improve your mouse accuracy and precision for gaming.',
};

export default function AimTrainerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aimGameSchema) }} />
            {children}
        </>
    );
}
