import { CELL_TYPES, DIRECTIONS } from "../types/constants";
import type { Cell, Grid, Point } from "../types/module";
import { getPathCoordinates, interpolateCoordinates } from "./calculate";
import { isValidCoordinate, updateGridCell } from "./util";

/**
 * 複数の座標で path を掘る
 * @param grid 既存のグリッド
 * @param coordinates
 * @param width 座標の妥当性検証のためのマップの幅
 * @param height 座標の妥当性検証のためのマップの高さ
 * @returns 更新したグリッド
 */
export const carvePathAtCoordinates = (
  grid: Grid,
  coordinates: Point[],
  width: number,
  height: number,
): Grid => {
  // path に更新するための cell 情報
  const pathCell: Partial<Cell> = {
    cellType: CELL_TYPES.PATH,
    isPath: true,
    hasEnemy: false,
  };

  // 座標のリストに基づいて grid の座標を path に更新する
  return coordinates
    .filter((p) => isValidCoordinate(p, width, height))
    .reduce((newGrid, p) => updateGridCell(newGrid, p, pathCell), grid);
};

/**
 * 指定の幅で path を掘る
 * @param grid
 * @param center
 * @param width
 * @param height
 * @param pathWidth
 * @returns
 */
export const carvePathWithWidth = (
  grid: Grid,
  center: Point,
  width: number,
  height: number,
  pathWidth: number,
) => {
  const coordinates = getPathCoordinates(center, pathWidth);
  return carvePathAtCoordinates(grid, coordinates, width, height);
};

/**
 * 2点間に通路を掘る
 * @param grid
 * @param from
 * @param to
 * @param width
 * @param height
 * @param pathWidth
 * @returns
 */
export const carvePathBetween = (
  grid: Grid,
  from: Point,
  to: Point,
  width: number,
  height: number,
  pathWidth: number,
) => {
  const interpolatedPoints = interpolateCoordinates(from, to);
  return interpolatedPoints.reduce(
    (newGrid, point) =>
      carvePathWithWidth(newGrid, point, width, height, pathWidth),
    grid,
  );
};

/**
 * 隣接セルを取得
 */
export const getNeighbors = (center: Point, width: number, height: number) =>
  Object.values(DIRECTIONS)
    .map((p) => ({ x: center.x + p.x, y: center.y + p.y }))
    .filter((p) => isValidCoordinate(p, width, height));

/**
 * 隣接セル内にある path 数をカウント
 */
export const countPathNeighbors = (
  grid: Grid,
  point: Point,
  width: number,
  height: number,
) =>
  getNeighbors(point, width, height).filter(
    (p) => grid[p.y][p.x].cellType === CELL_TYPES.PATH,
  ).length;
