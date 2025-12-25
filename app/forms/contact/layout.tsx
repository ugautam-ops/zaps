import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Contact the Zap Mind team for support, feedback, or inquiries about our cognitive tests and brain games.',
    openGraph: {
        title: 'Contact Us | Zap Mind',
        description: 'Get in touch with the Zap Mind team.',
        url: 'https://zapmind.org/forms/contact',
        type: 'website',
    },
    alternates: {
        canonical: 'https://zapmind.org/forms/contact',
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
