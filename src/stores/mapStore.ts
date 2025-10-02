import { create } from "zustand";
import { generateMap } from "../modules/generator";
import type { MapStats } from "../types/component";
import { CELL_TYPES, initialConfig, initialStats } from "../types/constants";
import type { Cell, Grid, MapGeneratorParams, Point } from "../types/module";

export type MapStore = {
  config: MapGeneratorParams;
  grid: Grid;
  stats: MapStats;
  isGenerating: boolean;
  isGenerated: boolean;

  updateConfig: (key: string, value: number) => void;
  setGrid: (grid: Grid) => void;
  setStats: (stat: MapStats) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsGenerated: (isGenerating: boolean) => void;

  generateMap: () => Promise<void>;
  resetMap: () => void;
  resetAll: () => void;

  updateCell: (coord: Point, updates: Partial<Cell>) => Partial<MapStore>;
  moveStart: (coord: Point) => void;
  moveEnd: (coord: Point) => void;
  togglePathWall: (coord: Point) => void;
  drawPath: (coord: Point) => void;
  drawWall: (coord: Point) => void;
  toggleEnemy: (coord: Point) => void;
  setPath: (coord: Point) => void;
  setWall: (coord: Point) => void;

  hasGrid: () => boolean;
};

export const useMapStore = create<MapStore>((set, get) => ({
  /**
   * States
   */
  config: initialConfig, // マップ設定
  grid: [], // マップデータ本体
  stats: initialStats, // 統計情報
  isGenerating: false, // 生成フラグ
  isGenerated: false, // 生成完了フラグ

  /**
   * Actions
   */
  // マップの設定を更新
  updateConfig: (key: string, value: number) =>
    set((state) => ({
      config: {
        ...state.config,
        [key]: value,
      },
    })),

  // グリッド、統計情報、生成中フラグ、生成完了フラグの更新
  setGrid: (grid: Grid) => set({ grid }),
  setStats: (stats: MapStats) => set({ stats }),
  setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
  setIsGenerated: (isGenerated: boolean) => set({ isGenerated }),

  // マップの生成
  generateMap: async () => {
    const { setGrid, setStats, setIsGenerating, setIsGenerated } = get();
    try {
      setIsGenerating(true);
      const map = generateMap(get().config);
      const stats = analyzeGrid(map);

      setGrid(map);
      setStats(stats);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`error:, ${error.message}`);
      } else {
        console.log(`Unexpected error: ${error}`);
      }
    } finally {
      setIsGenerating(false);
      setIsGenerated(true);
    }
  },

  // リセット
  resetMap: () => set({ grid: [], stats: initialStats }),
  resetAll: () =>
    set({
      grid: [],
      stats: initialStats,
      config: initialConfig,
    }),

  updateCell: (coord: Point, updates: Partial<Cell>): Partial<MapStore> => {
    const { grid } = get();
    if (!grid) return {};

    const newGrid = grid.map((row, rowIndex) =>
      rowIndex === coord.y
        ? row.map((cell, colIndex) =>
            colIndex === coord.x ? { ...cell, ...updates } : cell,
          )
        : row,
    );

    return { grid: newGrid };
  },
  moveStart: (coord: Point) =>
    set((state) => {
      if (!state.grid) return state;
      if (state.grid[coord.y][coord.x].cellType !== CELL_TYPES.PATH)
        return state;

      const newGrid = state.grid.map((row) =>
        row.map((cell) => ({ ...cell, isStart: false })),
      );
      newGrid[coord.y][coord.x] = {
        ...newGrid[coord.y][coord.x],
        isStart: true,
        hasEnemy: false,
      };
      return {
        grid: newGrid,
        config: { ...state.config, start: coord },
      };
    }),
  moveEnd: (coord: Point) =>
    set((state) => {
      if (!state.grid) return state;
      if (state.grid[coord.y][coord.x].cellType !== CELL_TYPES.PATH)
        return state;

      const newGrid = state.grid.map((row) =>
        row.map((cell) => ({ ...cell, isEnd: false })),
      );
      newGrid[coord.y][coord.x] = {
        ...newGrid[coord.y][coord.x],
        isEnd: true,
        hasEnemy: false,
      };
      return {
        grid: newGrid,
        config: { ...state.config, end: coord },
      };
    }),
  togglePathWall: (coord: Point) =>
    set((state) => {
      if (!state.grid) return state;

      const cell = state.grid[coord.y][coord.x];
      if (cell.isStart || cell.isEnd) return state;

      const newCellType =
        cell.cellType === CELL_TYPES.PATH ? CELL_TYPES.WALL : CELL_TYPES.PATH;
      const updates: Partial<Cell> = {
        cellType: newCellType,
        isPath: newCellType === CELL_TYPES.PATH,
        hasEnemy: false,
      };
      return get().updateCell(coord, updates);
    }),
  drawPath: (coord) =>
    set((state) => {
      if (!state.grid) return state;
      const cell = state.grid[coord.y][coord.x];
      const updates: Partial<Cell> = {
        cellType: "path",
        isPath: true,
        hasEnemy: cell.hasEnemy,
      };
      return get().updateCell(coord, updates);
    }),
  drawWall: (coord) =>
    set((state) => {
      if (!state.grid) return state;
      const cell = state.grid[coord.y][coord.x];
      if (cell.isStart || cell.isEnd) return state;

      const updates: Partial<Cell> = {
        cellType: "wall",
        isPath: true,
        hasEnemy: false,
      };
      return get().updateCell(coord, updates);
    }),
  toggleEnemy: (coord: Point) =>
    set((state) => {
      if (!state.grid) return state;

      const cell = state.grid[coord.y][coord.x];
      if (cell.isStart || cell.isEnd || cell.cellType === CELL_TYPES.WALL)
        return state;

      const updates: Partial<Cell> = {
        hasEnemy: !cell.hasEnemy,
      };
      return get().updateCell(coord, updates);
    }),
  setPath: (coord: Point) =>
    set((state) => {
      if (!state.grid) return state;

      const cell = state.grid[coord.y][coord.x];
      if (cell.isStart || cell.isEnd) return state;

      const updates: Partial<Cell> = {
        cellType: CELL_TYPES.PATH,
        isPath: true,
      };
      return get().updateCell(coord, updates);
    }),
  setWall: (coord: Point) =>
    set((state) => {
      if (!state.grid) return state;

      const cell = state.grid[coord.y][coord.x];
      if (cell.isStart || cell.isEnd) return state;

      const updates: Partial<Cell> = {
        cellType: CELL_TYPES.WALL,
        isPath: false,
      };
      return get().updateCell(coord, updates);
    }),

  /**
   * Getter
   */
  hasGrid: () => get().grid !== null,
}));

export const analyzeGrid = (grid: Grid): MapStats => {
  const flat = grid.flat();
  const pathCells = flat.filter(
    (cell) => cell.cellType === CELL_TYPES.PATH,
  ).length;
  const wallCells = flat.filter(
    (cell) => cell.cellType === CELL_TYPES.WALL,
  ).length;
  const enemyCells = flat.filter((cell) => cell.hasEnemy).length;
  const totalCells = flat.length;

  return {
    totalCells,
    pathCells,
    wallCells,
    enemyCells,
    pathRatio: `${((pathCells / totalCells) * 100).toFixed(1)}%`,
  };
};
