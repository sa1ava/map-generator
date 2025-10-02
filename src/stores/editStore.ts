import { create } from "zustand";
import type { EditMode } from "../types/component";

export type EditStore = {
  editMode: EditMode; // 編集モード
  isEditing: boolean; // 編集中フラグ

  setEditMode: (mode: EditMode) => void;
  toggleEditMode: (mode: EditMode) => void;
  startEditing: () => void;
  stopEditing: () => void;
  resetEdit: () => void;
};

export const useEditStore = create<EditStore>((set) => ({
  /**
   * State
   */
  editMode: "none",
  isEditing: false,

  /**
   * Actions
   */
  setEditMode: (mode: EditMode) => set({ editMode: mode }),
  toggleEditMode: (mode: EditMode) =>
    set((state) => ({
      editMode: state.editMode === mode ? "none" : mode,
    })),
  startEditing: () => set({ isEditing: true }),
  stopEditing: () => set({ isEditing: false }),
  resetEdit: () =>
    set({
      editMode: "none",
      isEditing: false,
    }),
}));
