import { create } from 'zustand';
import { supabase } from '../supabaseClient';

interface ContactState {
  address: string;
  phone: string;
  email: string;
  studioHours: string[];
  fetchContact: () => Promise<void>;
  setContact: (data: { address: string; phone: string; email: string; studioHours: string[] }) => Promise<void>;
}

export const useContact = create<ContactState>((set) => ({
  address: '',
  phone: '',
  email: '',
  studioHours: [],
  fetchContact: async () => {
    const { data, error } = await supabase.from('contact').select('*').single();
    if (!error && data) set({
      address: data.address || '',
      phone: data.phone || '',
      email: data.email || '',
      studioHours: data.studio_hours || [],
    });
  },
  setContact: async (data) => {
    await supabase.from('contact').upsert({
      id: 1,
      address: data.address,
      phone: data.phone,
      email: data.email,
      studio_hours: data.studioHours,
    });
    set({
      address: data.address,
      phone: data.phone,
      email: data.email,
      studioHours: data.studioHours,
    });
  },
}));
