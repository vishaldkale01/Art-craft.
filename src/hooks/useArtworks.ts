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
        featured: a.featured ?? false,
      }));
      set({ artworks: mapped });
    }
  },
  addArtwork: async (artwork) => {
    // Map camelCase to snake_case for Supabase
    const dbArtwork = {
      title: artwork.title,
      description: artwork.description,
      image_url: artwork.imageUrl,
      category: artwork.category,
      featured: artwork.featured ?? false,
    };
    const { data, error } = await supabase
      .from('artworks')
      .insert([dbArtwork])
      .select();
    if (!error && data) {
      // Map result to camelCase
      const mapped = {
        id: data[0].id,
        title: data[0].title,
        description: data[0].description,
        imageUrl: data[0].image_url,
        category: data[0].category,
        createdAt: data[0].created_at,
        featured: data[0].featured ?? false,
      };
      set((state) => ({ artworks: [mapped, ...state.artworks] }));
    }
  },
  updateArtwork: async (id, artwork) => {
    // Map camelCase to snake_case for Supabase
    const dbArtwork: any = { ...artwork };
    if (artwork.imageUrl !== undefined) {
      dbArtwork.image_url = artwork.imageUrl;
      delete dbArtwork.imageUrl;
    }
    if (artwork.featured !== undefined) {
      dbArtwork.featured = artwork.featured;
    }
    const { data, error } = await supabase
      .from('artworks')
      .update(dbArtwork)
      .eq('id', id)
      .select();
    if (!error && data)
      set((state) => ({
        artworks: state.artworks.map((a) =>
          a.id === id
            ? {
                id: data[0].id,
                title: data[0].title,
                description: data[0].description,
                imageUrl: data[0].image_url,
                category: data[0].category,
                createdAt: data[0].created_at,
                featured: data[0].featured ?? false,
              }
            : a
        ),
      }));
  },
  deleteArtwork: async (id) => {
    const { error } = await supabase.from('artworks').delete().eq('id', id);
    if (!error)
      set((state) => ({ artworks: state.artworks.filter((a) => a.id !== id) }));
  },
}));