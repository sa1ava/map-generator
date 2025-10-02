import {
  HiEye,
  HiMapPin,
  HiNoSymbol,
  HiOutlineBugAnt,
  HiOutlineShare,
  HiSquares2X2,
} from "react-icons/hi2";
import type { EditTool, MapStats } from "./component";
import type { MapGeneratorParams, Point } from "./module";

export const CELL_SIZE = 18;

export const CELL_TYPES = {
  WALL: "wall",
  PATH: "path",
} as const;

export const DIRECTIONS: { [key: string]: Point } = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
} as const satisfies Record<string, Point>;

export const MAZE_CONFIG = {
  EXTRA_CONNECTION_DENSITY: 0.03,
  EXTRA_CONNECTION_PROBABILITY: 0.4,
  NEIGHBOR_SPACING_MULTIPLIER: 1,
} as const;

// 初期値
export const initialConfig: MapGeneratorParams = {
  width: 30,
  height: 20,
  start: { x: 2, y: 2 },
  end: { x: 27, y: 17 },
  pathWidth: 1,
  enemyCount: 5,
  shouldPlaceEnemies: true,
};

export const initialStats: MapStats = {
  totalCells: 0,
  pathCells: 0,
  wallCells: 0,
  enemyCells: 0,
  pathRatio: "undefined",
};

// 編集モード
export const EDIT_TOOLS: EditTool[] = [
  {
    mode: "none",
    icon: HiEye,
    label: "View Only",
    description: "Disable editing mode",
    color: "gray",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-300",
    textColor: "text-gray-700",
  },
  {
    mode: "start",
    icon: HiMapPin,
    label: "Move Start",
    description: "Click a path to set start point",
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
    textColor: "text-green-700",
  },
  {
    mode: "end",
    icon: HiNoSymbol,
    label: "Move End",
    description: "Click a path to set end point",
    color: "red",
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
    textColor: "text-red-700",
  },
  {
    mode: "path",
    icon: HiOutlineShare,
    label: "Draw Path",
    description: "Click or drag to create paths",
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
    textColor: "text-blue-700",
  },
  {
    mode: "wall",
    icon: HiSquares2X2,
    label: "Draw Wall",
    description: "Click or drag to create walls",
    color: "gray",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-600",
    textColor: "text-gray-700",
  },
  {
    mode: "enemy",
    icon: HiOutlineBugAnt,
    label: "Place Enemy",
    description: "Click paths to toggle enemies",
    color: "amber",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-500",
    textColor: "text-amber-700",
  },
];
