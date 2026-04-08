import { create } from "zustand";

interface NoteStore {
  notes: any[];
  selectNote: any;
  setNotes: (notes: any[]) => void;
  setSelectedNote: (note: any) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
    notes: [],
    selectNote: null,
    setNotes: (notes) => set({ notes }),
    setSelectedNote: (note) => set({ selectNote: note }),
}))