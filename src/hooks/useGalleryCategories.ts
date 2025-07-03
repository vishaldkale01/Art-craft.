import { create } from 'zustand';
import { supabase } from '../supabaseClient';

export interface GalleryCategoriesState {
  categories: string[];
  fetchCategories: () => Promise<void>;
  addCategory: (category: string) => Promise<void>;
  deleteCategory: (category: string) => Promise<void>;
}

export const useGalleryCategories = create<GalleryCategoriesState>((set) => ({
  categories: [],
  fetchCategories: async () => {
    const { data, error } = await supabase
      .from('gallery_categories')
      .select('*')
      .order('name');
    if (!error) set({ categories: (data || []).map((c) => c.name) });
  },
  addCategory: async (category) => {
    const { data, error } = await supabase
      .from('gallery_categories')
      .insert([{ name: category }])
      .select();
    if (!error && data)
      set((state) => ({ categories: [...state.categories, data[0].name] }));
  },
  deleteCategory: async (category) => {
    const { error } = await supabase
      .from('gallery_categories')
      .delete()
      .eq('name', category);
    if (!error)
      set((state) => ({
        categories: state.categories.filter((c) => c !== category),
      }));
  },
}));
