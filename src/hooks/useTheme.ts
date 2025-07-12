import { setThemeVariables, ThemeColors } from '../utils/theme';
import { create } from 'zustand';
import { supabase } from '../supabaseClient';

export type Theme = 'light' | 'dark' | 'system' | string; // string for custom themes

interface ThemeState {
  theme: Theme;
  adminDefault: Theme;
  customThemes?: Record<string, ThemeColors>;
  setTheme: (theme: Theme, customColors?: Partial<ThemeColors>) => void;
  setAdminDefault: (theme: Theme) => Promise<void>;
  fetchAdminDefault: () => Promise<void>;
  setInitialTheme: (theme: Theme) => void;
}

const defaultThemes: Record<string, ThemeColors> = {
  light: {
    bg: '#fff',
    text: '#111',
    border: '#e5e7eb',
    accent: '#6366f1',
    accentText: '#fff',
    mutedText: '#888',
    error: '#ef4444',
  },
  dark: {
    bg: '#18181b',
    text: '#f3f4f6',
    border: '#27272a',
    accent: '#6366f1',
    accentText: '#fff',
    mutedText: '#a1a1aa',
    error: '#f87171',
  },
};

export const useTheme = create<ThemeState>((set, get) => ({
  theme: 'system',
  adminDefault: 'system',
  customThemes: {},
  setTheme: (theme: Theme, customColors?: Partial<ThemeColors>) => {
    set({ theme });
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    if (customColors) {
      setThemeVariables(customColors);
    } else if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setThemeVariables(defaultThemes.dark);
    } else if (theme === 'light' || theme === 'system') {
      document.documentElement.classList.add('light');
      setThemeVariables(defaultThemes.light);
    } else if (get().customThemes && get().customThemes[theme]) {
      setThemeVariables(get().customThemes![theme]);
    }
  },
  setAdminDefault: async (theme: Theme) => {
    await supabase.from('settings').upsert({ key: 'theme', value: theme });
    set({ adminDefault: theme });
  },
  fetchAdminDefault: async () => {
    const { data } = await supabase.from('settings').select('value').eq('key', 'theme').single();
    if (data && data.value) {
      set({ adminDefault: data.value });
      if (!localStorage.getItem('theme')) {
        get().setTheme(data.value);
      }
    }
  },
  setInitialTheme: (theme: Theme) => {
    set({ theme });
    document.documentElement.classList.remove('light', 'dark');
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setThemeVariables(defaultThemes.dark);
    } else if (theme === 'light' || theme === 'system') {
      document.documentElement.classList.add('light');
      setThemeVariables(defaultThemes.light);
    } else if (get().customThemes && get().customThemes[theme]) {
      setThemeVariables(get().customThemes![theme]);
    }
  },
}));

// On load, set theme from localStorage or system
const saved = localStorage.getItem('theme') as Theme | null;
if (saved) {
  useTheme.getState().setInitialTheme(saved);
} else {
  useTheme.getState().setInitialTheme('system');
}
