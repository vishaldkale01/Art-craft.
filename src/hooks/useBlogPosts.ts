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
    if (!error && data) {
      // Map snake_case to camelCase
      const mapped = data.map((p: any) => ({
        id: p.id,
        description: p.description,
        imageUrl: p.image_url,
        date: p.date,
        url: p.url,
      }));
      set({ posts: mapped });
    }
  },
  addPost: async (post) => {
    // Map camelCase to snake_case for Supabase
    const dbPost = { ...post };
    if (post.imageUrl !== undefined) {
      dbPost.image_url = post.imageUrl;
      delete dbPost.imageUrl;
    }
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([dbPost])
      .select();
    if (!error && data)
      set((state) => ({
        posts: [
          {
            ...data[0],
            imageUrl: data[0].image_url,
          },
          ...state.posts,
        ],
      }));
  },
  updatePost: async (id, post) => {
    // Map camelCase to snake_case for Supabase
    const dbPost: any = { ...post };
    if (post.imageUrl !== undefined) {
      dbPost.image_url = post.imageUrl;
      delete dbPost.imageUrl;
    }
    const { data, error } = await supabase
      .from('blog_posts')
      .update(dbPost)
      .eq('id', id)
      .select();
    if (!error && data)
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === id
            ? {
                ...data[0],
                imageUrl: data[0].image_url,
              }
            : p
        ),
      }));
  },
  deletePost: async (id) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error)
      set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
  },
}));