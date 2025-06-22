export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
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