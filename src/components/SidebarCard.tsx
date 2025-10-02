import { type ReactNode, useState } from "react";
import type { IconType } from "react-icons";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

export type SidebarCardProps = {
  title: string;
  icon: IconType;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  collapsible?: boolean;
};

export type SidebarSectionHeaderProps = {
  children: ReactNode;
  Icon: IconType;
  isCollapsible: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * サイドバーセクションのヘッダーコンポーネント
 */
export const SectionHeader = ({
  children,
  Icon,
  isCollapsible,
  isOpen,
  onToggle,
}: SidebarSectionHeaderProps) => (
  <div
    className={`
      flex items-center gap-2 mb-3 ${isCollapsible ? "cursor-pointer-select-none" : ""}      
    `}
  >
    {Icon && <Icon className="w-4 h-4 text-gray-500" />}
    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex-1">
      {children}
    </h3>
    {isCollapsible && (
      <button type="button" onClick={isCollapsible ? onToggle : undefined}>
        {isOpen ? (
          <HiOutlineChevronDown className="w-4 h-4" />
        ) : (
          <HiOutlineChevronUp className="w-4 h-4" />
        )}
      </button>
    )}
  </div>
);

/**
 * サイドバーカード共通コンポーネント
 */
export const SidebarCard = ({
  title,
  icon,
  children,
  className = "",
  defaultOpen = true,
  collapsible = true,
}: SidebarCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const handleToggle = () => {
    if (collapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray border-gray-200 p-4 ${className}`}
    >
      <SectionHeader
        Icon={icon}
        isCollapsible={collapsible}
        isOpen={isOpen}
        onToggle={handleToggle}
      >
        {title}
      </SectionHeader>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export const CardContent = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className: string;
}) => <div className={className}>{children}</div>;

export const CardDivider = ({ className = "" }: { className: string }) => (
  <div className={`border-t border-gray-100 ${className}`}></div>
);
