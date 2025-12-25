// ============================================
// FILE: app/about/page.tsx
// ============================================
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About Zap Mind - Our Mission & Story',
  description: 'Learn about Zap Mind, our mission to make cognitive testing accessible and fun for everyone. Discover our science-based brain games and values.',
  openGraph: {
    title: 'About Zap Mind - Our Mission & Story',
    description: 'Learn about Zap Mind and our mission to make cognitive testing accessible and fun for everyone.',
    url: 'https://zapmind.org/about',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About Zap Mind' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Zap Mind',
    description: 'Our mission to make cognitive testing accessible and fun.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://zapmind.org/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Zap Mind
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Your destination for testing and improving cognitive abilities
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Mission Section */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Our Mission
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Zap Mind was created with a simple goal: to make cognitive testing accessible,
              engaging, and fun for everyone. We believe that understanding and improving your
              mental abilities should be easy, interactive, and backed by science.
            </p>
            <p className="text-white/80 leading-relaxed">
              Whether you&apos;re a gamer looking to improve reaction time, a student wanting to
              enhance memory, or simply curious about your cognitive abilities, we&apos;ve got
              the perfect tests for you.
            </p>
          </section>

          {/* What We Offer */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="text-3xl mb-3">🎮</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Interactive Tests
                </h3>
                <p className="text-white/70 text-sm">
                  Engaging games that measure reaction time, memory, typing speed, and more.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Track Progress
                </h3>
                <p className="text-white/70 text-sm">
                  Monitor your performance over time and see how you improve with practice.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Science-Based
                </h3>
                <p className="text-white/70 text-sm">
                  Tests designed based on cognitive research and established methodologies.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Free for Everyone
                </h3>
                <p className="text-white/70 text-sm">
                  All tests are completely free. No subscriptions, no hidden costs.
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-3xl">📖</span>
              Our Story
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Zap Mind started as a small project to help people understand their cognitive
              abilities better. We noticed that most cognitive tests were either too academic,
              too expensive, or simply not engaging enough.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              We set out to change that by creating a platform that combines scientific accuracy
              with gamification. The result? A collection of tests that are both valid and fun
              to take.
            </p>
            <p className="text-white/80 leading-relaxed">
              Today, millions of users worldwide use Zap Mind to test and train their cognitive
              abilities. We&apos;re constantly adding new tests and features based on user feedback
              and the latest research.
            </p>
          </section>

          {/* Values */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">💎</span>
              Our Values
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl">✨</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Accessibility</h3>
                  <p className="text-white/70 text-sm">
                    Cognitive testing should be available to everyone, everywhere, for free.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Accuracy</h3>
                  <p className="text-white/70 text-sm">
                    Our tests are based on scientific research and validated methodologies.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🎨</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Engagement</h3>
                  <p className="text-white/70 text-sm">
                    Learning about yourself should be fun, not boring or intimidating.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔒</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Privacy</h3>
                  <p className="text-white/70 text-sm">
                    Your data is yours. We respect your privacy and never sell your information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-2">Join Our Community</h3>
            <p className="text-white/70 mb-6">
              Start testing your cognitive abilities today and see how you stack up!
            </p>
            <Link
              href="/games"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition transform hover:scale-105"
            >
              Explore All Tests
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
