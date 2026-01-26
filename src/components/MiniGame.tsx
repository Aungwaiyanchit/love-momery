"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface GameHeart {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function MiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<GameHeart[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setHearts([]);
  };

  const stopGame = () => {
    setIsPlaying(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    setHearts([]);
  };

  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = setInterval(() => {
        if (!containerRef.current) return;
        
        const { width, height } = containerRef.current.getBoundingClientRect();
        
        // Add random heart
        const newHeart: GameHeart = {
          id: Date.now(),
          x: Math.random() * (width - 50),
          y: Math.random() * (height - 50),
          size: Math.random() * 20 + 24, // 24-44px
        };

        setHearts(prev => {
          // Remove old hearts to keep game clean (limit to 5 on screen)
          const newHearts = [...prev, newHeart];
          if (newHearts.length > 5) return newHearts.slice(1);
          return newHearts;
        });

      }, 800); // New heart every 800ms
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying]);

  const catchHeart = (id: number) => {
    setScore(prev => prev + 1);
    setHearts(prev => prev.filter(h => h.id !== id));
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ec4899', '#f472b6', '#fbcfe8']
    });
  };

  return (
    <section id="game" className="w-full max-w-4xl mx-auto py-12 px-4 text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-pink-800 mb-2">Catch the Heart!</h2>
        <p className="text-pink-600">Click the hearts as they appear to show your love!</p>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[300px] sm:h-[400px] w-full bg-pink-100 rounded-3xl overflow-hidden shadow-inner border-4 border-pink-200 touch-none"
      >
        {!isPlaying ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10">
            {score > 0 && (
              <div className="mb-6 flex flex-col items-center">
                <Trophy className="w-12 h-12 text-yellow-500 mb-2" />
                <span className="text-2xl font-bold text-pink-700">Final Score: {score}</span>
              </div>
            )}
            <button
              onClick={startGame}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {score > 0 ? "Play Again" : "Start Game"}
            </button>
          </div>
        ) : (
          <>
            <div className="absolute top-4 left-4 bg-white/80 px-4 py-2 rounded-full font-bold text-pink-600 z-10 shadow-sm border border-pink-100">
              Score: {score}
            </div>
             <button
              onClick={stopGame}
              className="absolute top-4 right-4 bg-white/80 px-4 py-2 rounded-full font-bold text-red-500 z-10 shadow-sm hover:bg-red-50 border border-red-100"
            >
              Stop
            </button>
            <AnimatePresence>
              {hearts.map((heart) => (
                <motion.button
                  key={heart.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    left: heart.x,
                    top: heart.y,
                    width: heart.size,
                    height: heart.size,
                  }}
                  className="absolute cursor-pointer text-pink-500 hover:text-pink-600 active:scale-95 transition-transform"
                  onClick={() => catchHeart(heart.id)}
                >
                  <Heart className="w-full h-full fill-current" />
                </motion.button>
              ))}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}
