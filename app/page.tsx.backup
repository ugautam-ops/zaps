// ============================================
// FILE: app/page.tsx
// ============================================
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCookieConsent } from '@/hooks/useCookieConsent';

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

export default function HomePage() {
  const { canUseFunctional } = useCookieConsent();
  const [scores, setScores] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const games: Game[] = [
    { 
      name: 'Reaction Time', 
      desc: 'Test your reflexes', 
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      href: '/games/reaction',
      scoreKey: 'best-score-reaction',
      defaultText: '---',
      formatScore: (val) => `${val}ms`
    },
    { 
      name: 'Aim Trainer', 
      desc: 'Precision clicking', 
      icon: '🎯',
      color: 'from-red-400 to-pink-500',
      href: '/games/aim-trainer',
      scoreKey: 'best-score-aim',
      defaultText: '---',
      formatScore: (val) => `${val}%`
    },
    { 
      name: 'N-Back Test', 
      desc: 'Working memory challenge', 
      icon: '🧠',
      color: 'from-blue-400 to-indigo-500',
      href: '/games/nback-test',
      scoreKey: 'best-nback-level',
      defaultText: '---',
      formatScore: (val) => `${val}-Back`
    },
    { 
      name: 'Simon Says', 
      desc: 'Repeat color sequences', 
      icon: '🎵',
      color: 'from-purple-400 to-indigo-500',
      href: '/games/simon-says',
      scoreKey: 'best-level-simon',
      defaultText: '---',
      formatScore: (val) => `Level ${val}`
    },
    { 
      name: 'Color Blind Test', 
      desc: 'Ishihara test plates', 
      icon: '👁️',
      color: 'from-indigo-400 to-purple-500',
      href: '/games/colorblind-test',
      scoreKey: 'colorblind-result',
      defaultText: '---',
      formatScore: (val) => val === '1' ? 'Normal' : 'Completed'
    },
    { 
      name: 'Memory Test', 
      desc: 'Visual patterns', 
      icon: '🧠',
      color: 'from-purple-400 to-indigo-500',
      href: '/games/visual-memory',
      scoreKey: 'best-level-visual',
      defaultText: '---',
      formatScore: (val) => `Level ${val}`
    },
    { 
      name: 'Typing Speed', 
      desc: 'Words per minute', 
      icon: '⌨️',
      color: 'from-blue-400 to-cyan-500',
      href: '/games/typing-test',
      scoreKey: 'best-wpm-typing',
      defaultText: '---',
      formatScore: (val) => `${val} WPM`
    },
    { 
      name: 'Number Memory', 
      desc: 'Remember sequences', 
      icon: '🔢',
      color: 'from-green-400 to-emerald-500',
      href: '/games/number-memory',
      scoreKey: 'best-digits-number',
      defaultText: '---',
      formatScore: (val) => `${val} digits`
    },
    { 
      name: 'Precision Click', 
      desc: 'Perfect timing challenge', 
      icon: '🎯',
      color: 'from-purple-400 to-pink-400',
      href: '/games/precision-click',
      scoreKey: 'best-level-precision',
      defaultText: '---',
      formatScore: (val) => `Level ${val}`
    },
  ];

  useEffect(() => {
    if (canUseFunctional) {
      const loadedScores: Record<string, string> = {};
      games.forEach(game => {
        const saved = localStorage.getItem(game.scoreKey);
        if (saved) {
          loadedScores[game.scoreKey] = saved;
        }
      });
      setScores(loadedScores);
    }
  }, [canUseFunctional]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-8">
            <span>⚡</span>
            <span>Join 2.6M+ players worldwide</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ contentVisibility: 'auto' }}>
            Test Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Cognitive Abilities
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Measure your reaction time, memory, typing speed, and more with fun interactive tests. 
            Track your progress and compete globally.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center">
            <Link href="/games">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 transition transform hover:scale-105">
                Start Testing →
              </button>
            </Link>
          </div>
        </div>

        {/* Featured Games Grid */}
        <div className="mb-12">
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
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative">
                  <div className="text-5xl mb-4">{game.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{game.desc}</p>
                  
                  {/* Best Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Your best</span>
                    <span className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${game.color}`}>
                      {scores[game.scoreKey] 
                        ? game.formatScore(scores[game.scoreKey])
                        : game.defaultText
                      }
                    </span>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-6 right-6 text-white/40 group-hover:text-white/80 transition-colors">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
