import type { Point } from "../types/module";

/**
 * パスの幅から座標範囲を計算する
 * @param pathWidth パスの幅
 * @returns
 */
export const calculatePathOffsets = (pathWidth: number) => {
  const radius = Math.floor(pathWidth / 2);
  const startOffset = pathWidth % 2 === 0 ? -radius + 1 : -radius;
  const endOffset = radius;

  return Array.from(
    { length: endOffset - startOffset + 1 },
    (_, i) => startOffset + i,
  );
};

/**
 * 中心座標から通路範囲の全座標を取得
 * @param center 中心座標
 * @param pathWidth パスの幅
 * @returns 通路となる範囲のリスト
 */
export const getPathCoordinates = (
  center: Point,
  pathWidth: number,
): Point[] => {
  const offsets = calculatePathOffsets(pathWidth);

  return offsets.flatMap((dy) =>
    offsets.map((dx) => ({ x: center.x + dx, y: center.y + dy })),
  );
};

/**
 * 二点間を補完する座標のリストを作成する
 * @param from 開始位置
 * @param to 終点位置
 * @returns 補完した位置のリスト
 */
export const interpolateCoordinates = (from: Point, to: Point): Point[] => {
  const [dx, dy] = [to.x - from.x, to.y - from.y];
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  return Array.from({ length: steps + 1 }, (_, i) => ({
    x: Math.round(from.x + (dx * i) / steps),
    y: Math.round(from.y + (dy * i) / steps),
  }));
};
