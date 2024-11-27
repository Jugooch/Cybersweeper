"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function GameHeader() {
  return (
    <div className="relative mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center space-x-2"
      >
        <Terminal className="w-8 h-8 text-primary animate-pulse" />
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
          CyberSweeper
        </h1>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent h-px -bottom-4" />
    </div>
  );
}