// ============================================
// FILE: app/games/aim-trainer/page.tsx
// ============================================
'use client';

import { useState, useEffect, useRef } from 'react';
import GameLayout from '@/components/GameLayout';

type Target = {
  id: number;
  x: number;
  y: number;
  size: number;
  spawnTime: number;
};

export default function AimTrainerGame() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'results'>('start');
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState<number>(0);
  const [missed, setMissed] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [targetClicks, setTargetClicks] = useState<number[]>([]);

  const timerRef = useRef<number | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setScore(0);
    setMissed(0);
    setTimeLeft(30);
    setTargetClicks([]);
    setGameState('playing');

    setTimeout(() => spawnTarget(), 100);

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTargets([]);
    setGameState('results');
  };

  const spawnTarget = () => {
    if (!gameAreaRef.current) {
      setTimeout(() => spawnTarget(), 50);
      return;
    }

    const container = gameAreaRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    if (containerWidth > 100 && containerHeight > 100) {
      const targetSize = 50 + Math.random() * 20;
      const maxX = containerWidth - targetSize - 20;
      const maxY = containerHeight - targetSize - 20;

      const newTarget: Target = {
        id: Date.now(),
        x: 20 + Math.random() * Math.max(0, maxX),
        y: 20 + Math.random() * Math.max(0, maxY),
        size: targetSize,
        spawnTime: Date.now(),
      };

      setTargets([newTarget]);
    } else {
      setTimeout(() => spawnTarget(), 50);
    }
  };

  const handleTargetClick = (targetId: number) => {
    const clickTime = Date.now();
    const target = targets.find(t => t.id === targetId);

    if (target) {
      const reactionTime = clickTime - target.spawnTime;
      setTargetClicks(prev => [...prev, reactionTime]);
      setScore(prev => prev + 1);
      spawnTarget();
    }
  };

  const handleMissClick = () => {
    setMissed(prev => prev + 1);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const totalClicks = score + missed;
  const accuracy = totalClicks > 0 ? Math.round((score / totalClicks) * 100) : 0;
  const avgReactionTime = targetClicks.length > 0
    ? Math.round(targetClicks.reduce((a, b) => a + b, 0) / targetClicks.length)
    : 0;

  const seoContent = (
    <>
      <p>
        <strong>Aim Trainer</strong> helps improve your mouse accuracy and reaction speed. 
        This game is popular among FPS gamers for warming up and improving precision.
      </p>
      <p>
        <strong>How it works:</strong> Click the targets as quickly as possible. 
        Each target appears in a random location. You have 30 seconds to hit as many as you can.
      </p>
      <p>
        <strong>Benefits:</strong> Regular practice improves hand-eye coordination, mouse control, 
        reaction time, and precision - essential skills for gaming and general computer use.
      </p>
      <p>
        <strong>Tips for improvement:</strong> Use a good mouse and mousepad, adjust sensitivity, 
        focus on accuracy before speed, keep your wrist relaxed, and practice daily.
      </p>
    </>
  );

  return (
    <GameLayout seoTitle="About Aim Trainer" seoContent={seoContent}>
      <div className="h-full bg-gradient-to-br from-red-900 to-pink-900 flex flex-col items-center justify-center rounded-3xl min-h-[600px] p-4 sm:p-8">
        
        {/* Start State */}
        {gameState === 'start' && (
          <div className="text-center text-white max-w-2xl px-4">
            <div className="mb-8">
              <div className="text-6xl sm:text-8xl mb-6">🎯</div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">Aim Trainer</h1>
            <p className="text-lg sm:text-xl mb-4 opacity-90">
              Click the targets as fast as you can!
            </p>
            <p className="text-base sm:text-lg mb-8 opacity-75">
              Test your mouse accuracy and reaction speed.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold mb-1">30s</p>
                  <p className="text-xs sm:text-sm opacity-75">Time Limit</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold mb-1">∞</p>
                  <p className="text-xs sm:text-sm opacity-75">Targets</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold mb-1">100%</p>
                  <p className="text-xs sm:text-sm opacity-75">Accuracy</p>
                </div>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 rounded-xl font-bold text-lg sm:text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Start Training
            </button>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <div className="w-full max-w-6xl flex flex-col h-full">
            {/* Stats Bar */}
            <div className="flex justify-between items-center mb-3 sm:mb-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 gap-2">
              <div className="text-center flex-1">
                <p className="text-xs sm:text-sm text-white/75 mb-1">Time</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{timeLeft}s</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-xs sm:text-sm text-white/75 mb-1">Score</p>
                <p className="text-xl sm:text-2xl font-bold text-green-400">{score}</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-xs sm:text-sm text-white/75 mb-1">Missed</p>
                <p className="text-xl sm:text-2xl font-bold text-red-400">{missed}</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-xs sm:text-sm text-white/75 mb-1">Accuracy</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{accuracy}%</p>
              </div>
            </div>

            {/* Game Area */}
            <div 
              ref={gameAreaRef}
              onClick={handleMissClick}
              className="flex-1 bg-slate-900/50 rounded-xl relative cursor-crosshair overflow-hidden touch-none"
              style={{ minHeight: '300px', maxHeight: '600px' }}
            >
              {targets.map(target => (
                <button
                  key={target.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTargetClick(target.id);
                  }}
                  className="absolute bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-lg active:scale-95 transition-transform duration-100 flex items-center justify-center font-bold text-white border-2 sm:border-4 border-white/30"
                  style={{
                    left: `${target.x}px`,
                    top: `${target.y}px`,
                    width: `${target.size}px`,
                    height: `${target.size}px`,
                  }}
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                </button>
              ))}

              {targets.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  <p className="text-lg sm:text-xl">Get ready...</p>
                </div>
              )}
            </div>

            <div className="text-center mt-3 sm:mt-4">
              <button 
                onClick={endGame}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition text-sm sm:text-base"
              >
                End Training
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {gameState === 'results' && (
          <div className="text-center text-white max-w-2xl px-4">
            <div className="mb-8">
              <div className="text-6xl sm:text-8xl mb-6">🏆</div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">{score}</h1>
            <p className="text-xl sm:text-2xl mb-8 opacity-90">Targets Hit</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 mb-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold mb-2 text-green-400">{accuracy}%</p>
                  <p className="text-base sm:text-lg opacity-75">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold mb-2">{avgReactionTime}ms</p>
                  <p className="text-base sm:text-lg opacity-75">Avg Time</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 border-t border-white/20 pt-6">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold mb-2">{score}</p>
                  <p className="text-xs sm:text-sm opacity-75">Hits</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold mb-2 text-red-400">{missed}</p>
                  <p className="text-xs sm:text-sm opacity-75">Misses</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6 mt-6">
                <p className="text-base sm:text-lg mb-4 opacity-90">Your Performance:</p>
                {accuracy >= 90 && <p className="text-lg sm:text-xl">🎯 Sharpshooter - Incredible precision!</p>}
                {accuracy >= 75 && accuracy < 90 && <p className="text-lg sm:text-xl">🔥 Marksman - Great accuracy!</p>}
                {accuracy >= 60 && accuracy < 75 && <p className="text-lg sm:text-xl">⚡ Good - Keep practicing!</p>}
                {accuracy >= 40 && accuracy < 60 && <p className="text-lg sm:text-xl">📈 Improving - You're getting there!</p>}
                {accuracy < 40 && <p className="text-lg sm:text-xl">🎮 Beginner - Practice makes perfect!</p>}
              </div>

              <div className="mt-6 text-xs sm:text-sm opacity-75 text-left space-y-1">
                <p>• Beginner: 50-60% accuracy</p>
                <p>• Intermediate: 70-80% accuracy</p>
                <p>• Advanced: 85-95% accuracy</p>
                <p>• Pro: 95%+ accuracy</p>
              </div>
            </div>
            
            <button 
              onClick={startGame}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 rounded-xl font-bold text-lg sm:text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Train Again
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}