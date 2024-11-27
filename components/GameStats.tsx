"use client";

import { motion } from "framer-motion";
import { Clock, Bomb } from "lucide-react";

interface GameStatsProps {
  timer: number;
  clicks: number;
}

export function GameStats({ timer, clicks }: GameStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 gap-4 mb-6"
    >
      <div className="flex items-center justify-center space-x-2 bg-background/50 backdrop-blur-sm p-3 rounded-lg border border-primary/20">
        <Clock className="w-4 h-4 text-primary" />
        <span className="font-mono text-lg">{timer}s</span>
      </div>
      <div className="flex items-center justify-center space-x-2 bg-background/50 backdrop-blur-sm p-3 rounded-lg border border-primary/20">
        <Bomb className="w-4 h-4 text-primary" />
        <span className="font-mono text-lg">{clicks}</span>
      </div>
    </motion.div>
  );
}