import { create } from 'zustand';

interface AboutState {
  aboutText: string;
  education: string[];
  exhibitions: string[];
  imageUrl: string;
  setAbout: (data: { aboutText: string; education: string[]; exhibitions: string[]; imageUrl: string }) => void;
}

export const useAbout = create<AboutState>((set) => ({
  aboutText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  education: [
    'Master of Fine Arts, University Name, Year',
    'Bachelor of Arts, University Name, Year',
  ],
  exhibitions: [
    'Solo Exhibition, Gallery Name, City, Year',
    'Group Exhibition, Gallery Name, City, Year',
    'Art Fair, Event Name, City, Year',
  ],
  imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
  setAbout: (data) => set(data),
}));
