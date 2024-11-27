"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { Sliders, Grid, Play } from "lucide-react";

interface GameConfigProps {
  onStart: (size: number, difficulty: number) => void;
}

export function GameConfig({ onStart }: GameConfigProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);

  const gridSizes = [8, 10, 12, 15];
  const difficulties = [
    { label: "Easy", value: 0.1 },
    { label: "Medium", value: 0.15 },
    { label: "Hard", value: 0.2 },
    { label: "Expert", value: 0.25 },
  ];

  const handleStart = () => {
    if (selectedSize && selectedDifficulty !== null) {
      onStart(selectedSize, selectedDifficulty);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-primary">
          <Grid className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Grid Size</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {gridSizes.map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-3 rounded-lg border font-mono transition-colors duration-200 ${
                selectedSize === size
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary hover:bg-secondary/80 border-primary/20 text-foreground'
              }`}
            >
              {size}x{size}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-primary">
          <Sliders className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Difficulty</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {difficulties.map((diff) => (
            <motion.button
              key={diff.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDifficulty(diff.value)}
              className={`px-4 py-3 rounded-lg border transition-colors duration-200 ${
                selectedDifficulty === diff.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary hover:bg-secondary/80 border-primary/20 text-foreground'
              }`}
            >
              {diff.label}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
        disabled={!selectedSize || selectedDifficulty === null}
        className={`w-full px-6 py-4 rounded-lg font-semibold backdrop-blur-sm border flex items-center justify-center space-x-2 transition-colors duration-200 ${
          selectedSize && selectedDifficulty !== null
            ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
            : 'bg-secondary/50 text-muted-foreground border-primary/20 cursor-not-allowed'
        }`}
      >
        <Play className="w-5 h-5" />
        <span>Start Game</span>
      </motion.button>

      <div className="text-sm text-foreground/80 text-center">
        <p>Right-click or long-press to flag potential mines</p>
      </div>
    </motion.div>
  );
}