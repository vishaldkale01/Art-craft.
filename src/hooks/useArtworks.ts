import { create } from 'zustand';
import { supabase } from '../supabaseClient';
import { Artwork } from '../types';

interface ArtworksState {
  artworks: Artwork[];
  fetchArtworks: () => Promise<void>;
  addArtwork: (artwork: Omit<Artwork, 'id' | 'createdAt'>) => Promise<void>;
  updateArtwork: (id: string, artwork: Partial<Artwork>) => Promise<void>;
  deleteArtwork: (id: string) => Promise<void>;
}

export const useArtworks = create<ArtworksState>((set) => ({
  artworks: [],
  fetchArtworks: async () => {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      // Map snake_case to camelCase
      const mapped = data.map((a: any) => ({
        id: a.id,
        title: a.title,
        description: a.description,
        imageUrl: a.image_url,
        category: a.category,
        createdAt: a.created_at,
      }));
      set({ artworks: mapped });
    }
  },
  addArtwork: async (artwork) => {
    const { data, error } = await supabase
      .from('artworks')
      .insert([{ ...artwork }])
      .select();
    if (!error && data)
      set((state) => ({ artworks: [data[0], ...state.artworks] }));
  },
  updateArtwork: async (id, artwork) => {
    const { data, error } = await supabase
      .from('artworks')
      .update(artwork)
      .eq('id', id)
      .select();
    if (!error && data)
      set((state) => ({
        artworks: state.artworks.map((a) => (a.id === id ? data[0] : a)),
      }));
  },
  deleteArtwork: async (id) => {
    const { error } = await supabase.from('artworks').delete().eq('id', id);
    if (!error)
      set((state) => ({ artworks: state.artworks.filter((a) => a.id !== id) }));
  },
}));