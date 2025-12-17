// ============================================
// FILE: app/page.tsx
// ============================================
import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Zap Mind - Cognitive Test & Brain Games | Reaction Time, Memory Tests',
  description: 'Exercise and improve your memory, reaction time, typing speed, multitasking abilities and more with free and online brain games and cognitive tests.',
  keywords: [
    'cognitive test',
    'brain games',
    'reaction time test',
    'memory test',
    'typing speed test',
    'free brain games',
    'online cognitive test',
    'brain training',
  ],
  openGraph: {
    title: 'Zap Mind - Free Cognitive Tests & Brain Games',
    description: 'Test your cognitive abilities with 9+ free brain games. Join 2.6M+ players worldwide.',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
