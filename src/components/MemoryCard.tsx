"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Heart } from "lucide-react";

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
}

interface MemoryCardProps {
  memory: Memory;
  idx: number;
}

export default function MemoryCard({ memory, idx }: MemoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md hover:border-pink-300 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-pink-400 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
          {format(new Date(memory.date), "MMM d, yyyy")}
        </span>
        <Heart className="w-5 h-5 text-pink-200 group-hover:text-pink-500 transition-colors" fill="currentColor" />
      </div>
      <h3 className="text-xl font-bold text-pink-800 mb-2">{memory.title}</h3>
      <p className="text-pink-600/80 leading-relaxed text-sm">
        {memory.description}
      </p>
    </motion.div>
  );
}
