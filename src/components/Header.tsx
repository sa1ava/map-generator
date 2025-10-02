import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { HiMenu, HiMoon, HiQuestionMarkCircle } from "react-icons/hi";
import { HiLanguage } from "react-icons/hi2";
import { useUIStore } from "../stores/uiStore";

export type HeaderButtonProps = {
  Icon: IconType;
  className?: string;
  ariaLabel: string;
  title: string;
  children?: ReactNode;
  onClick: () => void;
};

export const HeaderButton = ({
  Icon,
  className = "",
  ariaLabel,
  title,
  children,
  onClick,
}: HeaderButtonProps) => (
  <button
    type="button"
    className={`text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all ${className}`}
    aria-label={ariaLabel}
    title={title}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    {children}
  </button>
);

export const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <header
      className="
        bg-gradient-to-r from-blue-700 to-blue-800 border-b border-blue-900
        p-4 h-[4.5rem] flex items-center justify-between  gap-4 flex-shrink-0"
    >
      <div>
        {!isSidebarOpen && (
          <HeaderButton
            ariaLabel="Open sidebar"
            title="Menu"
            Icon={HiMenu}
            onClick={toggleSidebar}
          />
        )}
      </div>

      {/* 機能ボタン群 */}
      <div className="flex items-center gap-2">
        <HeaderButton
          ariaLabel="Help"
          title="Help & Documentation"
          Icon={HiQuestionMarkCircle}
          onClick={() => {}}
        />
        <HeaderButton
          ariaLabel="Change Language"
          title="Language"
          Icon={HiLanguage}
          onClick={() => {}}
        />
        <HeaderButton
          ariaLabel="Help"
          title="Help & Documentation"
          Icon={HiMoon}
          onClick={() => {}}
        />
      </div>
    </header>
  );
};
