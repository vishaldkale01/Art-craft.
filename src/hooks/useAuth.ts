import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // In a real app, implement actual authentication
    if (email === 'admin@example.com' && password === 'password') {
      set({ isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));