import { Inter } from 'next/font/google';
import './globals.css';
import ClientCookieWrapper from './ClientCookieWrapper';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'Zap Mind - Test Your Cognitive Abilities',
  description: 'Measure your reaction time, memory, typing speed, and more with fun interactive tests.',
  metadataBase: new URL('https://zapmind.org'),
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
      </head>
      <body className={inter.className}>
        {children}

        {/* Cookie consent loaded only on client */}
        <ClientCookieWrapper />
      </body>
    </html>
  );
}
