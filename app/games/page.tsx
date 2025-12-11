// ============================================
// FILE: app/games/page.tsx
// ============================================
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export const dynamic = 'force-static'

interface Game {
  name: string;
  desc: string;
  fullDescription: string;
  icon: string;
  color: string;
  href: string;
  scoreKey: string;
  defaultText: string;
  formatScore: (value: string) => string;
  category: 'reaction' | 'memory' | 'precision' | 'perception';
}

export default function AllGamesPage() {
  const { canUseFunctional } = useCookieConsent();
  const [scores, setScores] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const games: Game[] = [
    { 
      name: 'Reaction Time', 
      desc: 'Test your reflexes', 
      fullDescription: 'Measure how quickly you can respond to visual stimuli. The average human reaction time is around 250ms.',
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      href: '/games/reaction',
      scoreKey: 'best-score-reaction',
      defaultText: '---',
      formatScore: (val) => `${val}ms`,
      category: 'reaction'
    },
    { 
      name: 'Aim Trainer', 
      desc: 'Precision clicking', 
      fullDescription: 'Improve your mouse accuracy and speed. Perfect for gamers looking to enhance their aiming skills.',
      icon: '🎯',
      color: 'from-red-400 to-pink-500',
      href: '/games/aim-trainer',
      scoreKey: 'best-score-aim',
      defaultText: '---',
      formatScore: (val) => `${val}%`,
      category: 'precision'
    },
    { 
      name: 'N-Back Test', 
      desc: 'Working memory challenge', 
      fullDescription: 'Train your working memory by remembering sequences. Used in cognitive research to measure intelligence.',
      icon: '🧠',
      color: 'from-blue-400 to-indigo-500',
      href: '/games/nback-test',
      scoreKey: 'best-nback-level',
      defaultText: '---',
      formatScore: (val) => `${val}-Back`,
      category: 'memory'
    },
    { 
      name: 'Simon Says', 
      desc: 'Repeat color sequences', 
      fullDescription: 'Follow the increasingly complex color patterns. A classic test of short-term memory and attention.',
      icon: '🎵',
      color: 'from-purple-400 to-indigo-500',
      href: '/games/simon-says',
      scoreKey: 'best-level-simon',
      defaultText: '---',
      formatScore: (val) => `Level ${val}`,
      category: 'memory'
    },
    { 
      name: 'Color Blind Test', 
      desc: 'Ishihara test plates', 
      fullDescription: 'Check for color vision deficiencies using scientifically validated Ishihara plates.',
      icon: '👁️',
      color: 'from-indigo-400 to-purple-500',
      href: '/games/colorblind-test',
      scoreKey: 'colorblind-result',
      defaultText: '---',
      formatScore: (val) => val === '1' ? 'Normal' : 'Completed',
      category: 'perception'
    },
    { 
      name: 'Visual Memory', 
      desc: 'Remember patterns', 
      fullDescription: 'Test your ability to remember and recall visual patterns. Starts easy and gets progressively harder.',
      icon: '🧠',
      color: 'from-purple-400 to-indigo-500',
      href: '/games/visual-memory',
      scoreKey: 'best-level-visual',
      defaultText: '---',
      formatScore: (val) => `Level ${val}`,
      category: 'memory'
    },
    { 
      name: 'Typing Speed', 
      desc: 'Words per minute', 
      fullDescription: 'Measure your typing speed and accuracy. Improve your WPM and become more productive.',
      icon: '⌨️',
      color: 'from-blue-400 to-cyan-500',
      href: '/games/typing-test',
      scoreKey: 'best-wpm-typing',
      defaultText: '---',
      formatScore: (val) => `${val} WPM`,
      category: 'reaction'
    },
    { 
      name: 'Number Memory', 
      desc: 'Remember sequences', 
      fullDescription: 'How many digits can you remember? Test and train your numerical memory capacity.',
      icon: '🔢',
      color: 'from-green-400 to-emerald-500',
      href: '/games/number-memory',
      scoreKey: 'best-digits-number',
      defaultText: '---',
      formatScore: (val) => `${val} digits`,
      category: 'memory'
    },
    { 
      name: 'Precision Click', 
      desc: 'Perfect timing challenge', 
      fullDescription: 'Click when both moving balls are inside the target. Tests coordination and timing precision.',
      icon: '🎯',
      color: 'from-purple-400 to-pink-400',
      href: '/games/precision-click',
      scoreKey: 'best-level-precision',
      defaultText: '---',
      formatScore: (val) => `Level ${val}`,
      category: 'precision'
    },
  ];

  const categories = [
    { id: 'all', name: 'All Games', icon: '🎮' },
    { id: 'reaction', name: 'Reaction', icon: '⚡' },
    { id: 'memory', name: 'Memory', icon: '🧠' },
    { id: 'precision', name: 'Precision', icon: '🎯' },
    { id: 'perception', name: 'Perception', icon: '👁️' },
  ];

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Cognitive Tests
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Challenge yourself with our collection of brain games and cognitive tests. 
            Track your performance and see how you improve over time.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">🎮</div>
            <div className="text-2xl font-bold text-white">{games.length}</div>
            <div className="text-white/60 text-sm">Total Games</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">🏆</div>
            <div className="text-2xl font-bold text-white">
              {Object.keys(scores).length}
            </div>
            <div className="text-white/60 text-sm">Played</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">📈</div>
            <div className="text-2xl font-bold text-white">
              {Math.round((Object.keys(scores).length / games.length) * 100)}%
            </div>
            <div className="text-white/60 text-sm">Progress</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">⭐</div>
            <div className="text-2xl font-bold text-white">
              {games.length - Object.keys(scores).length}
            </div>
            <div className="text-white/60 text-sm">To Try</div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game, index) => (
            <Link
              key={index}
              href={game.href}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-left hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{game.icon}</div>
                  {scores[game.scoreKey] && (
                    <div className="px-2 py-1 bg-green-500/20 border border-green-500/50 rounded-md">
                      <span className="text-xs text-green-300 font-medium">Played</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                <p className="text-white/60 text-sm mb-4">{game.fullDescription}</p>
                
                {/* Best Score */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
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
              <div className="absolute top-6 right-6 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-white mb-2">No games in this category</h3>
            <p className="text-white/60">Try selecting a different category</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">💡</div>
          <h3 className="text-2xl font-bold text-white mb-2">Have a Game Idea?</h3>
          <p className="text-white/70 mb-6">
            Share your suggestions and help us create new cognitive challenges!
          </p>
          <Link
            href="/forms/request-game"
            className="inline-block px-6 py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-white/90 transition"
          >
            Request a New Game
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
