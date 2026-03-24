export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  hasTranslation: boolean;
}

export interface Post extends PostSummary {
  content: string;
  contentEn?: string;
}
