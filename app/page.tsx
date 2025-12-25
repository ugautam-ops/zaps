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
    url: 'https://zapmind.org',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Zap Mind - Train Your Brain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zap Mind - Free Cognitive Tests & Brain Games',
    description: 'Test your cognitive abilities with 9+ free brain games.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://zapmind.org',
  },
};

// FAQPage structured data for the homepage FAQ section
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a cognitive test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cognitive test is an assessment that measures various mental abilities including memory, reaction time, problem-solving, and processing speed. Our free online cognitive tests help you understand your mental strengths and identify areas for improvement through interactive brain games.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I improve my reaction time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can improve your reaction time through regular practice with our reaction time test. Stay focused, get adequate sleep, reduce distractions, and practice consistently. Many users see improvement within just a few weeks of daily training.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good typing speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The average typing speed is around 40 words per minute (WPM). Professional typists typically achieve 65-75 WPM, while advanced users can reach 90+ WPM. Use our free typing speed test to measure your current speed and track your progress over time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are these brain tests accurate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our cognitive tests are based on scientifically-validated methodologies used in psychology and neuroscience research. While they provide reliable measurements, results can vary based on factors like fatigue, device performance, and practice effects.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Zap Mind free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes! All our cognitive tests and brain training games are completely free with no hidden costs. You don't need to create an account or provide payment information. Simply visit the site and start testing your abilities instantly.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to create an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No account required! You can start taking cognitive tests immediately. Your scores are saved locally in your browser, so you can track your progress without signing up. Simply visit any test and start playing right away.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient />
    </>
  );
}

