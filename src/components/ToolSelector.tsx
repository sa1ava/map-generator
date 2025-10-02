import { HiOutlineLightBulb } from "react-icons/hi2";
import type { EditMode } from "../types/component";
import { EDIT_TOOLS } from "../types/constants";
export type ToolSelectorProps = {
  editMode: EditMode;
  setEditMode: (editMode: EditMode) => void;
};

export const ToolSelector = ({ editMode, setEditMode }: ToolSelectorProps) => {
  return (
    <div className="space-y-3">
      {/* ヒント */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-gray-500">Select editing tool</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="font-mono">1-6</span>
          <span>⌨️</span>
        </div>
      </div>

      {/* ツールリスト */}
      <div className="space-y-1.5">
        {EDIT_TOOLS.map((tool, index) => {
          const Icon = tool.icon;
          const isSelected = tool.mode === editMode;
          const keyNum = index + 1;

          return (
            <button
              type="button"
              key={tool.mode}
              onClick={() => setEditMode(tool.mode)}
              className={`
                w-full px-3 py-2.5 rounded-lg border-2 transition-all
                flex items-center gap-2.5
                ${
                  isSelected
                    ? `${tool.bgColor} ${tool.borderColor} ${tool.textColor} shadow-sm`
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {/* ラジオボタン風インジケーター */}
              <div
                className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${isSelected ? "border-current" : "border-gray-300"}
                `}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-current" />
                )}
              </div>

              {/* アイコン */}
              <Icon className="w-4 h-4 flex-shrink-0" />

              {/* ラベル */}
              <span className="text-sm font-medium flex-1 text-left truncate">
                {tool.label}
              </span>
              <KeyBadge keyNum={keyNum} />
            </button>
          );
        })}
      </div>

      {/* 説明文 */}
      <div className="px-1 pt-1 border-t border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          {EDIT_TOOLS.find((t) => t.mode === editMode)?.description}
        </p>
      </div>

      {/* キーボードヒント */}
      <div className="px-1 pt-1">
        <p className="text-xs flex items-center gap-1.5">
          <HiOutlineLightBulb className="w-3 h-3" />
          Press
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
            1-6
          </kbd>
          to switch
        </p>
      </div>
    </div>
  );
};

const KeyBadge = ({ keyNum }: { keyNum: number }) => (
  <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-bold text-gray-600 bg-gray-100 border border-gray-300 rounded">
    {keyNum}
  </span>
);
