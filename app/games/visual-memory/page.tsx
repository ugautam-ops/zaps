// ============================================
// FILE: app/games/visual-memory/page.tsx
// ============================================
'use client';

import { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';

export default function VisualMemoryGame() {
  const [gameState, setGameState] = useState('start'); // start, memorize, recall, correct, wrong, results
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [gridSize, setGridSize] = useState(3); // 3x3, 4x4, 5x5, etc.
  const [activeSquares, setActiveSquares] = useState<number[]>([]);
  const [selectedSquares, setSelectedSquares] = useState<number[]>([]);

  const startGame = () => {
    setLevel(1);
    setLives(3);
    setGridSize(3);
    startLevel(1, 3);
  };

  const startLevel = (currentLevel: number, currentGridSize: number) => {
    setLevel(currentLevel);
    setGridSize(currentGridSize);
    setSelectedSquares([]);
    
    // Calculate how many squares to show
    const totalSquares = currentGridSize * currentGridSize;
    const numToShow = Math.min(currentLevel + 2, Math.floor(totalSquares * 0.6));
    
    // Generate random squares
    const squares: number[] = [];
    while (squares.length < numToShow) {
      const randomIndex = Math.floor(Math.random() * totalSquares);
      if (!squares.includes(randomIndex)) {
        squares.push(randomIndex);
      }
    }
    
    setActiveSquares(squares);
    setGameState('memorize');
    
    // Show for 2 seconds, then hide
    setTimeout(() => {
      setGameState('recall');
    }, 2000);
  };

  const handleSquareClick = (index: number) => {
    if (gameState !== 'recall') return;
    
    // Toggle selection
    if (selectedSquares.includes(index)) {
      setSelectedSquares(selectedSquares.filter(i => i !== index));
    } else {
      setSelectedSquares([...selectedSquares, index]);
    }
  };

  const handleSubmit = () => {
    // Check if correct
    const correctCount = selectedSquares.filter(i => activeSquares.includes(i)).length;
    const wrongCount = selectedSquares.filter(i => !activeSquares.includes(i)).length;
    const missedCount = activeSquares.length - correctCount;
    
    if (wrongCount === 0 && missedCount === 0) {
      // Perfect! Next level
      setGameState('correct');
      setTimeout(() => {
        const nextLevel = level + 1;
        let nextGridSize = gridSize;
        
        // Increase grid size every 3 levels
        if (nextLevel % 3 === 1 && nextLevel > 1) {
          nextGridSize = Math.min(gridSize + 1, 7); // Max 7x7
        }
        
        startLevel(nextLevel, nextGridSize);
      }, 1000);
    } else {
      // Wrong!
      setGameState('wrong');
      const newLives = lives - 1;
      setLives(newLives);
      
      setTimeout(() => {
        if (newLives === 0) {
          setGameState('results');
        } else {
          // Try same level again
          startLevel(level, gridSize);
        }
      }, 1500);
    }
  };

  const seoContent = (
    <>
      <p>
        <strong>Visual Memory Test</strong> challenges your ability to remember and recall visual patterns. 
        This test measures short-term visual memory and spatial awareness.
      </p>
      <p>
        <strong>How it works:</strong> Squares light up on a grid. Memorize their positions. 
        After they disappear, click the squares you remember. Progress through increasing difficulty levels.
      </p>
      <p>
        <strong>Benefits:</strong> Improves visual memory, pattern recognition, spatial awareness, 
        and concentration - valuable skills for learning, problem-solving, and everyday tasks.
      </p>
      <p>
        <strong>Tips for success:</strong> Focus on patterns, use chunking (group squares together), 
        visualize the grid, and practice regularly to improve your visual memory capacity.
      </p>
    </>
  );

  return (
    <GameLayout 
      seoTitle="About Visual Memory Test"
      seoContent={seoContent}
    >
      <div className="h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center rounded-3xl min-h-[600px] p-8">
        
        {/* Start State */}
        {gameState === 'start' && (
          <div className="text-center text-white max-w-2xl">
            <div className="mb-8">
              <div className="text-8xl mb-6">🧠</div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Visual Memory Test</h1>
            <p className="text-xl mb-6 opacity-90">
              Memorize the pattern and recall it!
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
              <h3 className="text-lg font-bold mb-3">How to Play:</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Watch the squares light up on the grid</li>
                <li>• Memorize their positions (2 seconds)</li>
                <li>• Click the squares you remember</li>
                <li>• Each level adds more squares</li>
                <li>• Grid gets bigger every 3 levels</li>
                <li>• You have 3 lives</li>
              </ul>
            </div>

            <button 
              onClick={startGame}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Start Test
            </button>
          </div>
        )}

        {/* Memorize & Recall States */}
        {(gameState === 'memorize' || gameState === 'recall') && (
          <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 text-white">
              <div className="text-xl font-bold">Level {level}</div>
              <div className="flex gap-2">
                {[1, 2, 3].map(h => (
                  <span key={h} className="text-3xl">{h <= lives ? '❤️' : '🖤'}</span>
                ))}
              </div>
            </div>

            {/* Instruction */}
            <div className="text-center text-white mb-6">
              {gameState === 'memorize' && (
                <p className="text-2xl font-bold animate-pulse">Memorize the pattern...</p>
              )}
              {gameState === 'recall' && (
                <p className="text-2xl font-bold">Click the squares you remember</p>
              )}
            </div>

            {/* Grid */}
            <div 
              className="grid gap-3 mx-auto mb-6"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                maxWidth: `${gridSize * 90}px`
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, index) => {
                const isActive = activeSquares.includes(index);
                const isSelected = selectedSquares.includes(index);
                const showActive = gameState === 'memorize' && isActive;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleSquareClick(index)}
                    disabled={gameState === 'memorize'}
                    className={`
                      aspect-square rounded-xl transition-all duration-200
                      ${showActive 
                        ? 'bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50 scale-95' 
                        : isSelected
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-500'
                        : 'bg-slate-800/50 hover:bg-slate-700/70'
                      }
                      ${gameState === 'recall' ? 'cursor-pointer' : 'cursor-default'}
                      border-2 border-white/10 hover:border-white/30
                    `}
                  />
                );
              })}
            </div>

            {/* Submit Button */}
            {gameState === 'recall' && (
              <div className="text-center">
                <button 
                  onClick={handleSubmit}
                  disabled={selectedSquares.length === 0}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-xl hover:bg-opacity-90 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Submit ({selectedSquares.length})
                </button>
              </div>
            )}

            {/* Info */}
            <div className="text-center text-white/60 text-sm mt-4">
              Grid: {gridSize}x{gridSize} • Squares to remember: {activeSquares.length}
            </div>
          </div>
        )}

        {/* Correct State */}
        {gameState === 'correct' && (
          <div className="text-center text-white">
            <div className="text-8xl mb-6">✅</div>
            <h2 className="text-5xl font-bold mb-4">Perfect!</h2>
            <p className="text-2xl opacity-90">Level {level} complete</p>
          </div>
        )}

        {/* Wrong State */}
        {gameState === 'wrong' && (
          <div className="text-center text-white">
            <div className="text-8xl mb-6">❌</div>
            <h2 className="text-5xl font-bold mb-4">Not quite!</h2>
            <p className="text-2xl opacity-90 mb-2">Lives remaining: {lives}</p>
            <p className="text-lg opacity-75">Try again...</p>
          </div>
        )}

        {/* Results */}
        {gameState === 'results' && (
          <div className="text-center text-white max-w-2xl">
            <div className="mb-8">
              <div className="text-8xl mb-6">🏆</div>
            </div>
            <h1 className="text-6xl font-bold mb-4">{level}</h1>
            <p className="text-2xl mb-8 opacity-90">Levels Completed</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">{level}</p>
                  <p className="text-lg opacity-75">Levels</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">{gridSize}x{gridSize}</p>
                  <p className="text-lg opacity-75">Final Grid</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <p className="text-lg mb-4 opacity-90">Your Performance:</p>
                {level >= 15 && <p className="text-xl">🌟 Master - Exceptional memory!</p>}
                {level >= 10 && level < 15 && <p className="text-xl">🔥 Expert - Impressive recall!</p>}
                {level >= 7 && level < 10 && <p className="text-xl">⚡ Advanced - Great memory!</p>}
                {level >= 4 && level < 7 && <p className="text-xl">📈 Intermediate - Good job!</p>}
                {level < 4 && <p className="text-xl">🧠 Beginner - Keep practicing!</p>}
              </div>

              <div className="mt-6 text-sm opacity-75 text-left space-y-1">
                <p>• Beginner: 1-3 levels</p>
                <p>• Intermediate: 4-6 levels</p>
                <p>• Advanced: 7-9 levels</p>
                <p>• Expert: 10-14 levels</p>
                <p>• Master: 15+ levels</p>
              </div>
            </div>
            
            <button 
              onClick={startGame}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
