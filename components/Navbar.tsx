// ============================================
// FILE: components/Navbar.tsx
// ============================================
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="/games" className="text-white/80 hover:text-white transition">
              All Tests
            </Link>
            <Link 
              href="/forms/request-game"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
            >
              Request a Game
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/games"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              All Tests
            </Link>
            <Link
              href="/forms/request-game"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium text-center transition"
            >
              Request a Game
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
