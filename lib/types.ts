export interface Cell {
  id: number;
  row: number;
  col: number;
  liveNeighbors: number;
  isVisited: boolean;
  isFlagged: boolean;
  isLive: boolean;
}

export interface Board {
  grid: Cell[][];
  size: number;
  difficulty: number;
  clicks: number;
  startTime: Date | null;
  endTime: Date | null;
  score: number;
}