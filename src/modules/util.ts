import { CELL_TYPES } from "../types/constants";
import type { Cell, CellType, Grid, Point } from "../types/module";

/**
 * マップ上に配置するセルの作成
 * @param cellType セルの種類
 * @returns 初期化されたセル
 */
export const createCell = (cellType: CellType): Cell => ({
  cellType,
  isPath: cellType === CELL_TYPES.PATH,
  isStart: false,
  isEnd: false,
  hasEnemy: false,
});

/**
 * 初期のマップグリッドの作成
 * @param width マップの横幅
 * @param height マップの高さ
 * @returns 初期化されたマップグリッド
 */
export const createGrid = (width: number, height: number): Grid =>
  Array.from({ length: height }, () =>
    Array.from({ length: width }, () => createCell(CELL_TYPES.WALL)),
  );

/**
 * 更新用に新しいセルを作成する
 * @param cell 変更前のセル
 * @param updates セルの更新内容
 * @returns 更新されたセル
 */
export const updateCell = (cell: Cell, updates: Partial<Cell>) => ({
  ...cell,
  ...updates,
  isPath: updates.cellType === CELL_TYPES.PATH || cell.isPath,
});

/**
 * グリッドの特定座標のセルを更新
 * @param grid
 * @param point
 * @param updates
 * @returns
 */
export const updateGridCell = (
  grid: Grid,
  point: Point,
  updates: Partial<Cell>,
): Grid =>
  grid.map((row: Cell[], rowIndex) =>
    rowIndex === point.y
      ? row.map((cell: Cell, colIndex) =>
          colIndex === point.x ? updateCell(cell, updates) : cell,
        )
      : row,
  );

/**
 * 座標が有効範囲に含まれるかを調べる
 * @param p 座標
 * @param width マップの有効範囲の幅
 * @param height マップの有効範囲の高さ
 * @returns 有効範囲に含まれるかどうか
 */
export const isValidCoordinate = (
  p: Point,
  width: number,
  height: number,
): boolean => 0 < p.x && p.x < width && 0 < p.y && p.y < height;

/**
 * set オブジェクトで point を管理するために string に変換する
 * @param p 管理したい座標
 * @returns 文字列化した座標
 */
export const pointToString = (p: Point): string => `${p.x},${p.y}`;

/**
 * ランダムな整数の生成
 * @param min 生成する整数の下限値
 * @param max 生成する整数の上限値
 * @returns min~max内のランダムな整数値
 */
export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 隣接の座標リストからランダムで1つ座標を選択する
 * @param points 座標のリスト
 * @returns ランダムに選ばれた座標
 */
export const randomChoiceFromPoints = (points: Point[]): Point =>
  points[Math.floor(Math.random() * points.length)];

/**
 * 座標の一致を判定する
 */
export const equalPoint = (a: Point, b: Point): boolean => {
  return a.x === b.x && a.y === b.y;
};
