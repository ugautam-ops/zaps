// ============================================
// FILE: app/games/reaction/page.tsx
// ============================================
'use client';

import { useState, useEffect, useRef } from 'react';
import GameLayout from '@/components/GameLayout';

export default function ReactionTimeTest() {
  const [gameState, setGameState] = useState('start');
  const [attempts, setAttempts] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  const startTest = () => {
    setGameState('waiting');
    const delay = Math.random() * 3000 + 2000;
    
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'start') {
      startTest();
    } else if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setGameState('tooSoon');
    } else if (gameState === 'ready') {
      const reactionTime = Date.now() - startTimeRef.current;
      setCurrentTime(reactionTime);
      const newAttempts = [...attempts, reactionTime];
      setAttempts(newAttempts);
      
      if (newAttempts.length >= 5) {
        setGameState('results');
      } else {
        setGameState('clicked');
      }
    } else if (gameState === 'clicked') {
      startTest();
    } else if (gameState === 'tooSoon') {
      startTest();
    } else if (gameState === 'results') {
      setAttempts([]);
      setCurrentTime(null);
      setGameState('start');
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getBackgroundColor = () => {
    if (gameState === 'start') return 'bg-gradient-to-br from-blue-500 to-blue-600';
    if (gameState === 'waiting') return 'bg-gradient-to-br from-red-500 to-red-600';
    if (gameState === 'ready') return 'bg-gradient-to-br from-green-400 to-green-500';
    if (gameState === 'clicked') return 'bg-gradient-to-br from-blue-500 to-blue-600';
    if (gameState === 'tooSoon') return 'bg-gradient-to-br from-blue-500 to-blue-600';
    if (gameState === 'results') return 'bg-gradient-to-br from-purple-600 to-pink-600';
  };

  const averageTime = attempts.length > 0 
    ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length)
    : 0;

  const seoContent = (
    <>
      <p>
        The <strong>Reaction Time Test</strong> measures how quickly you can respond to a visual stimulus. 
        This cognitive test is widely used to assess reflexes, hand-eye coordination, and processing speed.
      </p>
      <p>
        <strong>How it works:</strong> Wait for the red screen to turn green, then click as fast as you can. 
        Your reaction time is measured in milliseconds (ms). The average human reaction time is around 200-300ms.
      </p>
      <p>
        <strong>Benefits:</strong> Regular practice can help improve your reflexes, gaming performance, 
        and overall cognitive speed. Track your progress over time to see improvements.
      </p>
      <p>
        <strong>Tips for better scores:</strong> Stay focused, avoid distractions, use a mouse instead 
        of a trackpad, and practice regularly. Remember, consistency is key!
      </p>
    </>
  );

  return (
    <GameLayout 
      seoTitle="About Reaction Time Test"
      seoContent={seoContent}
    >
      <div 
        className={`h-full ${getBackgroundColor()} flex flex-col items-center justify-center transition-all duration-300 cursor-pointer rounded-3xl min-h-[600px]`}
        onClick={handleClick}
      >
        <div className="text-center text-white px-4">
          {gameState === 'start' && (
            <>
              <div className="mb-8">
                <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 100 100" fill="none">
                  <path d="M50 10 L70 30 L50 50 L30 30 Z M50 50 L70 70 L50 90 L30 70 Z" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <h1 className="text-6xl font-bold mb-6">Reaction Time Test</h1>
              <p className="text-2xl mb-4 opacity-90">
                When the red box turns green, click as quickly as you can.
              </p>
              <p className="text-xl opacity-75">Click anywhere to start.</p>
            </>
          )}

          {gameState === 'waiting' && (
            <>
              <div className="mb-8">
                <div className="flex justify-center gap-3 mb-8">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <h1 className="text-7xl font-bold">Wait for green</h1>
            </>
          )}

          {gameState === 'ready' && (
            <>
              <div className="mb-8">
                <div className="flex justify-center gap-3 mb-8">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <h1 className="text-8xl font-bold">Click!</h1>
            </>
          )}

          {gameState === 'tooSoon' && (
            <>
              <div className="mb-8">
                <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="4" fill="none"/>
                  <text x="50" y="65" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold">!</text>
                </svg>
              </div>
              <h1 className="text-6xl font-bold mb-6">Too soon!</h1>
              <p className="text-2xl opacity-90">Click to try again.</p>
            </>
          )}

          {gameState === 'clicked' && currentTime && (
            <>
              <div className="mb-8">
                <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="3" fill="none"/>
                  <path d="M50 20 L50 50 L65 65" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 className="text-8xl font-bold mb-6">{currentTime} ms</h1>
              <p className="text-2xl opacity-90 mb-2">
                Attempt {attempts.length} of 5
              </p>
              <p className="text-xl opacity-75">Click to keep going</p>
            </>
          )}

          {gameState === 'results' && (
            <>
              <div className="mb-8">
                <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none">
                  <path d="M50 10 L60 40 L90 45 L65 65 L72 95 L50 80 L28 95 L35 65 L10 45 L40 40 Z" fill="white"/>
                </svg>
              </div>
              <h1 className="text-7xl font-bold mb-8">{averageTime} ms</h1>
              <p className="text-3xl mb-8 opacity-90">Average Reaction Time</p>
              
              <div className="mb-8 space-y-2">
                <p className="text-xl opacity-75">All attempts:</p>
                {attempts.map((time, index) => (
                  <p key={index} className="text-lg opacity-60">
                    Attempt {index + 1}: {time} ms
                  </p>
                ))}
              </div>
              
              <button 
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-xl hover:bg-opacity-90 transition mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setAttempts([]);
                  setCurrentTime(null);
                  setGameState('start');
                }}
              >
                Try Again
              </button>
            </>
          )}
        </div>

        {attempts.length > 0 && gameState !== 'results' && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`w-3 h-3 rounded-full ${
                    num <= attempts.length ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
