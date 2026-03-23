export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export interface Post extends PostSummary {
  content: string;
}
