/**
 * StatsPanel
 */

import type { IconType } from "react-icons";

type StatColor = "blue" | "green" | "gray" | "red" | "purple";

export type StatItemProps = {
  label: string;
  color: StatColor;
  value: number | string;
  showBar: boolean;
  percentage: number;
};

export type StatsPanelProps = {
  stats: MapStats;
  isGenerated: boolean;
};

export type SummaryCardProps = {
  label: string;
  value: number | string;
  bgColor: string;
  textColor: string;
};

export type MapStats = {
  totalCells: number;
  pathCells: number;
  wallCells: number;
  enemyCells: number;
  pathRatio: string;
};

export type EditMode = "none" | "start" | "end" | "path" | "wall" | "enemy";
export type EditTool = {
  mode: EditMode;
  icon: IconType;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
};
