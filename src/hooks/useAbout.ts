import { create } from 'zustand';
import { supabase } from '../supabaseClient';

interface AboutState {
  aboutText: string;
  education: string[];
  exhibitions: string[];
  imageUrl: string;
  fetchAbout: () => Promise<void>;
  setAbout: (data: { aboutText: string; education: string[]; exhibitions: string[]; imageUrl: string }) => Promise<void>;
}

export const useAbout = create<AboutState>((set) => ({
  aboutText: '',
  education: [],
  exhibitions: [],
  imageUrl: '',
  fetchAbout: async () => {
    const { data, error } = await supabase.from('about').select('*').single();
    if (!error && data) set({
      aboutText: data.about_text || '',
      education: data.education || [],
      exhibitions: data.exhibitions || [],
      imageUrl: data.image_url || '',
    });
  },
  setAbout: async (data) => {
    // Upsert single row (id=1)
    await supabase.from('about').upsert({
      id: 1,
      about_text: data.aboutText,
      education: data.education,
      exhibitions: data.exhibitions,
      image_url: data.imageUrl,
    });
    set({
      aboutText: data.aboutText,
      education: data.education,
      exhibitions: data.exhibitions,
      imageUrl: data.imageUrl,
    });
  },
}));
