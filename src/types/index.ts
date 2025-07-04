export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  featured?: boolean; // Added for featured works
}

export interface BlogPost {
  id?: string;
  description?: string;
  imageUrl?: string;
  date?: string;
  url?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}