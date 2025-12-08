// ============================================
// FILE: app/games/precision-click/page.tsx
// ============================================
'use client';

import { useEffect, useRef, useState } from 'react';
import GameLayout from '@/components/GameLayout';

export default function PrecisionClickGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  const [gameState, setGameState] = useState<'start' | 'playing' | 'results'>('start');
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);

  const maxLevel = 15;

  const ballRadius = 12;
  const [circleSize, setCircleSize] = useState(150);

  // Ball positions and directions (refs for mutable state without re-render)
  const ball1 = useRef({ x: 50, y: 400, dir: 1 }); // horizontal
  const ball2 = useRef({ x: 400, y: 50, dir: 1 }); // vertical

  const startGame = () => {
    setLevel(1);
    setLives(3);
    setCircleSize(150);
    ball1.current = { x: 50, y: 400, dir: 1 };
    ball2.current = { x: 400, y: 50, dir: 1 };
    setGameState('playing');
  };

  const nextLevel = () => {
    if (level < maxLevel) {
      setLevel(level + 1);
      setCircleSize(150 - (level) * 8);
      ball1.current = { x: 50, y: 400, dir: 1 };
      ball2.current = { x: 400, y: 50, dir: 1 };
    } else {
      setGameState('results');
    }
  };

  const loseLife = () => {
    const newLives = lives - 1;
    setLives(newLives);
    if (newLives <= 0) setGameState('results');
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const centerX = 400;
    const centerY = 400;
    const radius = circleSize / 2;

    const ball1Dist = Math.hypot(ball1.current.x - centerX, ball1.current.y - centerY);
    const ball2Dist = Math.hypot(ball2.current.x - centerX, ball2.current.y - centerY);

    if (ball1Dist <= radius && ball2Dist <= radius) nextLevel();
    else loseLife();
  };

  const getBallSpeed = () => 2 + (level - 1) * 0.3;

  // ---------------- Animation Loop ----------------
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const speed = getBallSpeed();

      // Update horizontal ball
      ball1.current.x += ball1.current.dir * speed;
      if (ball1.current.x <= 20) ball1.current.dir = 1;
      else if (ball1.current.x >= 780) ball1.current.dir = -1;

      // Update vertical ball
      ball2.current.y += ball2.current.dir * speed;
      if (ball2.current.y <= 20) ball2.current.dir = 1;
      else if (ball2.current.y >= 780) ball2.current.dir = -1;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw path lines
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 2;
      // Horizontal path
      ctx.beginPath();
      ctx.moveTo(20, 400);
      ctx.lineTo(780, 400);
      ctx.stroke();
      // Vertical path
      ctx.beginPath();
      ctx.moveTo(400, 20);
      ctx.lineTo(400, 780);
      ctx.stroke();

      // Draw target circle
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 6]);
      ctx.beginPath();
      ctx.arc(400, 400, circleSize / 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw crosshair
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(390, 400);
      ctx.lineTo(410, 400);
      ctx.moveTo(400, 390);
      ctx.lineTo(400, 410);
      ctx.stroke();

      // Draw balls with gradient effect
      // Ball 1 (horizontal) - purple
      const gradient1 = ctx.createRadialGradient(ball1.current.x, ball1.current.y, 0, ball1.current.x, ball1.current.y, ballRadius);
      gradient1.addColorStop(0, '#a855f7');
      gradient1.addColorStop(1, '#7c3aed');
      ctx.fillStyle = gradient1;
      ctx.beginPath();
      ctx.arc(ball1.current.x, ball1.current.y, ballRadius, 0, Math.PI * 2);
      ctx.fill();

      // Ball 2 (vertical) - pink
      const gradient2 = ctx.createRadialGradient(ball2.current.x, ball2.current.y, 0, ball2.current.x, ball2.current.y, ballRadius);
      gradient2.addColorStop(0, '#ec4899');
      gradient2.addColorStop(1, '#db2777');
      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.arc(ball2.current.x, ball2.current.y, ballRadius, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [gameState, level, circleSize]);

  const seoContent = (
    <>
      <p>
        <strong>Precision Click Challenge</strong> tests your ability to track multiple moving objects 
        and time a perfect click. This game challenges coordination, timing, and multitasking skills.
      </p>
      <p>
        <strong>How it works:</strong> Two balls move across the screen - one horizontally, one vertically. 
        Click when BOTH balls are inside the target circle. Each level gets harder with a smaller circle 
        and faster balls.
      </p>
    </>
  );

  return (
    <GameLayout seoTitle="Precision Click Challenge" seoContent={seoContent}>
      <div className="h-full bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex flex-col items-center justify-center rounded-3xl min-h-[600px] p-8">
        
        {/* Start State */}
        {gameState === 'start' && (
          <div className="text-center text-white max-w-2xl">
            <div className="mb-8">
              <div className="text-8xl mb-6">🎯</div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Precision Click Challenge</h1>
            <p className="text-xl mb-6 opacity-90">
              Click when BOTH balls are inside the circle!
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
              <h3 className="text-lg font-bold mb-3">How to Play:</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Two balls move across the screen</li>
                <li>• One moves horizontally, one vertically</li>
                <li>• Click the canvas when BOTH are inside the circle</li>
                <li>• Complete 15 levels with increasing difficulty</li>
                <li>• You have 3 lives - don't waste them!</li>
              </ul>
            </div>

            <button 
              onClick={startGame}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Start Challenge
            </button>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 text-white">
              <div className="text-xl font-bold">Level {level}/{maxLevel}</div>
              <div className="flex gap-2">
                {[1, 2, 3].map(h => (
                  <span key={h} className="text-3xl">{h <= lives ? '❤️' : '🖤'}</span>
                ))}
              </div>
            </div>

            {/* Instruction */}
            <div className="text-center text-white/80 mb-4 text-lg">
              Click when both balls are inside the circle
            </div>

            {/* Canvas */}
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={800} 
              className="bg-slate-900 rounded-xl cursor-crosshair mx-auto block shadow-2xl" 
              onClick={handleClick}
            />

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-white text-sm mb-2">
                <span>Progress</span>
                <span>{level}/{maxLevel}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(level / maxLevel) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {gameState === 'results' && (
          <div className="text-center text-white max-w-2xl">
            <div className="mb-8">
              {level >= maxLevel ? (
                <>
                  <div className="text-8xl mb-6">🏆</div>
                  <h1 className="text-6xl font-bold mb-4">Perfect!</h1>
                  <p className="text-2xl mb-8 opacity-90">You completed all 15 levels!</p>
                </>
              ) : (
                <>
                  <div className="text-8xl mb-6">💔</div>
                  <h1 className="text-6xl font-bold mb-4">Game Over</h1>
                  <p className="text-2xl mb-8 opacity-90">You reached level {level}</p>
                </>
              )}
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">{level - 1}</p>
                  <p className="text-lg opacity-75">Levels Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">{level >= maxLevel ? '100%' : `${Math.round(((level - 1) / maxLevel) * 100)}%`}</p>
                  <p className="text-lg opacity-75">Progress</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <p className="text-lg mb-4 opacity-90">Your Performance:</p>
                {level >= maxLevel && <p className="text-xl">🌟 Master - Perfect precision!</p>}
                {level >= 12 && level < maxLevel && <p className="text-xl">🔥 Expert - Almost there!</p>}
                {level >= 8 && level < 12 && <p className="text-xl">⚡ Advanced - Great job!</p>}
                {level >= 5 && level < 8 && <p className="text-xl">📈 Intermediate - Keep practicing!</p>}
                {level < 5 && <p className="text-xl">🎯 Beginner - Try again!</p>}
              </div>
            </div>
            
            <button 
              onClick={startGame}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
