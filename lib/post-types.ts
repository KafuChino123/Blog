export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  titleEn?: string;
  excerptEn?: string;
  date: string;
  tags: string[];
  hasTranslation: boolean;
}

export interface Post extends PostSummary {
  content: string;
  contentEn?: string;
}
