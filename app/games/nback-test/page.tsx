// ============================================
// FILE: app/games/nback-test/page.tsx
// ============================================
'use client';

import { useState, useEffect, useRef } from 'react';
import GameLayout from '@/components/GameLayout';

export default function NBackTest() {
  const [gameState, setGameState] = useState('start'); // start, playing, results
  const [nLevel, setNLevel] = useState(1); // 1-back, 2-back, 3-back, etc.
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [falsePositives, setFalsePositives] = useState(0);
  const [userResponded, setUserResponded] = useState(false);
  
  const sequenceLength = 20 + nLevel * 5; // Longer sequences for higher N
  const showDuration = 500; // Show each position for 500ms
  const gapDuration = 2000; // 2 second gap between positions

  const startGame = () => {
    const newSequence = generateSequence(sequenceLength, nLevel);
    setSequence(newSequence);
    setCurrentIndex(0);
    setScore(0);
    setMissed(0);
    setFalsePositives(0);
    setGameState('playing');
  };

  const generateSequence = (length: number, n: number) => {
    const seq: number[] = [];
    const gridSize = 9; // 3x3 grid
    
    for (let i = 0; i < length; i++) {
      if (i >= n && Math.random() < 0.3) {
        // 30% chance to repeat the position from N steps back
        seq.push(seq[i - n]);
      } else {
        // Random position, but avoid immediate repeats
        let pos;
        do {
          pos = Math.floor(Math.random() * gridSize);
        } while (i > 0 && pos === seq[i - 1]);
        seq.push(pos);
      }
    }
    
    return seq;
  };

  const isMatch = () => {
    if (currentIndex < nLevel) return false;
    return sequence[currentIndex] === sequence[currentIndex - nLevel];
  };

  const handleMatch = () => {
    if (userResponded) return;
    setUserResponded(true);
    
    if (isMatch()) {
      setScore(score + 1);
    } else {
      setFalsePositives(falsePositives + 1);
    }
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (currentIndex >= sequence.length) {
      setGameState('results');
      return;
    }

    setUserResponded(false);

    // Show square
    const showTimer = setTimeout(() => {
      // Check if user should have pressed but didn't
      if (!userResponded && isMatch()) {
        setMissed(missed + 1);
      }
      
      // Move to next after gap
      const gapTimer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, gapDuration);

      return () => clearTimeout(gapTimer);
    }, showDuration);

    return () => clearTimeout(showTimer);
  }, [currentIndex, gameState]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === 'playing' && e.key === ' ') {
        e.preventDefault();
        handleMatch();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, userResponded, currentIndex, nLevel]);

  const totalMatches = sequence.filter((pos, i) => {
    if (i < nLevel) return false;
    return pos === sequence[i - nLevel];
  }).length;

  const accuracy = totalMatches > 0 
    ? Math.round((score / totalMatches) * 100) 
    : 0;

  const selectNLevel = (n: number) => {
    setNLevel(n);
  };

  const seoContent = (
    <>
      <p>
        <strong>N-Back Test</strong> is a scientifically proven working memory exercise. 
        It challenges your ability to remember and match positions from N steps back in a sequence.
      </p>
      <p>
        <strong>How it works:</strong> Watch squares light up in a 3x3 grid. Press SPACE when 
        the current position matches the position from N steps back. Start with 1-back (previous position) 
        and work up to harder levels.
      </p>
      <p>
        <strong>Benefits:</strong> Research shows N-back training can improve fluid intelligence, 
        working memory capacity, and cognitive control. Used in cognitive research since 1958.
      </p>
      <p>
        <strong>Tips for success:</strong> Start with 1-back, focus intensely, practice daily, 
        don't guess randomly, and gradually increase difficulty as you improve.
      </p>
    </>
  );

  return (
    <GameLayout 
      seoTitle="About N-Back Test"
      seoContent={seoContent}
    >
      <div className="h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col items-center justify-center rounded-3xl min-h-[600px] p-8">
        
        {/* Start State */}
        {gameState === 'start' && (
          <div className="text-center text-white max-w-2xl">
            <div className="mb-8">
              <div className="text-8xl mb-6">🧠</div>
            </div>
            <h1 className="text-5xl font-bold mb-6">N-Back Test</h1>
            <p className="text-xl mb-6 opacity-90">
              The ultimate working memory challenge
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
              <h3 className="text-lg font-bold mb-3">How to Play:</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Watch squares light up in a 3×3 grid</li>
                <li>• Press <kbd className="px-2 py-1 bg-white/20 rounded">SPACE</kbd> when position matches N steps back</li>
                <li>• <strong>1-Back:</strong> Match the previous position</li>
                <li>• <strong>2-Back:</strong> Match 2 positions ago</li>
                <li>• <strong>3-Back:</strong> Match 3 positions ago (expert!)</li>
                <li>• Don't press if it's not a match</li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="text-lg mb-4 opacity-90">Select Difficulty:</p>
              <div className="flex gap-4 justify-center">
                {[1, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => selectNLevel(n)}
                    className={`px-6 py-3 rounded-xl font-bold text-lg transition transform hover:scale-105 ${
                      nLevel === n
                        ? 'bg-white text-indigo-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {n}-Back
                  </button>
                ))}
              </div>
              <div className="mt-4 text-sm opacity-75">
                {nLevel === 1 && '👶 Beginner - Remember 1 position back'}
                {nLevel === 2 && '📈 Intermediate - Remember 2 positions back'}
                {nLevel === 3 && '🔥 Advanced - Remember 3 positions back'}
                {nLevel === 4 && '🧠 Expert - Remember 4 positions back'}
              </div>
            </div>

            <button 
              onClick={startGame}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Start {nLevel}-Back Test
            </button>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 text-white">
              <div className="text-xl font-bold">{nLevel}-Back Test</div>
              <div className="text-lg">
                {currentIndex + 1} / {sequence.length}
              </div>
            </div>

            {/* Instruction */}
            <div className="text-center text-white/80 mb-6 text-lg">
              Press <kbd className="px-3 py-1 bg-white/20 rounded font-mono">SPACE</kbd> when position matches {nLevel} step{nLevel > 1 ? 's' : ''} back
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              {Array.from({ length: 9 }).map((_, index) => {
                const isActive = sequence[currentIndex] === index;
                
                return (
                  <div
                    key={index}
                    className={`
                      aspect-square rounded-2xl transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-br from-blue-400 to-indigo-400 shadow-lg shadow-blue-500/50 scale-95' 
                        : 'bg-slate-800/50 border-2 border-white/10'
                      }
                    `}
                  />
                );
              })}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 text-center text-white mb-6">
              <div className="bg-green-500/20 rounded-xl p-4">
                <p className="text-3xl font-bold">{score}</p>
                <p className="text-sm opacity-75">Correct</p>
              </div>
              <div className="bg-red-500/20 rounded-xl p-4">
                <p className="text-3xl font-bold">{missed}</p>
                <p className="text-sm opacity-75">Missed</p>
              </div>
              <div className="bg-orange-500/20 rounded-xl p-4">
                <p className="text-3xl font-bold">{falsePositives}</p>
                <p className="text-sm opacity-75">False</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / sequence.length) * 100}%` }}
              />
            </div>

            {/* Hint for beginners */}
            {currentIndex < 3 && (
              <div className="text-center text-white/60 text-sm mt-4">
                {currentIndex < nLevel 
                  ? `Building history... (${currentIndex + 1}/${nLevel})` 
                  : 'Now you can start matching!'
                }
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {gameState === 'results' && (
          <div className="text-center text-white max-w-2xl">
            <div className="mb-8">
              <div className="text-8xl mb-6">
                {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '⭐' : '🧠'}
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-4">{accuracy}%</h1>
            <p className="text-2xl mb-8 opacity-90">Accuracy</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-400 mb-2">{score}</p>
                  <p className="text-sm opacity-75">Correct</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-400 mb-2">{missed}</p>
                  <p className="text-sm opacity-75">Missed</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-400 mb-2">{falsePositives}</p>
                  <p className="text-sm opacity-75">False Alarms</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6 mb-6">
                <p className="text-lg mb-2">
                  <strong>{nLevel}-Back</strong> Performance:
                </p>
                {accuracy >= 90 && <p className="text-xl">🌟 Outstanding - Elite memory!</p>}
                {accuracy >= 75 && accuracy < 90 && <p className="text-xl">🔥 Excellent - Strong performance!</p>}
                {accuracy >= 60 && accuracy < 75 && <p className="text-xl">⚡ Good - Above average!</p>}
                {accuracy >= 40 && accuracy < 60 && <p className="text-xl">📈 Fair - Keep practicing!</p>}
                {accuracy < 40 && <p className="text-xl">💪 Try again - This is tough!</p>}
              </div>

              <div className="text-sm opacity-75 text-left space-y-1">
                <p>• <strong>Total matches:</strong> {totalMatches}</p>
                <p>• <strong>Sequence length:</strong> {sequence.length}</p>
                <p>• <strong>Your response rate:</strong> {Math.round(((score + falsePositives) / sequence.length) * 100)}%</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={startGame}
                className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-opacity-90 transition transform hover:scale-105"
              >
                Try {nLevel}-Back Again
              </button>
              <button 
                onClick={() => setGameState('start')}
                className="px-6 py-3 bg-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/30 transition transform hover:scale-105"
              >
                Change Difficulty
              </button>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
