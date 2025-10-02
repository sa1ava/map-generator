import { CELL_TYPES } from "../types/constants.ts";
import type { Cell, Grid, MapGeneratorParams, Point } from "../types/module";
import { applyExtraConnections } from "./connection.ts";
import { clearAllEnemies, placeEnemiesRandomly } from "./enemy.ts";
import { carvePathBetween } from "./grid.ts";
import { applyMazeToGrid, generateMazeStructure } from "./maze.ts";
import { createGrid, updateGridCell } from "./util";

export const markStartEndPoints = (grid: Grid, start: Point, end: Point) =>
  [
    {
      coord: start,
      updates: {
        isStart: true,
        cellType: CELL_TYPES.PATH,
        isPath: true,
      } as Partial<Cell>,
    },
    {
      coord: end,
      updates: {
        isEnd: true,
        cellType: CELL_TYPES.PATH,
        isPath: true,
      } as Partial<Cell>,
    },
  ].reduce(
    (newGrid, { coord, updates }) => updateGridCell(newGrid, coord, updates),
    grid,
  );

/**
 * start,end間の接続性を強制的に確保する
 */
export const ensureConnectivity = (
  grid: Grid,
  start: Point,
  end: Point,
  width: number,
  height: number,
  pathWidth: number,
) => carvePathBetween(grid, start, end, width, height, pathWidth);

export const generateMap = ({
  width,
  height,
  start,
  end,
  pathWidth,
  enemyCount,
  shouldPlaceEnemies,
}: MapGeneratorParams) => {
  const baseGrid = createGrid(width, height);
  const mazeStructure = generateMazeStructure(width, height, pathWidth);

  return [baseGrid]
    .map((grid) =>
      applyMazeToGrid(grid, mazeStructure, width, height, pathWidth),
    )
    .map((gird) =>
      ensureConnectivity(gird, start, end, width, height, pathWidth),
    )
    .map((grid) => markStartEndPoints(grid, start, end))
    .map((grid) => applyExtraConnections(grid, width, height, pathWidth))
    .map((grid) =>
      shouldPlaceEnemies && enemyCount > 0
        ? placeEnemiesRandomly(grid, start, end, enemyCount)
        : grid,
    )[0];
};

/**
 * 敵のみ再配置
 */
export const regenerateEnemies = (
  grid: Grid,
  start: Point,
  end: Point,
  enemyCount: number,
): Grid =>
  [grid]
    .map(clearAllEnemies)
    .map((cleanGrid) =>
      enemyCount > 0
        ? placeEnemiesRandomly(cleanGrid, start, end, enemyCount)
        : cleanGrid,
    )[0];
