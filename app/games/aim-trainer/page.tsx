// ============================================
// FILE: app/games/aim-trainer/page.tsx
// ============================================
'use client';

import { useState, useEffect, useRef } from 'react';
import GameLayout from '@/components/GameLayout';

export default function AimTrainerGame() {
  const [gameState, setGameState] = useState('start'); // start, playing, results
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetClicks, setTargetClicks] = useState([]);
  const timerRef = useRef(null);
  const gameAreaRef = useRef(null);

  const startGame = () => {
    setScore(0);
    setMissed(0);
    setTimeLeft(30);
    setTargetClicks([]);
    setGameState('playing');
    
    // Spawn first target after a small delay to ensure game area is rendered
    setTimeout(() => {
      spawnTarget();
    }, 100);

    // Start timer
    timerRef.current = setInterval(() => {
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
    if (gameAreaRef.current) {
      const container = gameAreaRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Make sure we have valid dimensions
      if (containerWidth > 100 && containerHeight > 100) {
        const targetSize = 60 + Math.random() * 20;
        const maxX = containerWidth - targetSize - 20;
        const maxY = containerHeight - targetSize - 20;
        
        const newTarget = {
          id: Date.now(),
          x: 20 + Math.random() * Math.max(0, maxX),
          y: 20 + Math.random() * Math.max(0, maxY),
          size: targetSize,
          spawnTime: Date.now()
        };

        setTargets([newTarget]);
      } else {
        // Retry if container isn't ready
        setTimeout(() => spawnTarget(), 50);
      }
    }
  };

  const handleTargetClick = (targetId) => {
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

  // Calculate stats
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
    <GameLayout 
      seoTitle="About Aim Trainer"
      seoContent={seoContent}
    >
      <div className="h-full bg-gradient-to-br from-red-900 to-pink-900 flex flex-col items-center justify-center rounded-3xl min-h-[600px] p-8">
        
        {/* Start State */}
        {gameState === 'start' && (
          <div className="text-center text-white max-w-2xl">
            <div className="mb-8">
              <div className="text-8xl mb-6">🎯</div>
            </div>
            <h1 className="text-6xl font-bold mb-6">Aim Trainer</h1>
            <p className="text-xl mb-4 opacity-90">
              Click the targets as fast as you can!
            </p>
            <p className="text-lg mb-8 opacity-75">
              Test your mouse accuracy and reaction speed.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold mb-1">30s</p>
                  <p className="text-sm opacity-75">Time Limit</p>
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">∞</p>
                  <p className="text-sm opacity-75">Targets</p>
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">100%</p>
                  <p className="text-sm opacity-75">Accuracy</p>
                </div>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Start Training
            </button>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <div className="w-full h-full flex flex-col">
            {/* Stats Bar */}
            <div className="flex justify-between items-center mb-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-center">
                <p className="text-sm text-white/75 mb-1">Time</p>
                <p className="text-2xl font-bold text-white">{timeLeft}s</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/75 mb-1">Score</p>
                <p className="text-2xl font-bold text-green-400">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/75 mb-1">Missed</p>
                <p className="text-2xl font-bold text-red-400">{missed}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/75 mb-1">Accuracy</p>
                <p className="text-2xl font-bold text-white">{accuracy}%</p>
              </div>
            </div>

            {/* Game Area */}
            <div 
              ref={gameAreaRef}
              onClick={handleMissClick}
              className="flex-1 bg-slate-900/50 rounded-xl relative cursor-crosshair overflow-hidden"
              style={{ minHeight: '400px' }}
            >
              {targets.map(target => (
                <button
                  key={target.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTargetClick(target.id);
                  }}
                  className="absolute bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-lg hover:scale-110 transition-transform duration-100 flex items-center justify-center font-bold text-white border-4 border-white/30"
                  style={{
                    left: `${target.x}px`,
                    top: `${target.y}px`,
                    width: `${target.size}px`,
                    height: `${target.size}px`,
                  }}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </button>
              ))}

              {/* Crosshair hint */}
              {targets.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  <p className="text-xl">Get ready...</p>
                </div>
              )}
            </div>

            <div className="text-center mt-4">
              <button 
                onClick={endGame}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition"
              >
                End Training
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {gameState === 'results' && (
          <div className="text-center text-white max-w-2xl">
            <div className="mb-8">
              <div className="text-8xl mb-6">🏆</div>
            </div>
            <h1 className="text-6xl font-bold mb-4">{score}</h1>
            <p className="text-2xl mb-8 opacity-90">Targets Hit</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2 text-green-400">{accuracy}%</p>
                  <p className="text-lg opacity-75">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">{avgReactionTime}ms</p>
                  <p className="text-lg opacity-75">Avg Time</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-white/20 pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold mb-2">{score}</p>
                  <p className="text-sm opacity-75">Hits</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-2 text-red-400">{missed}</p>
                  <p className="text-sm opacity-75">Misses</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6 mt-6">
                <p className="text-lg mb-4 opacity-90">Your Performance:</p>
                {accuracy >= 90 && <p className="text-xl">🎯 Sharpshooter - Incredible precision!</p>}
                {accuracy >= 75 && accuracy < 90 && <p className="text-xl">🔥 Marksman - Great accuracy!</p>}
                {accuracy >= 60 && accuracy < 75 && <p className="text-xl">⚡ Good - Keep practicing!</p>}
                {accuracy >= 40 && accuracy < 60 && <p className="text-xl">📈 Improving - You're getting there!</p>}
                {accuracy < 40 && <p className="text-xl">🎮 Beginner - Practice makes perfect!</p>}
              </div>

              <div className="mt-6 text-sm opacity-75 text-left space-y-1">
                <p>• Beginner: 50-60% accuracy</p>
                <p>• Intermediate: 70-80% accuracy</p>
                <p>• Advanced: 85-95% accuracy</p>
                <p>• Pro: 95%+ accuracy</p>
              </div>
            </div>
            
            <button 
              onClick={startGame}
              className="px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Train Again
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}