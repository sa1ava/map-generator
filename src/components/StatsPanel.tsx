import { HiOutlineChartBar } from "react-icons/hi";
import type {
  StatItemProps,
  StatsPanelProps,
  SummaryCardProps,
} from "../types/component";
import { CardDivider, SidebarCard } from "./SidebarCard";

/**
 * 統計情報コンポーネント
 */
const StatItem = ({
  label,
  color = "blue",
  value,
  showBar = false,
  percentage = 0,
}: StatItemProps) => {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    gray: "text-gray-600 bg-gray-50",
    red: "text-red-600 bg-red-50",
    purple: "text-purple-600 bg-purple-50",
  };

  const barColors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600">{label}</span>
        </div>
        <span
          className={`${colors[color]} px-2 py-0.5 rounded text-xs font-semibold`}
        >
          {value}
        </span>
      </div>
      {showBar && (
        <div>
          <div
            className={`${barColors[color]} h-1.5 rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

/**
 * サマリーカードコンポーネント
 */
const SummaryCard = ({
  label,
  value,
  bgColor = "bg-blue-50",
  textColor = "text-blue-700",
}: SummaryCardProps) => (
  <div className={`${bgColor} rounded-lg p-3 flex items-center gap-3`}>
    <div className="flex-1 min-w-0">
      <div className="text-xs text-gray-600 mb-0.5">{label}</div>
      <div className={`text-lg font-bold ${textColor} truncate`}>{value}</div>
    </div>
  </div>
);

/**
 * 統計情報パネル
 */
export const StatsPanel = ({ stats, isGenerated }: StatsPanelProps) => {
  if (!isGenerated) return <div></div>;

  const pathPercentage = parseFloat(stats.pathRatio);
  const wallPercentage = 100 - pathPercentage;
  return (
    <SidebarCard
      title="Statistics"
      icon={HiOutlineChartBar}
      defaultOpen={false}
      collapsible={true}
    >
      <div className="space-y-4">
        {/* サマリー */}
        <div className="grid grid-cols-2 gap-2">
          <SummaryCard
            label="Total"
            value={stats.totalCells}
            bgColor="bg-red-50"
            textColor="text-red-700"
          />
          <SummaryCard
            label="Enemies"
            value={stats.enemyCells}
            bgColor="bg-red-50"
            textColor="text-red-700"
          />
        </div>

        {/* 詳細統計情報 */}
        <CardDivider className="my-3" />
        <div className="space-y-3">
          <StatItem
            label="Path Cells"
            value={stats.pathCells}
            color="green"
            showBar={true}
            percentage={pathPercentage}
          />
          <StatItem
            label="Wall Cells"
            value={stats.wallCells}
            color="gray"
            showBar={true}
            percentage={wallPercentage}
          />
        </div>

        {/* 割合表示 */}
        <CardDivider className="my-3" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">
              Path Ratio
            </span>
            <span className="text-sm font-bold text-green-600">
              {stats.pathRatio}
            </span>
          </div>

          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600"
              style={{ width: stats.pathRatio }}
            ></div>
          </div>

          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* 品質インジケーター */}
        <CardDivider className="my-3" />
        <div>
          <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <span className="text-lg">✨</span>
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-700">
                Map Quality
              </div>
              <div className="text-xs text-gray-500">
                {pathPercentage > 40
                  ? "Optimal"
                  : pathPercentage > 25
                    ? "Good"
                    : "Dense"}
              </div>
            </div>
            <div className="text-xl">
              {pathPercentage > 40 ? "😊" : pathPercentage > 25 ? "🙂" : "😐"}
            </div>
          </div>
        </div>
      </div>
    </SidebarCard>
  );
};
