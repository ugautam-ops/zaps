// ============================================
// FILE: app/games/simon-says/page.tsx
// ============================================
'use client';

import { useState, useEffect, useRef } from 'react';
import GameLayout from '@/components/GameLayout';

type GameState = 'start' | 'showing' | 'playing' | 'wrong' | 'results';

interface Color {
  id: number;
  name: string;
  bg: string;
  active: string;
  border: string;
}

export default function SimonSaysGame() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [level, setLevel] = useState<number>(0);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [isShowingSequence, setIsShowingSequence] = useState<boolean>(false);

  const colors: Color[] = [
    { id: 0, name: 'red', bg: 'bg-red-500', active: 'bg-red-300', border: 'border-red-400' },
    { id: 1, name: 'blue', bg: 'bg-blue-500', active: 'bg-blue-300', border: 'border-blue-400' },
    { id: 2, name: 'green', bg: 'bg-green-500', active: 'bg-green-300', border: 'border-green-400' },
    { id: 3, name: 'yellow', bg: 'bg-yellow-500', active: 'bg-yellow-300', border: 'border-yellow-400' },
  ];

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setLevel(1);
    setGameState('showing');
    const firstColor = Math.floor(Math.random() * 4);
    const newSequence: number[] = [firstColor];
    setSequence(newSequence);
    setTimeout(() => showSequence(newSequence), 500);
  };

  const showSequence = async (seq: number[]) => {
    setIsShowingSequence(true);
    setUserSequence([]);
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveColor(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveColor(null);
    }
    
    setIsShowingSequence(false);
    setGameState('playing');
  };

  const handleColorClick = (colorId: number) => {
    if (isShowingSequence || gameState !== 'playing') return;

    // Flash the color
    setActiveColor(colorId);
    setTimeout(() => setActiveColor(null), 300);

    const newUserSequence = [...userSequence, colorId];
    setUserSequence(newUserSequence);

    // Check if correct
    if (colorId !== sequence[newUserSequence.length - 1]) {
      // Wrong!
      setGameState('wrong');
      setTimeout(() => {
        setGameState('results');
      }, 1500);
      return;
    }

    // Check if sequence completed
    if (newUserSequence.length === sequence.length) {
      // Level complete!
      const nextLevel = level + 1;
      setLevel(nextLevel);
      setGameState('showing');
      
      setTimeout(() => {
        const nextColor = Math.floor(Math.random() * 4);
        const newSequence = [...sequence, nextColor];
        setSequence(newSequence);
        showSequence(newSequence);
      }, 1000);
    }
  };

  const seoContent = (
    <>
      <p>
        <strong>Simon Says</strong> is a classic memory game that tests your ability to remember and repeat 
        increasingly complex color patterns. This game challenges your working memory and sequential processing skills.
      </p>
      <p>
        <strong>How it works:</strong> Watch the pattern of colors light up, then repeat the sequence by clicking 
        the colors in the same order. Each level adds one more color to the pattern.
      </p>
      <p>
        <strong>Benefits:</strong> Playing Simon Says improves short-term memory, concentration, pattern recognition, 
        and hand-eye coordination. It&apos;s been used in cognitive research since the 1970s.
      </p>
      <p>
        <strong>Tips for better scores:</strong> Stay focused, try saying the colors in your head, 
        use spatial memory (remember positions), and don&apos;t rush - accuracy matters more than speed!
      </p>
    </>
  );

  return (
    <GameLayout 
      seoTitle="About Simon Says Game"
      seoContent={seoContent}
    >
      <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center rounded-3xl min-h-[600px] relative p-4 sm:p-8">
        
        {/* Start State */}
        {gameState === 'start' && (
          <div className="text-center text-white px-4">
            <div className="mb-6 sm:mb-8">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🎵</div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">Simon Says</h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 opacity-90">
              Watch the pattern and repeat it!
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-75">
              Each level adds one more color to remember.
            </p>
            <button 
              onClick={startGame}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg sm:text-xl hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 active:scale-95"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Game Board */}
        {(gameState === 'showing' || gameState === 'playing' || gameState === 'wrong') && (
          <>
            {/* Level Display */}
            <div className="text-center text-white mb-6 sm:mb-8 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Level {level}</h2>
              <p className="text-base sm:text-lg md:text-xl opacity-75">
                {isShowingSequence ? 'Watch the pattern...' : 'Your turn!'}
              </p>
            </div>

            {/* Color Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorClick(color.id)}
                  disabled={isShowingSequence}
                  className={`
                    w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl border-4 transition-all duration-200
                    ${activeColor === color.id ? color.active : color.bg}
                    ${color.border}
                    ${isShowingSequence ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}
                    disabled:opacity-70
                  `}
                  aria-label={`${color.name} button`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            {!isShowingSequence && gameState === 'playing' && (
              <div className="w-full max-w-xs sm:max-w-sm px-4">
                <div className="flex gap-1 sm:gap-2 justify-center mb-2">
                  {sequence.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        index < userSequence.length
                          ? 'bg-green-400'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-white/60 text-center text-sm">
                  {userSequence.length} / {sequence.length}
                </p>
              </div>
            )}

            {/* Wrong State Overlay */}
            {gameState === 'wrong' && (
              <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center rounded-3xl">
                <div className="text-center text-white px-4">
                  <svg className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="4" fill="none"/>
                    <path d="M35 35 L65 65 M65 35 L35 65" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                  </svg>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Wrong Pattern!</h2>
                </div>
              </div>
            )}
          </>
        )}

        {/* Results */}
        {gameState === 'results' && (
          <div className="text-center text-white px-4">
            <div className="mb-6 sm:mb-8">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🏆</div>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6">{level}</h1>
            <p className="text-2xl sm:text-3xl mb-6 sm:mb-8 opacity-90">Levels Completed</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-md mx-auto">
              <p className="text-lg sm:text-xl mb-2">Pattern length:</p>
              <p className="text-3xl sm:text-4xl font-bold mb-4">{sequence.length} colors</p>
              
              <div className="text-left text-xs sm:text-sm opacity-75 mt-4 space-y-1">
                <p>• Average: 8-10 levels</p>
                <p>• Good: 12-15 levels</p>
                <p>• Excellent: 20+ levels</p>
              </div>
            </div>
            
            <button 
              onClick={startGame}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg sm:text-xl hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 active:scale-95"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Color Key Legend (for accessibility) */}
        {(gameState === 'showing' || gameState === 'playing') && (
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-black/40 backdrop-blur-sm rounded-lg p-2 sm:p-3">
            <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs text-white/80">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center gap-1 sm:gap-2">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded ${color.bg}`}></div>
                  <span className="capitalize text-xs sm:text-sm">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
