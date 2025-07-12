// src/utils/theme.ts
export type ThemeColors = {
  bg: string;
  text: string;
  border: string;
  accent: string;
  accentText: string;
  mutedText: string;
  error: string;
};

export function setThemeVariables(colors: Partial<ThemeColors>) {
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    if (value) root.style.setProperty(`--${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}`, value);
  });
}
