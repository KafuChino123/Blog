import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LegacyPostPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/blog/${encodeURIComponent(slug)}`);
}
