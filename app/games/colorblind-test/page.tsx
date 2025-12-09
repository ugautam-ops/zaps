// ============================================
// FILE: app/games/colorblind-test/page.tsx
// ============================================
'use client';

import { useState } from 'react';
import Image from 'next/image';
import GameLayout from '@/components/GameLayout';

// Fisher-Yates shuffle
function shuffleArray(array: number[]): number[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type Answer = {
  plate: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export default function ColorBlindTest() {
  const [gameState, setGameState] = useState<'start' | 'testing' | 'results'>('start');
  const [currentPlate, setCurrentPlate] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [order, setOrder] = useState<number[]>([]);

  const plates = [
    { image: '/colorblind/Ishihara_image_0.jpg', answer: '0', description: 'Normal vision sees 0' },
    { image: '/colorblind/Ishihara_image_1.jpg', answer: '1', description: 'Normal vision sees 1' },
    { image: '/colorblind/Ishihara_image_2.jpg', answer: '2', description: 'Normal vision sees 2' },
    { image: '/colorblind/Ishihara_image_3.jpg', answer: '3', description: 'Normal vision sees 3' },
    { image: '/colorblind/Ishihara_image_4.jpg', answer: '4', description: 'Normal vision sees 4' },
    { image: '/colorblind/Ishihara_image_5.jpg', answer: '5', description: 'Normal vision sees 5' },
    { image: '/colorblind/Ishihara_image_6.jpg', answer: '6', description: 'Normal vision sees 6' },
    { image: '/colorblind/Ishihara_image_7.jpg', answer: '7', description: 'Normal vision sees 7' },
    { image: '/colorblind/Ishihara_image_8.jpg', answer: '8', description: 'Normal vision sees 8' },
    { image: '/colorblind/Ishihara_image_9.jpg', answer: '9', description: 'Normal vision sees 9' },
  ];

  const startTest = () => {
    const plateOrder = shuffleArray([...Array(plates.length).keys()]);
    setOrder(plateOrder);
    setGameState('testing');
    setCurrentPlate(0);
    setAnswers([]);
  };

  const handleNumberClick = (number: string) => {
    const realIndex = order[currentPlate];
    const plate = plates[realIndex];
    const currentAnswer = plate.answer;
    const isCorrect = number === currentAnswer;

    setAnswers(prev => [
      ...prev,
      {
        plate: realIndex,
        userAnswer: number,
        correctAnswer: currentAnswer,
        isCorrect
      }
    ]);

    if (currentPlate < plates.length - 1) {
      setCurrentPlate(currentPlate + 1);
    } else {
      setGameState('results');
    }
  };

  const skipPlate = () => {
    const realIndex = order[currentPlate];
    const plate = plates[realIndex];

    setAnswers(prev => [
      ...prev,
      {
        plate: realIndex,
        userAnswer: 'skipped',
        correctAnswer: plate.answer,
        isCorrect: false
      }
    ]);

    if (currentPlate < plates.length - 1) {
      setCurrentPlate(currentPlate + 1);
    } else {
      setGameState('results');
    }
  };

  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const totalPlates = plates.length;
  const percentage = Math.round((correctAnswers / totalPlates) * 100);

  const getResult = () => {
    if (percentage >= 90) {
      return {
        status: 'Normal Color Vision',
        message: 'You appear to have normal color vision! All or most plates were correctly identified.',
        icon: '✅',
        color: 'text-green-400'
      };
    } else if (percentage >= 70) {
      return {
        status: 'Mild Color Vision Deficiency',
        message: 'You may have a mild form of color vision deficiency. Consider consulting an eye care professional.',
        icon: '⚠️',
        color: 'text-yellow-400'
      };
    } else {
      return {
        status: 'Possible Color Vision Deficiency',
        message: 'You may have color vision deficiency (color blindness). We recommend consulting an eye care professional for a proper diagnosis.',
        icon: '🔴',
        color: 'text-red-400'
      };
    }
  };

  const result = gameState === 'results' ? getResult() : null;

  const seoContent = (
    <>
      <p>
        <strong>Color Blind Test</strong> helps screen for color vision deficiencies using Ishihara test plates. 
        This is a preliminary screening tool - not a medical diagnosis.
      </p>
      <p>
        <strong>How it works:</strong> Look at each plate and click the number you see among the colored dots. 
        Different types of color blindness affect which numbers are visible.
      </p>
      <p>
        <strong>Types of color blindness:</strong> Protanopia (red weakness), Deuteranopia (green weakness), 
        and Tritanopia (blue-yellow weakness). About 8% of men and 0.5% of women have some form of color vision deficiency.
      </p>
      <p>
        <strong>Important:</strong> This is a screening tool only. For a proper diagnosis, consult an eye care professional. 
        Monitor calibration and lighting conditions can affect results.
      </p>
    </>
  );

  return (
    <GameLayout 
      seoTitle="About Color Blind Test"
      seoContent={seoContent}
    >
      <div className="h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center rounded-3xl min-h-[600px] p-4 sm:p-8">

        {/* Start State */}
        {gameState === 'start' && (
          <div className="text-center text-white max-w-2xl px-4">
            <div className="mb-6 sm:mb-8">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">👁️</div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6">Color Blind Test</h1>
            <p className="text-lg sm:text-xl mb-4 opacity-90">
              Screen for color vision deficiencies with Ishihara test plates.
            </p>
            <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
              <p className="text-yellow-200 text-xs sm:text-sm">
                ⚠️ <strong>Disclaimer:</strong> This is a screening tool, not a medical diagnosis. 
                Consult an eye care professional for accurate testing.
              </p>
            </div>
            <button 
              onClick={startTest}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg sm:text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Start Test
            </button>
          </div>
        )}

        {/* Testing State */}
        {gameState === 'testing' && (
          <div className="text-center text-white max-w-2xl px-4 w-full">

            <div className="mb-4 sm:mb-6">
              <p className="text-base sm:text-lg opacity-75 mb-2">Plate {currentPlate + 1} of {totalPlates}</p>
              <div className="w-full bg-white/20 rounded-full h-2 max-w-md mx-auto">
                <div 
                  className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPlate + 1) / totalPlates) * 100}%` }}
                />
              </div>
            </div>

            {/* Ishihara Plate */}
            <div className="mb-4 sm:mb-6">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto bg-white rounded-full overflow-hidden shadow-2xl">
                <Image
                  src={plates[order[currentPlate]].image}
                  alt={`Ishihara test plate ${currentPlate + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">What number do you see?</h2>

            {/* Number Pad */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-md mx-auto mb-4 sm:mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  className="aspect-square bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/40 rounded-xl text-2xl sm:text-3xl font-bold text-white transition transform hover:scale-105 active:scale-95"
                >
                  {num}
                </button>
              ))}
            </div>

            <button 
              onClick={skipPlate}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition text-sm sm:text-base"
            >
              Can't See It - Skip
            </button>
          </div>
        )}

        {/* Results */}
        {gameState === 'results' && result && (
          <div className="text-center text-white max-w-2xl px-4">
            <div className="mb-6 sm:mb-8">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">{result.icon}</div>
            </div>
            <h1 className={`text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 ${result.color}`}>
              {result.status}
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">{result.message}</p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="text-center mb-4 sm:mb-6">
                <p className="text-4xl sm:text-6xl font-bold mb-2">{correctAnswers}/{totalPlates}</p>
                <p className="text-lg sm:text-xl opacity-75">Correct Answers</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-300 mt-2">{percentage}%</p>
              </div>

              <div className="space-y-2 text-left max-h-48 sm:max-h-60 overflow-y-auto">
                {answers.map((answer, index) => (
                  <div key={index} className="flex items-center justify-between text-xs sm:text-sm border-b border-white/10 pb-2">
                    <span>Plate {answer.plate + 1}:</span>
                    <div className="flex items-center gap-2">
                      <span className={answer.isCorrect ? 'text-green-400' : 'text-red-400'}>
                        {answer.userAnswer === 'skipped' ? 'Skipped' : answer.userAnswer}
                      </span>
                      {!answer.isCorrect && (
                        <span className="text-white/50">
                          (Answer: {answer.correctAnswer})
                        </span>
                      )}
                      <span>{answer.isCorrect ? '✓' : '✗'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/40 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-blue-200 text-xs sm:text-sm">
                💡 <strong>Note:</strong> Screen brightness, calibration, and lighting affect results. 
                For accurate diagnosis, visit an optometrist or ophthalmologist.
              </p>
            </div>

            <button 
              onClick={startTest}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg sm:text-xl hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Take Test Again
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
