import { CELL_TYPES, MAZE_CONFIG } from "../types/constants";
import type { Grid, Point } from "../types/module";
import { carvePathWithWidth, countPathNeighbors } from "./grid";
import { randomChoiceFromPoints } from "./util";

/**
 * 壁セルから追加接続候補を生成する。
 */
const generateExtraConnectionCandidates = (grid: Grid): Point[] =>
  grid
    .flatMap((row, y) =>
      row.map((cell, x) => {
        const p: Point = { x, y };
        return { p, cell };
      }),
    )
    .filter(({ cell }) => cell.cellType === CELL_TYPES.WALL)
    .map(({ p }) => p);

/**
 * 追加接続をマップに適用する
 */
export const applyExtraConnections = (
  grid: Grid,
  width: number,
  height: number,
  pathWidth: number,
): Grid => {
  const connectionCount = Math.floor(
    width * height * MAZE_CONFIG.EXTRA_CONNECTION_DENSITY,
  );
  const candidates = generateExtraConnectionCandidates(grid);

  return Array.from({ length: connectionCount }, () =>
    randomChoiceFromPoints(candidates),
  )
    .filter((point) => {
      const pathNeighbors = countPathNeighbors(grid, point, width, height);
      return (
        pathNeighbors >= 2 &&
        Math.random() < MAZE_CONFIG.EXTRA_CONNECTION_PROBABILITY
      );
    })
    .reduce(
      (newGrid, point) =>
        carvePathWithWidth(newGrid, point, width, height, pathWidth),
      grid,
    );
};
