// ============================================
// FILE: app/games/number-memory/page.tsx
// ============================================
'use client';

import { useState, useEffect, useRef } from 'react';
import GameLayout from '@/components/GameLayout';

export default function NumberMemoryGame() {
  const [gameState, setGameState] = useState<'start' | 'showing' | 'input' | 'correct' | 'wrong' | 'results'>('start');
  const [level, setLevel] = useState<number>(1);
  const [currentNumber, setCurrentNumber] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [lives, setLives] = useState<number>(3);
  const [highestLevel, setHighestLevel] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateNumber = (digits: number): string => {
    let number = '';
    for (let i = 0; i < digits; i++) {
      if (i === 0) {
        number += Math.floor(Math.random() * 9) + 1;
      } else {
        number += Math.floor(Math.random() * 10);
      }
    }
    return number;
  };

  const startGame = () => {
    setLevel(1);
    setLives(3);
    setHighestLevel(0);
    startLevel(1);
  };

  const startLevel = (currentLevel: number) => {
    const number = generateNumber(currentLevel);
    setCurrentNumber(number);
    setUserInput('');
    setGameState('showing');

    setTimeout(() => {
      setGameState('input');
    }, 1000);
  };

  useEffect(() => {
    if (gameState === 'input' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState]);

  const handleSubmit = () => {
    if (!userInput) return;

    if (userInput === currentNumber) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setHighestLevel(Math.max(highestLevel, level));
      setGameState('correct');

      setTimeout(() => {
        startLevel(newLevel);
      }, 1000);
    } else {
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives === 0) {
        setHighestLevel(Math.max(highestLevel, level - 1));
        setGameState('results');
      } else {
        setGameState('wrong');
        setTimeout(() => {
          startLevel(level);
        }, 1500);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const seoContent = (
    <>
      <p>
        <strong>Number Memory Test</strong> challenges your ability to remember increasingly long sequences of numbers. 
        This test measures your short-term memory capacity and visual memory skills.
      </p>
      <p>
        <strong>How it works:</strong> A number appears on screen for 1 second. After it disappears, 
        type the number you saw. Each level adds one more digit. The average person can remember 7±2 digits.
      </p>
      <p>
        <strong>Benefits:</strong> Regular practice improves working memory, concentration, and cognitive performance. 
        Memory training has been shown to enhance academic and professional performance.
      </p>
      <p>
        <strong>Tips for better scores:</strong> Visualize the number, try chunking digits into groups, 
        stay relaxed, and practice daily. Some people find it helpful to say the numbers out loud mentally.
      </p>
    </>
  );

  return (
    <GameLayout 
      seoTitle="About Number Memory Test"
      seoContent={seoContent}
    >
      <div className="h-full bg-gradient-to-br from-green-500 to-emerald-600 flex flex-col items-center justify-center rounded-3xl min-h-[600px] relative p-4 sm:p-8">
        <div className="text-center text-white px-4">
          
          {/* Start State */}
          {gameState === 'start' && (
            <>
              <div className="mb-6 sm:mb-8">
                <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🔢</div>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6">Number Memory</h1>
              <p className="text-lg sm:text-2xl mb-3 sm:mb-4 opacity-90">
                Memorize the number that appears on screen.
              </p>
              <p className="text-base sm:text-xl mb-2 opacity-75">
                Each level adds one more digit.
              </p>
              <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-75">
                You have 3 lives. Good luck!
              </p>
              <button 
                onClick={startGame}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-600 rounded-xl font-bold text-lg sm:text-xl hover:bg-opacity-90 transition transform hover:scale-105"
              >
                Start Game
              </button>
            </>
          )}

          {/* Showing Number */}
          {gameState === 'showing' && (
            <>
              <div className="mb-6 sm:mb-8">
                <p className="text-xl sm:text-2xl opacity-75 mb-4">Level {level}</p>
              </div>
              <h1 className="text-6xl sm:text-8xl font-bold mb-6 sm:mb-8 tracking-wider">
                {currentNumber}
              </h1>
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </>
          )}

          {/* Input State */}
          {gameState === 'input' && (
            <>
              <div className="mb-6 sm:mb-8">
                <p className="text-xl sm:text-2xl opacity-75 mb-4">Level {level}</p>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">What was the number?</h2>
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.replace(/[^0-9]/g, ''))}
                onKeyPress={handleKeyPress}
                className="w-full max-w-xs sm:max-w-md px-4 sm:px-6 py-3 sm:py-4 text-2xl sm:text-3xl text-center rounded-xl bg-white text-gray-900 font-bold mb-4 sm:mb-6 focus:outline-none focus:ring-4 focus:ring-white/50"
                placeholder="Type here..."
                autoComplete="off"
              />
              <br />
              <button 
                onClick={handleSubmit}
                disabled={!userInput}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-600 rounded-xl font-bold text-lg sm:text-xl hover:bg-opacity-90 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Submit
              </button>
            </>
          )}

          {/* Correct Answer */}
          {gameState === 'correct' && (
            <>
              <div className="mb-6 sm:mb-8">
                <svg className="w-24 h-24 sm:w-32 sm:h-32 mx-auto" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="4" fill="none"/>
                  <path d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold mb-3 sm:mb-4">Correct!</h1>
              <p className="text-xl sm:text-2xl opacity-90">Level {level - 1} complete</p>
              <p className="text-lg sm:text-xl opacity-75 mt-2">Next: {level} digits</p>
            </>
          )}

          {/* Wrong Answer */}
          {gameState === 'wrong' && (
            <>
              <div className="mb-6 sm:mb-8">
                <svg className="w-24 h-24 sm:w-32 sm:h-32 mx-auto" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="4" fill="none"/>
                  <path d="M35 35 L65 65 M65 35 L35 65" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold mb-3 sm:mb-4">Incorrect!</h1>
              <p className="text-2xl sm:text-3xl mb-2">The number was: <span className="font-mono">{currentNumber}</span></p>
              <p className="text-xl sm:text-2xl opacity-90 mb-2">Lives remaining: {lives}</p>
              <p className="text-lg sm:text-xl opacity-75">Try again...</p>
            </>
          )}

          {/* Results */}
          {gameState === 'results' && (
            <>
              <div className="mb-6 sm:mb-8">
                <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🏆</div>
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold mb-4 sm:mb-6">{highestLevel}</h1>
              <p className="text-2xl sm:text-3xl mb-6 sm:mb-8 opacity-90">Highest Level Reached</p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-md mx-auto">
                <p className="text-lg sm:text-xl mb-2">You remembered up to:</p>
                <p className="text-3xl sm:text-4xl font-bold mb-4">{highestLevel} digits</p>
                
                <div className="text-left text-xs sm:text-sm opacity-75 mt-4 space-y-1">
                  <p>• Average: 7 digits</p>
                  <p>• Good: 9+ digits</p>
                  <p>• Excellent: 12+ digits</p>
                </div>
              </div>
              
              <button 
                onClick={startGame}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-600 rounded-xl font-bold text-lg sm:text-xl hover:bg-opacity-90 transition transform hover:scale-105"
              >
                Play Again
              </button>
            </>
          )}
        </div>

        {/* Lives Indicator */}
        {gameState !== 'start' && gameState !== 'results' && (
          <div className="absolute top-4 sm:top-8 right-4 sm:right-8">
            <div className="flex gap-1 sm:gap-2">
              {[1, 2, 3].map((heart) => (
                <div key={heart}>
                  {heart <= lives ? (
                    <span className="text-2xl sm:text-3xl">❤️</span>
                  ) : (
                    <span className="text-2xl sm:text-3xl opacity-30">🖤</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Level Indicator */}
        {gameState !== 'start' && gameState !== 'results' && (
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2">
              <p className="text-white font-bold text-base sm:text-lg">Level {level}</p>
              <p className="text-white/80 text-xs sm:text-sm">{level} {level === 1 ? 'digit' : 'digits'}</p>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
}