import { create } from 'zustand';
import { supabase } from '../supabaseClient';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.user && !error) {
      set({ isAuthenticated: true });
    } else {
      throw new Error(error?.message || 'Invalid credentials');
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));


