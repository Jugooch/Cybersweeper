"use client";

import { useEffect, useState } from 'react';
import { Board } from '@/lib/types';
import { createBoard, setupBombs, calcLiveNeighbors, floodFill, checkForWin, checkForLose } from '@/lib/game';
import { Flag, Bomb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { GameHeader } from './GameHeader';
import { GameStats } from './GameStats';
import { GameConfig } from './GameConfig';

export default function GameBoard() {
  const [board, setBoard] = useState<Board | null>(null);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const startGame = (size: number, difficulty: number) => {
    const newBoard = createBoard(size, difficulty);
    setupBombs(newBoard);
    calcLiveNeighbors(newBoard);
    newBoard.startTime = new Date();
    setBoard(newBoard);
    setGameStatus('playing');
    setTimer(0);
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!board || gameStatus !== 'playing') return;
    if (board.grid[row][col].isFlagged) return;

    const newBoard = { ...board };
    floodFill(newBoard, row, col);
    newBoard.clicks++;

    if (checkForLose(newBoard)) {
      setGameStatus('lost');
      if (timerInterval) clearInterval(timerInterval);
    } else if (checkForWin(newBoard)) {
      setGameStatus('won');
      if (timerInterval) clearInterval(timerInterval);
    }

    setBoard(newBoard);
  };

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (!board || gameStatus !== 'playing') return;

    const newBoard = { ...board };
    newBoard.grid[row][col].isFlagged = !newBoard.grid[row][col].isFlagged;
    setBoard(newBoard);
  };

  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval]);

  const getCellContent = (cell: Board['grid'][0][0]) => {
    if (cell.isFlagged) {
      return <Flag className="w-4 h-4 text-destructive" />;
    }
    if (cell.isVisited) {
      if (cell.isLive) {
        return <Bomb className="w-4 h-4 text-destructive" />;
      }
      return cell.liveNeighbors > 0 ? (
        <span className="text-primary font-bold">{cell.liveNeighbors}</span>
      ) : '';
    }
    return '';
  };

  const getCellColor = (cell: Board['grid'][0][0]) => {
    if (!cell.isVisited) return 'bg-secondary hover:bg-secondary/80';
    if (cell.isLive) return 'bg-destructive/20';
    return 'bg-secondary/50';
  };

  const getCellSize = (boardSize: number) => {
    const sizes: Record<number, string> = {
      8: 'w-12 h-12',
      10: 'w-10 h-10',
      12: 'w-8 h-8',
      15: 'w-7 h-7'
    };
    return sizes[boardSize] || sizes[10];
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-background/80 p-8">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <ThemeToggle />
      
      <div className="relative bg-background/60 backdrop-blur-xl rounded-xl border border-primary/20 p-8 space-y-6 w-full max-w-md">
        <GameHeader />

        {gameStatus === 'playing' && board && (
          <GameStats timer={timer} clicks={board.clicks} />
        )}

        {gameStatus === 'idle' ? (
          <GameConfig onStart={startGame} />
        ) : null}

        <AnimatePresence mode="wait">
          {board && gameStatus === 'playing' && (
            <motion.div
              key="game-grid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))`,
              }}
            >
              {board.grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <motion.button
                    key={cell.id}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                    className={cn(
                      getCellSize(board.size),
                      'flex items-center justify-center rounded-md border border-primary/20 transition-colors duration-200 shadow-lg',
                      getCellColor(cell)
                    )}
                  >
                    {getCellContent(cell)}
                  </motion.button>
                ))
              )}
            </motion.div>
          )}

          {gameStatus === 'won' && (
            <motion.div
              key="win-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center text-green-500 dark:text-green-400 font-bold text-xl"
            >
              🎉 MISSION ACCOMPLISHED 🎉
            </motion.div>
          )}

          {gameStatus === 'lost' && (
            <motion.div
              key="lose-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center text-destructive font-bold text-xl"
            >
              💥 SYSTEM FAILURE 💥
            </motion.div>
          )}
        </AnimatePresence>

        {(gameStatus === 'won' || gameStatus === 'lost') && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameStatus('idle')}
            className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold backdrop-blur-sm border border-primary hover:bg-primary/90"
          >
            Configure New Game
          </motion.button>
        )}
      </div>
    </div>
  );
}