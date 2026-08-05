import { create } from 'zustand';

interface ProductUiState {
  // State
  visbil: boolean;
  show: { id?: string | number };
  color: string;
  imagenumper: number;
  image: string | number;

  // Actions
  setColor: (color: string) => void;
  setImagenumper: (num: number) => void;
  setImage: (image: string | number) => void;
  hand: (id: string | number) => void;
  resetUi: () => void;
}

export const useProductUiStore = create<ProductUiState>()((set) => ({
  visbil: false,
  show: {},
  color: "",
  imagenumper: 0,
  image: 0,

  setColor: (color) => set({ color }),
  setImagenumper: (imagenumper) => set({ imagenumper }),
  setImage: (image) => set({ image }),

  resetUi: () => set({ color: "", imagenumper: 0, image: 0 }),

  hand: (id) =>
    set((state) => {
      if (!state.visbil) {
        return { show: { id }, visbil: true };
      }
      return { visbil: false, imagenumper: 0, color: "" };
    }),
}));