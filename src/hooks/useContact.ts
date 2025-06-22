import { create } from 'zustand';

interface ContactState {
  address: string;
  phone: string;
  email: string;
  studioHours: string[];
  setContact: (data: { address: string; phone: string; email: string; studioHours: string[] }) => void;
}

export const useContact = create<ContactState>((set) => ({
  address: '123 Artist Studio, Creative District, City',
  phone: '+1 (555) 123-4567',
  email: 'artist@example.com',
  studioHours: [
    'Monday - Friday: 10:00 AM - 6:00 PM',
    'Saturday: By Appointment',
    'Sunday: Closed',
  ],
  setContact: (data) => set(data),
}));
