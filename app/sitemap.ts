import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://zapmind.org';
    const currentDate = new Date().toISOString();

    // Game routes
    const games = [
        'reaction',
        'aim-trainer',
        'nback-test',
        'simon-says',
        'colorblind-test',
        'visual-memory',
        'typing-test',
        'number-memory',
        'precision-click',
    ];

    const gameRoutes = games.map((game) => ({
        url: `${baseUrl}/games/${game}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [
        // Homepage
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        // All games page
        {
            url: `${baseUrl}/games`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Individual games
        ...gameRoutes,
        // Static pages
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/leaderboard`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/stats`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.6,
        },
    ];
}
