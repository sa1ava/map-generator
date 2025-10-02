import { create } from "zustand";

export type UIStore = {
  isSidebarOpen: boolean;

  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

/**
 * UI状態の管理ストア
 */
export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
