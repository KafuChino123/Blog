import { HomePageContent } from "@/components/home-page-content";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  return <HomePageContent posts={getAllPosts()} />;
}
