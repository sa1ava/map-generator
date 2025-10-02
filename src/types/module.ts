import type { CELL_TYPES } from "./constants";

// 座標
export type Point = {
  x: number;
  y: number;
};

// 通行可能な Path のサイズ
type PathWidth = 1 | 2 | 3 | 4 | 5;

// セルの種類
export type CellType = (typeof CELL_TYPES)[keyof typeof CELL_TYPES];

// マップ生成のパラメータ
export type MapGeneratorParams = {
  width: number;
  height: number;
  start: Point;
  end: Point;
  pathWidth: PathWidth;
  enemyCount: number;
  shouldPlaceEnemies: boolean;
};

// マップ上に配置されるセル
export type Cell = {
  cellType: CellType;
  isPath: boolean;
  isStart: boolean;
  isEnd: boolean;
  hasEnemy: boolean;
};

// マップ本体
export type Grid = Cell[][];
