export interface Product {
  id: number;
  title: string;
  category: string;
  desc: string;
  features: string[];
  image: string;
  link?: string;
}

export interface Service {
  slug: string;
  title: string;
  category: string;
  iconKey: string;
  desc: string;
  points: string[];
}

export interface GalleryItem {
  id: number;
  title: string;
  desc?: string;
  image: string;
  category: string;
}

export interface ArticleContentSection {
  heading: string;
  content: string | string[];
}

export interface ArticleContent {
  subtitle?: string;
  sections?: ArticleContentSection[];
}

export interface AITopic {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  content?: ArticleContent;
}

export interface RDBlog {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  content?: ArticleContent;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface TeamDirectory {
  management: TeamMember[];
  leads: TeamMember[];
  supervisors: TeamMember[];
}

export interface Brand {
  name: string;
  domain: string;
  logo: string;
}
