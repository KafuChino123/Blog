"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Tag } from "@/components/tag";
import { getPostBySlug, formatDate, posts } from "@/lib/posts";

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);
  const { language } = useLanguage();

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">文章未找到</h1>
            <p className="text-muted-foreground">抱歉，您访问的文章不存在。</p>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
            >
              返回首页
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Find related posts
  const relatedPosts = posts
    .filter(
      (p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)),
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Article Header */}
        <header className="mb-12 space-y-6 border-b border-divider pb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-accent hover:text-foreground transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span className="ml-2">返回文章列表</span>
          </Link>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground leading-tight text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
              <time dateTime={post.date}>
                {formatDate(post.date, language).year}{" "}
                {formatDate(post.date, language).monthDay}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none space-y-6 mb-16">
          <div className="space-y-4">
            {/* Excerpt as intro */}
            <p className="text-lg text-muted-foreground italic leading-relaxed">
              {post.excerpt}
            </p>

            {/* Main content */}
            <div className="space-y-4 text-foreground">
              {post.content.split("\n\n").map(
                (paragraph, idx) =>
                  paragraph.trim() && (
                    <p key={idx} className="leading-relaxed text-balance">
                      {paragraph}
                    </p>
                  ),
              )}
            </div>
          </div>

          {/* Author Info */}
          <div className="border-t border-divider pt-8 mt-12 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold text-foreground shrink-0">
                {post.tags[0]?.charAt(0) || "D"}
              </div>
              <div>
                <p className="font-semibold text-foreground">Dev.log 团队</p>
                <p className="text-sm text-muted-foreground">
                  专注分享现代 Web 开发的深度思考与最佳实践。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-divider pt-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">相关文章</h2>
            <div className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/post/${relatedPost.slug}`}
                  className="block group"
                >
                  <div className="border border-border rounded-md p-4 group-hover:bg-post-hover group-hover:border-accent transition-all duration-300">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
