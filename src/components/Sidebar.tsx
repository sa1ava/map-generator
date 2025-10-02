import { HiOutlineMap, HiXMark } from "react-icons/hi2";
import { useMapStore } from "../stores/mapStore";
import { useUIStore } from "../stores/uiStore";
import { ActionButtons } from "./ActionButtons";
import { MapControls } from "./MapControls";
import { StatsPanel } from "./StatsPanel";

export const Sidebar = () => {
  // サイドバー開閉管理
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  // マップ管理
  const {
    config,
    stats,
    isGenerating,
    isGenerated,
    hasGrid,
    generateMap,
    resetAll,
    updateConfig,
  } = useMapStore();

  return (
    <aside
      className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[19rem] bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
    >
      {/* サイドバーヘッダー */}
      <div
        className="sticky top-0 bg-white 
                bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800 
                p-4 h-[4.5rem] flex items-center justify-between z-10 flex-shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backgrop-blur-sm rounded-lg p-2">
            <HiOutlineMap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide uppercase">
              Map Generator
            </h2>
            <p className="text-xs text-blue-100">2D RPG Maze Creator</p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleSidebar}
          className="lg:hidden text-white/80 
                    hover:text-white hover:bg-white/10
                    p-2 rounded-lg transition-all"
          aria-label="Close sidebar"
        >
          <HiXMark className="w-5 h-5" />
        </button>
      </div>

      {/* サイドバーコンテンツ */}
      <div className="flex-1 overflow-y-scroll p-4 space-y-4">
        <ActionButtons
          hasGrid={hasGrid()}
          isGenerating={isGenerating}
          onGenerate={generateMap}
          onReset={resetAll}
        />

        <MapControls config={config} onConfigChange={updateConfig} />

        <StatsPanel stats={stats} isGenerated={isGenerated} />
      </div>
    </aside>
  );
};
