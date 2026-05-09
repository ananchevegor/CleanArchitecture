import { storage } from "@infrastructure/storage/mmkvStorage";
import { create } from "zustand";

interface FavoriteState {
    favorites: string[];
    setFavorites: (favorites: string[]) => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
    favorites: [],
    setFavorites: (favorites: string[]) => set({ favorites }),
}));
