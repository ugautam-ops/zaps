// ============================================
// FILE: app/privacy/page.tsx
// ============================================
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Zap Mind. Learn how we collect, use, and protect your data when using our cognitive tests and brain games.',
  openGraph: {
    title: 'Privacy Policy | Zap Mind',
    description: 'Read our Privacy Policy to understand how we handle your data.',
    url: 'https://zapmind.org/privacy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zapmind.org/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
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
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-white/70">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-white/80 leading-relaxed">
              At Zap Mind, we are committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, and safeguard your information when you use our cognitive tests
              and brain training games.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Local Storage Data</h3>
                <p className="text-white/80 leading-relaxed">
                  Your game scores and progress are stored locally in your browser using localStorage.
                  This data never leaves your device and is not transmitted to our servers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Analytics Data</h3>
                <p className="text-white/80 leading-relaxed">
                  We may use analytics services to collect anonymous usage data such as page views,
                  time spent on pages, and browser type. This helps us improve our services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Contact Form Data</h3>
                <p className="text-white/80 leading-relaxed">
                  When you submit a contact form, we collect your name, email, and message content
                  solely to respond to your inquiry.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-white/80 ml-4 space-y-2">
              <li>To provide and maintain our services</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To improve and optimize our website and games</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
            <p className="text-white/80 leading-relaxed">
              We use cookies to remember your preferences (such as cookie consent) and to analyze
              website traffic. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p className="text-white/80 leading-relaxed">
              We implement appropriate security measures to protect your data. However, no method
              of transmission over the internet is 100% secure. We strive to use commercially
              acceptable means to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Services</h2>
            <p className="text-white/80 leading-relaxed">
              Our website may contain links to third-party sites. We are not responsible for the
              privacy practices of these external sites. We encourage you to read their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Children&apos;s Privacy</h2>
            <p className="text-white/80 leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect
              personal information from children. If you believe we have collected data from a
              child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside text-white/80 ml-4 space-y-2">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Objection to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-white/80 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new policy on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <Link
              href="/forms/contact"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition transform hover:scale-105"
            >
              Contact Us
            </Link>
          </section>

          <section className="border-t border-white/20 pt-6 mt-8">
            <p className="text-white/60 text-sm">
              By using Zap Mind, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
