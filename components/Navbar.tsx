import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-3xl">🧠</span>
            <span className="text-xl font-bold text-white">Zap Mind</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white/80 hover:text-white transition">
              Home
            </Link>
            <Link href="/games" className="text-white/80 hover:text-white transition">
              All Tests
            </Link>
            <Link href="/leaderboard" className="text-white/80 hover:text-white transition">
              Leaderboard
            </Link>
            <Link href="/stats" className="text-white/80 hover:text-white transition">
              Stats
            </Link>
            <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
