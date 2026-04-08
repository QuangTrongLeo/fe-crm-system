import { create } from "zustand";

interface InteractionStore {
  interactions: any[];
  selectInteraction: any;
  setInteractions: (interactions: any[]) => void;
  setSelectedInteraction: (interaction: any) => void;
}

export const useInteractionStore = create<InteractionStore>((set) => ({
    interactions: [],
    selectInteraction: null,
    setInteractions: (interactions) => set({ interactions }),
    setSelectedInteraction: (interaction) => set({ selectInteraction: interaction }),
}))