import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import type { MapGeneratorParams, Point } from "../types/module";
import { CardDivider, SidebarCard } from "./SidebarCard";

type SliderProps = {
  label: string;
  sliderId: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
};

type CoordinateDisplayProps = {
  label: string;
  coord: Point;
  color: "green" | "red";
};

type MapControlsProps = {
  config: MapGeneratorParams;
  onConfigChange: (paramName: string, value: number) => void;
};

/**
 * スライダーコンポーネント
 */
const Slider = ({
  label,
  sliderId,
  value,
  min,
  max,
  unit = "",
  onChange,
}: SliderProps) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <label htmlFor={sliderId} className="text-xs font-medium text-gray-700">
        {label}
      </label>
      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
        {value}
        {unit}
      </span>
    </div>
    <input
      type="range"
      name={sliderId}
      id={sliderId}
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
    <div className="flex justify-between text-xs text-gray-400">
      <span>{min}</span>
      <span>{max}</span>
    </div>
  </div>
);

/**
 * 座標表示コンポーネント
 */
const CoordinateDisplay = ({
  label,
  coord,
  color = "green",
}: CoordinateDisplayProps) => {
  const colors = {
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      <div
        className={`${colors[color]} border px-2 py-1 rounded text-xs font-mono`}
      >
        ({coord.x}, {coord.y})
      </div>
    </div>
  );
};

/**
 * マップ設定のコントロールパネル
 */
export const MapControls = ({ config, onConfigChange }: MapControlsProps) => {
  return (
    <SidebarCard
      title="Map Settings"
      icon={HiOutlineAdjustmentsHorizontal}
      defaultOpen={true}
      collapsible={true}
    >
      <div className="space-y-4">
        <Slider
          label="Width"
          sliderId="widthSlider"
          value={config.width}
          min={10}
          max={50}
          onChange={(value) => onConfigChange("width", value)}
        />
        <Slider
          label="Height"
          sliderId="heightSlider"
          value={config.height}
          min={10}
          max={40}
          onChange={(value) => onConfigChange("height", value)}
        />
        <Slider
          label="Enemy Count"
          sliderId="enemyCountSlider"
          value={config.enemyCount}
          min={0}
          max={20}
          onChange={(value) => onConfigChange("enemyCount", value)}
        />

        {/* 座標表示 */}
        <CardDivider className="my-3" />
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-500 mb-2">
            Coordinates
          </div>
          <CoordinateDisplay label="Start" coord={config.start} color="green" />
          <CoordinateDisplay label="End" coord={config.end} color="red" />
        </div>
      </div>
    </SidebarCard>
  );
};
