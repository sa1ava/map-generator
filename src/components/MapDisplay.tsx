import { HiOutlineMap } from "react-icons/hi2";
import { useMapEditor } from "../hooks/useMapEditor";
import { useMapStore } from "../stores/mapStore";
import { CELL_SIZE, CELL_TYPES } from "../types/constants";
import type { Cell } from "../types/module";
import { Card } from "./Card";

export type LegendItemProps = {
  color: string;
  label: string;
};

/**
 * マップに表示するセルの色を決定
 * @param cell セル情報
 * @returns カラーコードの文字列
 */
const getCellColor = (cell: Cell): string => {
  if (cell.isStart) return "#10B981";
  if (cell.isEnd) return "#EF4444";
  if (cell.hasEnemy) return "#F59E0B";
  return cell.cellType === CELL_TYPES.PATH ? "#F3F4F6" : "#374151";
};

/**
 * SVGグリッドコンポーネント
 * @param props
 * @returns
 */
const MapGrid = () => {
  const { svgRef, handlers, getCursorStyle } = useMapEditor();
  const { grid, config } = useMapStore();

  const viewBoxWidth = config.width * CELL_SIZE;
  const viewBoxHeight = config.height * CELL_SIZE;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      style={{ cursor: getCursorStyle() }}
      onMouseDown={handlers.onMouseDown}
      onMouseMove={handlers.onMouseMove}
      onMouseUp={handlers.onMouseUp}
      onMouseLeave={handlers.onMouseLeave}
    >
      <title>Map</title>
      {/* セル描画 */}
      {grid.map((row: Cell[], y: number) =>
        row.map((cell: Cell, x: number) => {
          const key = `${x}-${y}`;
          return (
            <rect
              key={key}
              x={x * CELL_SIZE}
              y={y * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill={getCellColor(cell)}
              stroke="#9CA3AF"
              strokeWidth="0.5"
              style={{ pointerEvents: "all" }}
            />
          );
        }),
      )}

      {/* 始点ラベル */}
      <text
        x={config.start.x * CELL_SIZE + CELL_SIZE / 2}
        y={config.start.y * CELL_SIZE + CELL_SIZE / 2 + 4}
        textAnchor="middle"
        fontSize={10}
        fill="white"
        fontWeight="bold"
        style={{ pointerEvents: "none" }}
      >
        S
      </text>

      {/* 終点ラベル */}
      <text
        x={config.end.x * CELL_SIZE + CELL_SIZE / 2}
        y={config.end.y * CELL_SIZE + CELL_SIZE / 2 + 4}
        textAnchor="middle"
        fontSize={10}
        fill="white"
        fontWeight="bold"
        style={{ pointerEvents: "none" }}
      >
        E
      </text>
    </svg>
  );
};

/**
 * 凡例項目
 */
const LegendItem = ({ color, label }: LegendItemProps) => (
  <div className="flex items-center gap-2">
    <div className={`w-4 h-4 ${color} rounded border border-gray-300`}></div>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

/**
 * 凡例コンポーネント
 */
const MapLegend = () => (
  <div className="mt-4 pt-4 border-t border-gray-200">
    <div className="flex flex-wrap gap-4">
      <LegendItem color="bg-green-500" label="Start" />
      <LegendItem color="bg-red-500" label="End" />
      <LegendItem color="bg-yellow-500" label="Enemy" />
      <LegendItem color="bg-gray-300" label="Path" />
      <LegendItem color="bg-gray-700" label="Wall" />
    </div>
  </div>
);

/**
 * マップ表示コンポーネント
 */
export const MapDisplay = () => {
  return (
    <Card title="Generated Map" icon={HiOutlineMap}>
      <div className="flex justify-center overflow-auto">
        <MapGrid />
      </div>
      <MapLegend />
    </Card>
  );
};
