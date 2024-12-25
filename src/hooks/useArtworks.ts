import { create } from 'zustand';
import { Artwork } from '../types';

interface ArtworksState {
  artworks: Artwork[];
  addArtwork: (artwork: Omit<Artwork, 'id' | 'createdAt'>) => void;
  updateArtwork: (id: string, artwork: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
}

export const useArtworks = create<ArtworksState>((set) => ({
  artworks: [],
  addArtwork: (artwork) =>
    set((state) => ({
      artworks: [
        ...state.artworks,
        {
          ...artwork,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  updateArtwork: (id, artwork) =>
    set((state) => ({
      artworks: state.artworks.map((a) =>
        a.id === id ? { ...a, ...artwork } : a
      ),
    })),
  deleteArtwork: (id) =>
    set((state) => ({
      artworks: state.artworks.filter((a) => a.id !== id),
    })),
}));