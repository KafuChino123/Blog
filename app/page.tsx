"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { Tag } from "@/components/tag";
import { getPublishedPosts } from "@/lib/posts";
import { useLanguage } from "@/components/providers";

export default function Home() {
  const { t } = useLanguage();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const publishedPosts = useMemo(() => getPublishedPosts(), []);
  const availableTags = useMemo(
    () => Array.from(new Set(publishedPosts.flatMap((p) => p.tags))),
    [publishedPosts],
  );

  const filteredPosts = useMemo(
    () =>
      selectedTags.length === 0
        ? publishedPosts
        : publishedPosts.filter((post) =>
            selectedTags.some((tag) => post.tags.includes(tag)),
          ),
    [publishedPosts, selectedTags],
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Hero Section */}
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

        {/* Tags Filter */}
        <section className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
            <span className="text-accent">const</span>
            <span>{t("tags.label")}</span>
            <span className="text-muted-foreground/60">=</span>
            <span className="text-muted-foreground/60">[</span>
          </div>
          <div className="flex flex-wrap gap-2">
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

        {/* Posts List */}
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
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
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
