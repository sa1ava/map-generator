import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineArrowPath, HiOutlineCursorArrowRays } from "react-icons/hi2";
import { SidebarCard } from "./SidebarCard";

type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  variant: "primary" | "secondary" | "tertiary";
  Icon: IconType;
  children: ReactNode;
  fullWidth?: boolean;
};

type ActionButtonsProps = {
  hasGrid: boolean;
  isGenerating: boolean;
  onGenerate: () => void;
  onReset: () => void;
};

/**
 * ボタンコンポーネント
 */
const Button = ({
  onClick,
  disabled,
  variant = "primary",
  Icon,
  children,
  fullWidth = true,
}: ButtonProps) => {
  const baseClass =
    "px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2";
  const widthClass = fullWidth ? "w-full" : "";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white shadow-sm hover:shadow",
    secondary:
      "bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:bg-amber-300 text-white shadow-sm hover:shadow",
    tertiary:
      "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 border border-gray-300",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClass}
        ${widthClass}
        ${variants[variant]}
        ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </button>
  );
};

/**
 * ボタンパネルコンポーネント
 */
export const ActionButtons = ({
  hasGrid,
  isGenerating,
  onReset,
  onGenerate,
}: ActionButtonsProps) => {
  return (
    <SidebarCard
      title="Actions"
      icon={HiOutlineCursorArrowRays}
      defaultOpen={true}
      collapsible={false}
    >
      <div className="space-y-3">
        <Button
          onClick={onGenerate}
          disabled={isGenerating}
          variant="primary"
          Icon={HiOutlineArrowPath}
        >
          Generate Map
        </Button>
        <Button
          onClick={onReset}
          disabled={!hasGrid}
          variant="tertiary"
          Icon={HiOutlineTrash}
        >
          Reset all
        </Button>
      </div>

      {!hasGrid && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Tip:</strong> Adjust settings above, then click "Generate
            Map" to create your maze.
          </p>
        </div>
      )}
    </SidebarCard>
  );
};
