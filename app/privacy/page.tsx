// ============================================
// FILE: app/terms/page.tsx
// ============================================
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
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
          <div className="text-6xl mb-4">📜</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-white/70">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/80 leading-relaxed">
              By accessing and using Zap Mind (&quot;the Service&quot;), you accept and agree to be bound 
              by the terms and provisions of this agreement. If you do not agree to these terms, 
              please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <p className="text-white/80 leading-relaxed">
              Zap Mind provides cognitive tests and brain games designed to measure and improve 
              various mental abilities including reaction time, memory, typing speed, and more. 
              The Service is provided free of charge for personal, non-commercial use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">You agree to:</h3>
                <ul className="list-disc list-inside text-white/80 ml-4 space-y-2">
                  <li>Use the Service in compliance with all applicable laws and regulations</li>
                  <li>Not use the Service for any unlawful or prohibited purpose</li>
                  <li>Not attempt to gain unauthorized access to any part of the Service</li>
                  <li>Not interfere with or disrupt the Service or servers</li>
                  <li>Not use automated systems or bots to access the Service</li>
                  <li>Not transmit any viruses, malware, or harmful code</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              All content on Zap Mind, including but not limited to text, graphics, logos, images, 
              games, and software, is the property of Zap Mind or its content suppliers and is 
              protected by international copyright laws.
            </p>
            <p className="text-white/80 leading-relaxed">
              You may not copy, reproduce, distribute, or create derivative works from our content 
              without explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. User-Generated Content</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              When you submit feedback, game ideas, or other content to us:
            </p>
            <ul className="list-disc list-inside text-white/80 ml-4 space-y-2">
              <li>You grant us a non-exclusive, worldwide, royalty-free license to use, 
                  modify, and incorporate your submissions</li>
              <li>You confirm that your submissions do not violate any third-party rights</li>
              <li>You acknowledge that we are not obligated to use or implement your submissions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND:
            </p>
            <ul className="list-disc list-inside text-white/80 ml-4 space-y-2">
              <li>We do not guarantee that the Service will be uninterrupted or error-free</li>
              <li>We do not guarantee the accuracy or reliability of test results</li>
              <li>The tests are for entertainment and educational purposes only</li>
              <li>Test results should not be used for medical or professional diagnosis</li>
              <li>We are not responsible for decisions made based on test results</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
            <p className="text-white/80 leading-relaxed">
              To the fullest extent permitted by law, Zap Mind shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages, or any loss of 
              profits or revenues, whether incurred directly or indirectly, or any loss of data, 
              use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc list-inside text-white/80 ml-4 mt-2 space-y-2">
              <li>Your use or inability to use the Service</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any interruption or cessation of the Service</li>
              <li>Any bugs, viruses, or other harmful code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Medical Disclaimer</h2>
            <p className="text-white/80 leading-relaxed">
              Our cognitive tests are designed for entertainment and general wellness purposes only. 
              They are not intended to diagnose, treat, cure, or prevent any medical condition. 
              Always consult with a qualified healthcare professional for medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Privacy</h2>
            <p className="text-white/80 leading-relaxed">
              Your use of the Service is also governed by our Privacy Policy. Please review our 
              Privacy Policy to understand our practices.
            </p>
            <Link
              href="/privacy"
              className="inline-block mt-3 text-purple-400 hover:text-purple-300 transition underline"
            >
              Read Privacy Policy →
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Service</h2>
            <p className="text-white/80 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of the Service at 
              any time without notice. We are not liable to you or any third party for any 
              modification, suspension, or discontinuance of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
            <p className="text-white/80 leading-relaxed">
              We may revise these Terms of Service at any time. The most current version will 
              always be posted on this page. By continuing to use the Service after changes are 
              posted, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Termination</h2>
            <p className="text-white/80 leading-relaxed">
              We reserve the right to terminate or suspend your access to the Service immediately, 
              without prior notice or liability, for any reason, including breach of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law</h2>
            <p className="text-white/80 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
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
              By using Zap Mind, you acknowledge that you have read, understood, and agree to be 
              bound by these Terms of Service.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
