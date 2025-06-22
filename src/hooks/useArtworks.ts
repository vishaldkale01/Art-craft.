import { create } from 'zustand';
import { Artwork } from '../types';

function loadArtworks(): Artwork[] {
  const stored = localStorage.getItem('artworks');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

interface ArtworksState {
  artworks: Artwork[];
  addArtwork: (artwork: Omit<Artwork, 'id' | 'createdAt'>) => void;
  updateArtwork: (id: string, artwork: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
}

export const useArtworks = create<ArtworksState>((set) => ({
  artworks: loadArtworks(),
  addArtwork: (artwork) =>
    set((state) => {
      const newArtworks = [
        ...state.artworks,
        {
          ...artwork,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('artworks', JSON.stringify(newArtworks));
      return { artworks: newArtworks };
    }),
  updateArtwork: (id, artwork) =>
    set((state) => {
      const newArtworks = state.artworks.map((a) =>
        a.id === id ? { ...a, ...artwork } : a
      );
      localStorage.setItem('artworks', JSON.stringify(newArtworks));
      return { artworks: newArtworks };
    }),
  deleteArtwork: (id) =>
    set((state) => {
      const newArtworks = state.artworks.filter((a) => a.id !== id);
      localStorage.setItem('artworks', JSON.stringify(newArtworks));
      return { artworks: newArtworks };
    }),
}));