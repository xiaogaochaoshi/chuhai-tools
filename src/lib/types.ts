export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  pricing: 'free' | 'freemium' | 'paid';
  featured: boolean;
  affiliate?: string;
  logo?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface ToolFrontmatter {
  name: string;
  tagline: string;
  url: string;
  category: string;
  pricing: 'free' | 'freemium' | 'paid';
  featured: boolean;
  affiliate?: string;
  logo?: string;
}
