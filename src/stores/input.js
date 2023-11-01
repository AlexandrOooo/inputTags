import { create } from "zustand";

export const useInputsTagStore = create((set) => ({
  tagInputs: {},
  setNewTagInputs: (newTagInputs) => set({ tagInputs: newTagInputs }),
}));
