// ============================================
// FILE: app/HomePageClient.tsx
// Client Component for Homepage - SEO OPTIMIZED
// ============================================
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Game {
  name: string;
  desc: string;
  icon: string;
  color: string;
  href: string;
  scoreKey: string;
  defaultText: string;
  formatScore: (value: string) => string;
}

export default function HomePageClient() {
  const [scores, setScores] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const games: Game[] = [
    { 
      name: 'Reaction Time Test', 
      desc: 'Primarily works on your attention skills and decision-making cognitive functions', 
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      href: '/games/reaction',
      scoreKey: 'best-score-reaction',
      defaultText: '---',
      formatScore: (val) => `${val}ms`
    },
    { 
      name: 'Aim Trainer', 
      desc: 'Improves hand-eye coordination and mouse precision for gaming and everyday tasks', 
      icon: '🎯',
      color: 'from-red-400 to-pink-500',
      href: '/games/aim-trainer',
      scoreKey: 'best-score-aim',
      defaultText: '---',
      formatScore: (val) => `${val}%`
    },
    { 
      name: 'N-Back Memory Test', 
      desc: 'Challenges your working memory and mental flexibility with increasing difficulty levels', 
      icon: '🧠',
      color: 'from-blue-400 to-indigo-500',
      href: '/games/nback-test',
      scoreKey: 'best-nback-level',
      defaultText: '---',
      formatScore: (val) => `${val}-Back`
    },
    { 
      name: 'Simon Says', 
      desc: 'Enhances pattern recognition and sequential memory through color sequence challenges', 
      icon: '🎵',
      color: 'from-purple-400 to-indigo-500',
      href: '/games/simon-says',
      scoreKey: 'best-level-simon',
      defaultText: '---',
      formatScore: (val) => `Level ${val}`
    },
    { 
      name: 'Color Vision Test', 
      desc: 'Tests for color blindness using scientifically-validated Ishihara plate methodology', 
      icon: '👁️',
      color: 'from-indigo-400 to-purple-500',
      href: '/games/colorblind-test',
      scoreKey: 'colorblind-result',
      defaultText: '---',
      formatScore: (val) => val === '1' ? 'Normal' : 'Completed'
    },
    { 
      name: 'Visual Memory Test', 
      desc: 'Strengthens your ability to remember and recall visual patterns accurately', 
      icon: '🧠',
      color: 'from-purple-400 to-indigo-500',
      href: '/games/visual-memory',
      scoreKey: 'best-level-visual',
      defaultText: '---',
      formatScore: (val) => `Level ${val}`
    },
    { 
      name: 'Typing Speed Test', 
      desc: 'Measures your typing speed in words per minute and improves keyboard accuracy', 
      icon: '⌨️',
      color: 'from-blue-400 to-cyan-500',
      href: '/games/typing-test',
      scoreKey: 'best-wpm-typing',
      defaultText: '---',
      formatScore: (val) => `${val} WPM`
    },
    { 
      name: 'Number Memory Test', 
      desc: 'Tests how many digits you can remember in sequence to measure short-term memory', 
      icon: '🔢',
      color: 'from-green-400 to-emerald-500',
      href: '/games/number-memory',
      scoreKey: 'best-digits-number',
      defaultText: '---',
      formatScore: (val) => `${val} digits`
    },
    { 
      name: 'Precision Click Challenge', 
      desc: 'Develops timing accuracy and hand-eye coordination through precision clicking tasks', 
      icon: '🎯',
      color: 'from-purple-400 to-pink-400',
      href: '/games/precision-click',
      scoreKey: 'best-level-precision',
      defaultText: '---',
      formatScore: (val) => `Level ${val}`
    },
  ];

  useEffect(() => {
    if (mounted) {
      const loadedScores: Record<string, string> = {};
      games.forEach(game => {
        const saved = localStorage.getItem(game.scoreKey);
        if (saved) {
          loadedScores[game.scoreKey] = saved;
        }
      });
      setScores(loadedScores);
    }
  }, [mounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar placeholder - add your Navbar component */}
      <nav className="p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-white">🧠 Zap Mind</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-8">
            <span>⚡</span>
            <span>Join 2.6M+ players worldwide</span>
          </div>
          
          {/* H1 */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Test Your Cognitive Abilities
          </h1>
          
          {/* Hero Text */}
          <div className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto space-y-4">
            <p className="font-semibold">You want your brain to be sharp and healthy.</p>
            <p>
              We here at Zap Mind offer exactly the same with our interactive brain games. 
              Train and improve your cognitive skills like memory, flexibility, attention, 
              multi-tasking, reaction time and more.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center">
            <Link href="/games">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 transition transform hover:scale-105">
                Start Testing →
              </button>
            </Link>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                What cognitive testing is and why it matters?
              </h2>
              <p className="text-white/70 leading-relaxed">
                Cognitive tests are simple tests which are designed to measure brain functioning 
                capabilities like attention skills, decision-making skills, remembering, reasoning, and more.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Why Zap Mind?
              </h2>
              <p className="text-white/70 leading-relaxed">
                We're the only website which offers cognitive function-improving games totally 
                free of cost and without login and sign-up hassles.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Who can use this?
              </h2>
              <p className="text-white/70 leading-relaxed">
                Anyone can play and improve their cognitive functions regardless of your age or skill level.
              </p>
            </div>
          </div>
        </section>

        {/* Choose Your Challenge Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Choose Your Challenge
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <Link
                key={index}
                href={game.href}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-left hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className="text-5xl mb-4">{game.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{game.name}</h3>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">{game.desc}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Your best</span>
                    <span className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${game.color}`}>
                      {mounted && scores[game.scoreKey] 
                        ? game.formatScore(scores[game.scoreKey])
                        : game.defaultText
                      }
                    </span>
                  </div>
                </div>

                <div className="absolute top-6 right-6 text-white/40 group-hover:text-white/80 transition-colors">
                  →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                What is a cognitive test?
                <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/70 mt-4 leading-relaxed">
                A cognitive test is an assessment that measures various mental abilities including memory, 
                reaction time, problem-solving, and processing speed. Our free online cognitive tests help 
                you understand your mental strengths and identify areas for improvement through interactive brain games.
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                How can I improve my reaction time?
                <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/70 mt-4 leading-relaxed">
                You can improve your reaction time through regular practice with our reaction time test. 
                Stay focused, get adequate sleep, reduce distractions, and practice consistently. 
                Many users see improvement within just a few weeks of daily training.
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                What is a good typing speed?
                <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/70 mt-4 leading-relaxed">
                The average typing speed is around 40 words per minute (WPM). Professional typists 
                typically achieve 65-75 WPM, while advanced users can reach 90+ WPM. Use our free 
                typing speed test to measure your current speed and track your progress over time.
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                Are these brain tests accurate?
                <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/70 mt-4 leading-relaxed">
                Yes, our cognitive tests are based on scientifically-validated methodologies used in 
                psychology and neuroscience research. While they provide reliable measurements, results 
                can vary based on factors like fatigue, device performance, and practice effects.
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                Is Zap Mind free?
                <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/70 mt-4 leading-relaxed">
                Yes! All our cognitive tests and brain training games are completely free with no hidden 
                costs. You don't need to create an account or provide payment information. Simply visit 
                the site and start testing your abilities instantly.
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                Do I need to create an account?
                <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/70 mt-4 leading-relaxed">
                No account required! You can start taking cognitive tests immediately. Your scores are 
                saved locally in your browser, so you can track your progress without signing up. Simply 
                visit any test and start playing right away.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Footer placeholder */}
      <footer className="bg-black/30 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Zap Mind. Test your mind, track your progress.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/about" className="text-white/60 hover:text-white text-sm">About</Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm">Terms</Link>
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm">Privacy</Link>
            <Link href="/forms/contact" className="text-white/60 hover:text-white text-sm">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
