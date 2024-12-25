import { create } from 'zustand';
import { BlogPost } from '../types';

interface BlogPostsState {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
}

export const useBlogPosts = create<BlogPostsState>((set) => ({
  posts: [],
  addPost: (post) =>
    set((state) => ({
      posts: [
        ...state.posts,
        {
          ...post,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  updatePost: (id, post) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, ...post } : p
      ),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
}));