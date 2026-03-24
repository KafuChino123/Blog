import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/blog-post-view";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts().filter((item) => item.slug !== post.slug);
  const relatedPosts =
    post.tags.length > 0
      ? allPosts
          .filter((item) => item.tags.some((tag) => post.tags.includes(tag)))
          .slice(0, 3)
      : allPosts.slice(0, 3);

  return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
