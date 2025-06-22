import { create } from 'zustand';
import { BlogPost } from '../types';

interface BlogPostsState {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
}

const initialPosts: BlogPost[] = [
  {
    id: '1',
    description: 'News article on Hamrakura about art event (2025-01-26)',
    imageUrl:
      'https://hamrakura.com/uploads/news/images/prativa-pokharel-artist.jpg',
    date: '2025-01-26',
    url: 'https://hamrakura.com/news-details/184994/2025-01-26?fbclid=IwY2xjawIC5E1leHRuA2FlbQIxMQABHU3OSLi-e__rMHHhctKTPIcEESgf-rJyAM6X7GQx3jipcF--zWi-QjjWYA_aem_3WnTAtfZ3j7uubiyRYz24g',
  },
  {
    id: '2',
    description: 'Coverage by Nepal Bahas on recent art story',
    imageUrl:
      'https://nepalbahas.prixacdn.net/media/albums/kala__2_RGZZcXaVfY_BJoDnr6BOg.jpg',
    date: '2025-01-26',
    url: 'https://www.nepalbahas.com/story/679335/?fbclid=IwY2xjawHc421leHRuA2FlbQIxMQABHXxdwduXCg62aHmFs_F_5AwSe9kjUJgk4c76lonbJkMPIP4w3Jkqc10y0g_aem_ASfjw2ZUpZBngu4q1n47Nw',
  },
  {
    id: '3',
    description: 'Hamrakura news: year-end art summary (2024-12-31)',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5fb9913abbcb4708490193f3/1721562715971-XHUPSSUGPLNUNC7GM92R/ART+ON+LOOP+-+BARCELONA.jpg?format=2500w',
    date: '2024-12-31',
    url: 'https://hamrakura.com/news-details/183660/2024-12-31?fbclid=IwY2xjawHg0zJleHRuA2FlbQIxMQABHf39OOsCT1JpgCmLbiIPM7Rwwq_uX2Of6Ls0lRT67LRqFdglDXMb9IaO_A_aem_dQkbletbmHA1042zj7BmmQ',
  },
  {
    id: '4',
    description: 'The Holy Art Journal: AOL Barcelona exhibition',
    imageUrl:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
    date: '2025-06-22',
    url: 'https://www.theholyart.com/journal/aolbarcelona',
  },
];

function loadPosts(): BlogPost[] {
  const stored = localStorage.getItem('blogPosts');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialPosts;
    }
  }
  return initialPosts;
}

export const useBlogPosts = create<BlogPostsState>((set) => ({
  posts: loadPosts(),
  addPost: (post) =>
    set((state) => {
      const newPosts = [
        ...state.posts,
        {
          ...post,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('blogPosts', JSON.stringify(newPosts));
      return { posts: newPosts };
    }),
  updatePost: (id, post) =>
    set((state) => {
      const newPosts = state.posts.map((p) =>
        p.id === id ? { ...p, ...post } : p
      );
      localStorage.setItem('blogPosts', JSON.stringify(newPosts));
      return { posts: newPosts };
    }),
  deletePost: (id) =>
    set((state) => {
      const newPosts = state.posts.filter((p) => p.id !== id);
      localStorage.setItem('blogPosts', JSON.stringify(newPosts));
      return { posts: newPosts };
    }),
}));