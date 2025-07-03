import { create } from 'zustand';
import { supabase } from '../supabaseClient';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

interface MessagesState {
  messages: ContactMessage[];
  fetchMessages: () => Promise<void>;
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date'>) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

export const useMessages = create<MessagesState>((set) => ({
  messages: [],
  fetchMessages: async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('date', { ascending: false });
    if (!error) set({ messages: data || [] });
  },
  addMessage: async (msg) => {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ ...msg }])
      .select();
    if (!error && data)
      set((state) => ({ messages: [data[0], ...state.messages] }));
  },
  deleteMessage: async (id) => {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (!error)
      set((state) => ({
        messages: state.messages.filter((m) => m.id !== id),
      }));
  },
}));
