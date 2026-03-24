import { redirect } from "next/navigation";
import { getAllPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LegacyPostPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/blog/${encodeURIComponent(slug)}`);
}
