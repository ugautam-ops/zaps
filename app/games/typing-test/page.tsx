'use client';

import { useState, useEffect, useRef } from 'react';
import GameLayout from '@/components/GameLayout';

export default function TypingSpeedTest() {
  const [gameState, setGameState] = useState('start'); // start, testing, results
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. Programming is the art of telling a computer what to do. Practice makes perfect when learning to type faster.",
    "Technology has transformed the way we live and work. Every keystroke brings you closer to mastering the keyboard. Speed and accuracy are both important skills.",
    "The internet connects billions of people around the world. Digital communication has become essential in modern life. Keep practicing to improve your typing speed.",
    "Software development requires both creativity and logic. Good programmers write clean and efficient code. Testing your skills helps track improvement over time.",
    "Learning new skills takes patience and dedication. Consistent practice leads to significant improvements. Challenge yourself to type faster and more accurately."
  ];

  const startTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput('');
    setTimeLeft(60);
    setErrors(0);
    setStartTime(Date.now());
    setGameState('testing');

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishTest = () => {
    if (!startTime) return; // Prevent zero-time bug
    if (timerRef.current) clearInterval(timerRef.current);

    const timeMinutes = Math.max((Date.now() - startTime) / 1000 / 60, 0.01);

    let correct = 0;
    let wrong = 0;

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) correct++;
      else wrong++;
    }

    const calculatedWpm = Math.round((correct / 5) / timeMinutes);
    const calculatedAccuracy =
      userInput.length > 0
        ? Math.round((correct / userInput.length) * 100)
        : 0;

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setErrors(wrong);
    setGameState('results');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);

    let wrong = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) wrong++;
    }
    setErrors(wrong);

    // Only finish when full length is typed
    if (value.length === text.length) {
      finishTest();
    }
  };

  const getCharacterClass = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === text[index]
        ? 'text-green-500'
        : 'text-red-500 bg-red-500/20';
    }
    if (index === userInput.length) return 'bg-blue-500/30 animate-pulse';
    return 'text-gray-400';
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentWpm =
    gameState === 'testing' && startTime
      ? Math.round(
          (userInput.length / 5) /
            ((Date.now() - startTime) / 1000 / 60)
        )
      : 0;

  const seoContent = (
    <>
      <p>
        <strong>Typing Speed Test</strong> measures your typing speed in words per minute (WPM) and accuracy.
      </p>
    </>
  );

  return (
    <GameLayout seoTitle="About Typing Speed Test" seoContent={seoContent}>
      <div className="h-full bg-gradient-to-br from-blue-900 to-cyan-900 flex flex-col items-center justify-center rounded-3xl min-h-[600px] p-8">

        {/* START */}
        {gameState === 'start' && (
          <div className="text-center text-white max-w-2xl">
            <div className="text-8xl mb-6">⌨️</div>
            <h1 className="text-6xl font-bold mb-6">Typing Speed Test</h1>

            <p className="text-xl opacity-90 mb-2">
              Test your typing speed & accuracy!
            </p>

            <button
              onClick={startTest}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-xl hover:scale-105 transition"
            >
              Start Test
            </button>
          </div>
        )}

        {/* TESTING */}
        {gameState === 'testing' && (
          <div className="text-white w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6 bg-white/10 rounded-xl p-4">
              <div className="text-center">
                <p className="text-sm opacity-75">Time Left</p>
                <p className="text-3xl font-bold">{timeLeft}s</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-75">Speed</p>
                <p className="text-3xl font-bold">{currentWpm} WPM</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-75">Errors</p>
                <p className="text-3xl font-bold text-red-400">{errors}</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 mb-4">
              <div className="text-2xl font-mono leading-relaxed">
                {text.split('').map((char, i) => (
                  <span key={i} className={getCharacterClass(i)}>
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              className="w-full h-32 px-6 py-4 text-xl rounded-xl bg-white text-gray-900 font-mono focus:ring-4 focus:ring-blue-400 resize-none"
              placeholder="Start typing here..."
              spellCheck="false"
            />

            <div className="text-center mt-4">
              <button
                onClick={finishTest}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl"
              >
                End Test Early
              </button>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {gameState === 'results' && (
          <div className="text-center text-white max-w-2xl">
            <div className="text-8xl mb-6">🏆</div>

            <h1 className="text-6xl font-bold mb-4">{wpm} WPM</h1>
            <p className="text-2xl opacity-90 mb-8">Words Per Minute</p>

            <div className="bg-white/10 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-5xl font-bold">{accuracy}%</p>
                  <p className="text-lg opacity-70">Accuracy</p>
                </div>
                <div>
                  <p className="text-5xl font-bold">{errors}</p>
                  <p className="text-lg opacity-70">Errors</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6 text-xl">
                {wpm < 30 && "🌱 Beginner - Keep practicing!"}
                {wpm >= 30 && wpm < 50 && "📈 Intermediate - Good progress!"}
                {wpm >= 50 && wpm < 70 && "⚡ Advanced - Great speed!"}
                {wpm >= 70 && wpm < 90 && "🔥 Expert - Impressive!"}
                {wpm >= 90 && "🚀 Master - Outstanding!"}
              </div>
            </div>

            <button
              onClick={startTest}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-xl hover:scale-105 transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
