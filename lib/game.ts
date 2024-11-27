import { Board, Cell } from './types';

export function createBoard(size: number, difficulty: number): Board {
  const board: Board = {
    grid: [],
    size,
    difficulty,
    clicks: 0,
    startTime: null,
    endTime: null,
    score: 0,
  };

  // Initialize grid with cells
  let numCells = 0;
  for (let row = 0; row < size; row++) {
    board.grid[row] = [];
    for (let col = 0; col < size; col++) {
      board.grid[row][col] = {
        id: numCells++,
        row,
        col,
        liveNeighbors: 0,
        isVisited: false,
        isFlagged: false,
        isLive: false,
      };
    }
  }

  return board;
}

export function setupBombs(board: Board): void {
  for (let i = 0; i < board.size; i++) {
    for (let j = 0; j < board.size; j++) {
      board.grid[i][j].isLive = Math.random() <= board.difficulty;
    }
  }
}

export function calcLiveNeighbors(board: Board): void {
  const { size, grid } = board;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      let liveCount = 0;
      
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          if (grid[newRow][newCol].isLive) liveCount++;
        }
      }
      
      grid[row][col].liveNeighbors = liveCount;
    }
  }
}

export function floodFill(board: Board, row: number, col: number): void {
  const { size, grid } = board;
  
  if (row < 0 || row >= size || col < 0 || col >= size || 
      grid[row][col].isVisited || grid[row][col].isFlagged) {
    return;
  }

  grid[row][col].isVisited = true;

  if (grid[row][col].liveNeighbors === 0) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dx, dy] of directions) {
      floodFill(board, row + dx, col + dy);
    }
  }
}

export function checkForWin(board: Board): boolean {
  for (let row = 0; row < board.size; row++) {
    for (let col = 0; col < board.size; col++) {
      if (!board.grid[row][col].isVisited && !board.grid[row][col].isLive) {
        return false;
      }
    }
  }
  return true;
}

export function checkForLose(board: Board): boolean {
  for (let row = 0; row < board.size; row++) {
    for (let col = 0; col < board.size; col++) {
      if (board.grid[row][col].isLive && board.grid[row][col].isVisited) {
        return true;
      }
    }
  }
  return false;
}