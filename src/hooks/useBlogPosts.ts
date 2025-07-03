import { create } from 'zustand';
import { supabase } from '../supabaseClient';
import { BlogPost } from '../types';

interface BlogPostsState {
  posts: BlogPost[];
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const useBlogPosts = create<BlogPostsState>((set) => ({
  posts: [],
  fetchPosts: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });
    if (!error) set({ posts: data || [] });
  },
  addPost: async (post) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ ...post }])
      .select();
    if (!error && data)
      set((state) => ({ posts: [data[0], ...state.posts] }));
  },
  updatePost: async (id, post) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', id)
      .select();
    if (!error && data)
      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? data[0] : p)),
      }));
  },
  deletePost: async (id) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error)
      set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
  },
}));