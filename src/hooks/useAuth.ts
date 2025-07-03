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
    // Check against Supabase users table (or fallback to static for now)
    // Example: const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // For now, fallback to static credentials
    if (email === 'admin@example.com' && password === 'password123') {
      set({ isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));


