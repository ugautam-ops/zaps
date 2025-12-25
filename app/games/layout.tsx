import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Cognitive Tests & Brain Games',
    description: 'Explore all our free cognitive tests and brain training games. Reaction time, memory tests, typing speed, aim training, and more. Track your progress and improve your mental performance.',
    keywords: [
        'brain games',
        'cognitive tests',
        'free brain training',
        'memory games',
        'reaction time games',
        'online brain games',
        'mental training',
        'cognitive assessment',
    ],
    openGraph: {
        title: 'All Cognitive Tests & Brain Games | Zap Mind',
        description: 'Explore 9+ free cognitive tests and brain training games. Challenge yourself and track your progress!',
        url: 'https://zapmind.org/games',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Zap Mind Games' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'All Cognitive Tests & Brain Games',
        description: 'Explore 9+ free brain games and cognitive tests!',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://zapmind.org/games',
    },
};

const gamesListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Cognitive Tests & Brain Games',
    description: 'Collection of free cognitive tests and brain training games',
    url: 'https://zapmind.org/games',
    mainEntity: {
        '@type': 'ItemList',
        numberOfItems: 9,
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Reaction Time Test', url: 'https://zapmind.org/games/reaction' },
            { '@type': 'ListItem', position: 2, name: 'Aim Trainer', url: 'https://zapmind.org/games/aim-trainer' },
            { '@type': 'ListItem', position: 3, name: 'N-Back Memory Test', url: 'https://zapmind.org/games/nback-test' },
            { '@type': 'ListItem', position: 4, name: 'Simon Says', url: 'https://zapmind.org/games/simon-says' },
            { '@type': 'ListItem', position: 5, name: 'Color Vision Test', url: 'https://zapmind.org/games/colorblind-test' },
            { '@type': 'ListItem', position: 6, name: 'Visual Memory Test', url: 'https://zapmind.org/games/visual-memory' },
            { '@type': 'ListItem', position: 7, name: 'Typing Speed Test', url: 'https://zapmind.org/games/typing-test' },
            { '@type': 'ListItem', position: 8, name: 'Number Memory Test', url: 'https://zapmind.org/games/number-memory' },
            { '@type': 'ListItem', position: 9, name: 'Precision Click Challenge', url: 'https://zapmind.org/games/precision-click' },
        ],
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zapmind.org' },
        { '@type': 'ListItem', position: 2, name: 'Games', item: 'https://zapmind.org/games' },
    ],
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gamesListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {children}
        </>
    );
}
