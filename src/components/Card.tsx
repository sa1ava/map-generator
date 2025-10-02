import type { ReactNode } from "react";
import type { IconType } from "react-icons";

type CardProps = {
  title: string;
  icon: IconType;
  children: ReactNode;
  className?: string;
};

type CardHeaderProps = {
  children: ReactNode;
  Icon: IconType;
};

/**
 * サイドバーセクションのヘッダーコンポーネント
 */
export const CardHeader = ({ children, Icon }: CardHeaderProps) => (
  <div className="flex items-center gap-2 mb-3">
    {Icon && <Icon className="w-5 h-5 text-gray-500" />}
    <h3 className="text-lg font-semibold text-gray-700 uppercase tracking-wide flex-1">
      {children}
    </h3>
  </div>
);

/**
 * カード共通コンポーネント
 */
export const Card = ({ title, icon, children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray border-gray-200 p-4 ${className}`}
    >
      <CardHeader Icon={icon}>{title}</CardHeader>
      <div className="transition-all duration-300 ease-in-out overflow-hidden">
        {children}
      </div>
    </div>
  );
};
