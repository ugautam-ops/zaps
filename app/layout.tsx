import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientCookieWrapper from './ClientCookieWrapper';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7c3aed',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://zapmind.org'),
  title: {
    default: 'Zap Mind - Free Cognitive Tests & Brain Games',
    template: '%s | Zap Mind',
  },
  description: 'Test and improve your cognitive abilities with free online brain games. Measure reaction time, memory, typing speed, and more. Join 2.6M+ players worldwide.',
  keywords: [
    'cognitive test',
    'brain games',
    'reaction time test',
    'memory test',
    'typing speed test',
    'free brain games',
    'online cognitive test',
    'brain training',
    'mental fitness',
    'cognitive assessment',
  ],
  authors: [{ name: 'Zap Mind' }],
  creator: 'Zap Mind',
  publisher: 'Zap Mind',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zapmind.org',
    siteName: 'Zap Mind',
    title: 'Zap Mind - Free Cognitive Tests & Brain Games',
    description: 'Test and improve your cognitive abilities with free online brain games. Join 2.6M+ players worldwide.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zap Mind - Train Your Brain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zap Mind - Free Cognitive Tests & Brain Games',
    description: 'Test reaction time, memory, typing speed & more with free brain games.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://zapmind.org',
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://zapmind.org/#website',
      url: 'https://zapmind.org',
      name: 'Zap Mind',
      description: 'Free cognitive tests and brain training games',
      publisher: {
        '@id': 'https://zapmind.org/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://zapmind.org/games?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://zapmind.org/#organization',
      name: 'Zap Mind',
      url: 'https://zapmind.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zapmind.org/og-image.png',
        width: 1200,
        height: 630,
      },
      sameAs: [],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}

        {/* Cookie consent loaded only on client */}
        <ClientCookieWrapper />
      </body>
    </html>
  );
}
