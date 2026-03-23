"use client";

import { useMemo, useState } from "react";
import { Tag } from "@/components/tag";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PostCard } from "@/components/post-card";
import { useLanguage } from "@/components/providers";
import type { PostSummary } from "@/lib/post-types";

interface HomePageContentProps {
  posts: PostSummary[];
}

export function HomePageContent({ posts }: HomePageContentProps) {
  const { t } = useLanguage();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))),
    [posts],
  );

  const filteredPosts = useMemo(
    () =>
      selectedTags.length === 0
        ? posts
        : posts.filter((post) =>
            selectedTags.some((tag) => post.tags.includes(tag)),
          ),
    [posts, selectedTags],
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <section className="space-y-4 py-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="text-accent">{"//"}</span>
              <span>{t("hero.comment")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium text-foreground text-balance leading-tight whitespace-pre-line">
              {t("hero.title")}
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg font-mono">
              {">"} {t("hero.subtitle")}
            </p>
          </div>
        </section>

        {availableTags.length > 0 && (
          <section className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <span className="text-accent">const</span>
              <span>{t("tags.label")}</span>
              <span className="text-muted-foreground/60">=</span>
              <span className="text-muted-foreground/60">[</span>
            </div>
            <div className="flex flex-wrap gap-2 min-h-6">
              {availableTags.map((tag) => (
                <Tag
                  key={tag}
                  label={tag}
                  active={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mt-4">
              <span className="text-muted-foreground/60">]</span>
            </div>
          </section>
        )}

        <section className="space-y-1">
          <div className="flex items-center text-xs font-mono text-muted-foreground mb-3">
            {selectedTags.length > 0 ? (
              <span>
                {t("posts.label")}
                <span className="text-muted-foreground/60">.</span>
                <span className="text-accent">filter</span>
                <span className="text-muted-foreground/60">(</span>
                {t("tags.label")}
                <span className="text-muted-foreground/60">)</span>{" "}
                <span className="text-muted-foreground/60">=</span>{" "}
                <span className="text-muted-foreground/60">[</span>
              </span>
            ) : (
              <span>
                <span className="text-accent">const</span> {t("posts.label")}{" "}
                <span className="text-muted-foreground/60">=</span>{" "}
                <span className="text-muted-foreground/60">[</span>
              </span>
            )}
          </div>

          <div className="space-y-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <PostCard key={post.slug} post={post} />)
            ) : (
              <div className="py-4 text-sm text-muted-foreground">
                {t("posts.empty")}
              </div>
            )}
          </div>

          <div className="flex items-center text-xs font-mono text-muted-foreground mt-3">
            <span className="text-muted-foreground/60">]</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
