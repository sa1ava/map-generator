import type { Grid, Point } from "../types/module.ts";
import { interpolateCoordinates } from "./calculate.ts";
import { carvePathWithWidth } from "./grid.ts";
import { pointToString, randomChoiceFromPoints } from "./util.ts";

/**
 * 迷路生成用に未訪問の隣接セルを探す
 * @param current 現在のセル位置
 * @param width マップの幅
 * @param height マップの高さ
 * @param visited 訪問判定用の集合
 * @param pathWidth path の幅
 * @returns 未訪問の隣接セルのリスト
 */
const getUnvisitedMazeNeighbors = (
  current: Point,
  width: number,
  height: number,
  visited: Set<string>,
  pathWidth: number,
): Point[] => {
  const spacing = Math.max(2, pathWidth + 1);

  return [
    { x: current.x, y: current.y - spacing },
    { x: current.x + spacing, y: current.y },
    { x: current.x, y: current.y + spacing },
    { x: current.x - spacing, y: current.y },
  ].filter(
    (p: Point) =>
      p.x > 0 &&
      p.x < width - 1 &&
      p.y > 0 &&
      p.y < height - 1 &&
      !visited.has(pointToString(p)),
  );
};

/**
 * 迷路生成 (Recursive Backtracking)
 * @param width
 * @param height
 * @param pathWidth
 * @returns
 */
export const generateMazeStructure = (
  width: number,
  height: number,
  pathWidth: number,
): Point[] => {
  // ランダムに仮のスタート位置を決定
  const start: Point = {
    x: 1 + Math.floor(Math.random() * Math.floor((width - 2) / 2)) * 2,
    y: 1 + Math.floor(Math.random() * Math.floor((height - 2) / 2)) * 2,
  };

  const stack: Point[] = [start];
  const visited: Set<string> = new Set([pointToString(start)]);
  const paths: Point[] = [];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getUnvisitedMazeNeighbors(
      current,
      width,
      height,
      visited,
      pathWidth,
    );

    if (neighbors.length > 0) {
      const next = randomChoiceFromPoints(neighbors);

      // 現在地点と次の地点、およびその間のパスを記録
      paths.push(current);
      paths.push(...interpolateCoordinates(current, next));
      paths.push(next);

      // next を訪問済みとする
      visited.add(pointToString(next));
      stack.push(next);
    } else {
      stack.pop();
    }
  }

  return paths;
};

/**
 *
 * @param grid
 * @param paths
 * @param width
 * @param height
 * @param pathWidth
 * @returns
 */
export const applyMazeToGrid = (
  grid: Grid,
  paths: Point[],
  width: number,
  height: number,
  pathWidth: number,
): Grid =>
  paths.reduce(
    (newGrid, point) =>
      carvePathWithWidth(newGrid, point, width, height, pathWidth),
    grid,
  );
