import { HomePageContent } from "@/components/home-page-content";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default function Home() {
  return <HomePageContent posts={getAllPosts()} />;
}
