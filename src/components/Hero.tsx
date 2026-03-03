"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Timer from "@/components/Timer";

export default function Hero() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; scale: number; duration: number; targetY: number; size: number }[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 10 + 10,
        targetY: Math.random() * -100,
        size: Math.random() * 50 + 20,
      }))
    );
  }, []);

  return (
      <div className="relative w-full flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-screen">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-300/40"
            initial={{
              x: heart.x,
              y: heart.y,
              scale: heart.scale,
            }}
            animate={{
              y: [null, heart.targetY],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center space-y-10 max-w-5xl w-full pt-12"
      >
        <div className="space-y-6">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-block"
          >
            <Heart className="w-16 h-16 text-pink-400 mx-auto fill-pink-400 drop-shadow-lg" />
          </motion.div>
          
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-pink-500 mb-4 tracking-wide font-[family-name:var(--font-pacifico)]">
              Aung <span className="text-pink-300">&</span> Kang Haerin
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-pink-400/80 font-medium">
              walking together since 2026
            </p>
          </div>
        </div>

        <div className="py-4">
          <Timer />
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-16 justify-center items-center">
            <button 
                onClick={() => document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-white px-8 py-4 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100 hover:border-pink-300 flex items-center gap-3 text-pink-500 font-bold text-lg"
            >
                <Heart size={20} className="group-hover:fill-pink-500 transition-colors" />
                Our Memories
            </button>
            <button 
                onClick={() => document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-pink-500 px-8 py-4 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:bg-pink-400 text-white font-bold text-lg flex items-center gap-3"
            >
                <Heart size={20} className="fill-white" />
                Play Game
            </button>
        </div>
      </motion.div>
      </div>
  );
}
