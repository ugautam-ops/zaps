// ============================================
// FILE: app/page.tsx
// ============================================
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const games = [
    { 
      name: 'Reaction Time', 
      desc: 'Test your reflexes', 
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      avg: '234ms',
      href: '/games/reaction'
    },
    { 
      name: 'Aim Trainer', 
      desc: 'Precision clicking', 
      icon: '🎯',
      color: 'from-red-400 to-pink-500',
      avg: '85%',
      href: '/games/aim-trainer'
    },
    { 
      name: 'N-Back Test', 
      desc: 'Working memory challenge', 
      icon: '🧠',
      color: 'from-blue-400 to-indigo-500',
      avg: '75%',
      href: '/games/nback-test'
    },
    { 
      name: 'Simon Says', 
      desc: 'Repeat color sequences', 
      icon: '🎵',
      color: 'from-purple-400 to-indigo-500',
      avg: '12 levels',
      href: '/games/simon-says'
    },
    { 
      name: 'Color Blind Test', 
      desc: 'Ishihara test plates', 
      icon: '👁️',
      color: 'from-indigo-400 to-purple-500',
      avg: 'Normal',
      href: '/games/colorblind-test'
    },
    { 
      name: 'Memory Test', 
      desc: 'Visual patterns', 
      icon: '🧠',
      color: 'from-purple-400 to-indigo-500',
      avg: '8 tiles',
      href: '/games/visual-memory'
    },
    { 
      name: 'Typing Speed', 
      desc: 'Words per minute', 
      icon: '⌨️',
      color: 'from-blue-400 to-cyan-500',
      avg: '67 WPM',
      href: '/games/typing-test'
    },
    { 
      name: 'Number Memory', 
      desc: 'Remember sequences', 
      icon: '🔢',
      color: 'from-green-400 to-emerald-500',
      avg: '8 digits',
      href: '/games/number-memory'
    },
    { 
      name: 'Precision Click', 
      desc: 'Perfect timing challenge', 
      icon: '🎯',
      color: 'from-purple-400 to-pink-400',
      avg: 'Level 8',
      href: '/games/precision-click'
    },
  ];

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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 transition transform hover:scale-105">
              Start Testing →
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-lg border border-white/20 transition">
              View Stats
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-white mb-1">2.6M+</div>
            <div className="text-white/60 text-sm">Active Players</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-3xl font-bold text-white mb-1">15M+</div>
            <div className="text-white/60 text-sm">Tests Taken</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">📈</div>
            <div className="text-3xl font-bold text-white mb-1">23%</div>
            <div className="text-white/60 text-sm">Avg Improvement</div>
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
                  
                  {/* Average Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Your best</span>
                    <span className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${game.color}`}>
                      {game.avg}
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

        {/* Daily Challenge Banner */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="text-2xl font-bold text-white mb-2">Daily Challenge</h3>
          <p className="text-white/70 mb-4">
            Complete today's challenge and compete with 10,000+ players!
          </p>
          <button className="px-6 py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-white/90 transition">
            Start Challenge
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
