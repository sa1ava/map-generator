import { CELL_TYPES } from "../types/constants";
import type { Grid, Point } from "../types/module";
import { equalPoint, updateCell, updateGridCell } from "./util";

/**
 * グリッドから敵の配置可能なセルのリストを取得する
 */
export const getEnemyPlacementCandidates = (
  grid: Grid,
  start: Point,
  end: Point,
): Point[] =>
  grid
    .flatMap((row, y) =>
      row
        .map((cell, x) => ({ point: { x, y }, cell }))
        .filter(
          ({ point, cell }) =>
            cell.cellType === CELL_TYPES.PATH &&
            !cell.isStart &&
            !cell.isEnd &&
            !equalPoint(point, start) &&
            !equalPoint(point, end),
        ),
    )
    .map(({ point }) => point);

/**
 * 敵をランダムに配置する
 */
export const placeEnemiesRandomly = (
  grid: Grid,
  start: Point,
  end: Point,
  enemyCount: number,
): Grid => {
  const candidates = getEnemyPlacementCandidates(grid, start, end);
  const actualEnemyCount = Math.min(enemyCount, candidates.length);

  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  const selectedPositions = shuffled.slice(0, actualEnemyCount);

  return selectedPositions.reduce(
    (newGrid, point) => updateGridCell(newGrid, point, { hasEnemy: true }),
    grid,
  );
};

/**
 * 既存の敵をすべてクリア
 */
export const clearAllEnemies = (grid: Grid): Grid =>
  grid.map((row) =>
    row.map((cell) =>
      cell.hasEnemy ? updateCell(cell, { hasEnemy: false }) : cell,
    ),
  );
