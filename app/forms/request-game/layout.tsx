import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Request a New Game',
    description: 'Suggest a new cognitive test or brain game for Zap Mind. We love hearing ideas from our community!',
    openGraph: {
        title: 'Request a New Game | Zap Mind',
        description: 'Suggest a new brain game or cognitive test.',
        url: 'https://zapmind.org/forms/request-game',
        type: 'website',
    },
    alternates: {
        canonical: 'https://zapmind.org/forms/request-game',
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function RequestGameLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
