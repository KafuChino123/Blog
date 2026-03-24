"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers";
import { formatDate, getPostUrl } from "@/lib/post-utils";
import type { PostSummary } from "@/lib/post-types";

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  const { language } = useLanguage();

  const title = language === "en" && post.titleEn ? post.titleEn : post.title;
  const excerpt = language === "en" && post.excerptEn ? post.excerptEn : post.excerpt;

  return (
    <article className="group relative">
      <Link
        href={getPostUrl(post.slug)}
        className="block py-4 px-4 -mx-4 rounded-md transition-colors hover:bg-secondary/50"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-2">
          <time
            dateTime={post.date}
            className="text-xs font-mono text-muted-foreground shrink-0 tabular-nums leading-tight sm:w-24"
          >
            <span className="inline sm:block">
              {formatDate(post.date, language).year}
            </span>
            <span className="inline sm:hidden"> </span>
            <span className="inline sm:block">
              {formatDate(post.date, language).monthDay}
            </span>
          </time>

          <div className="flex-1 min-w-0 space-y-1">
            <h2 className="text-foreground font-medium group-hover:text-accent transition-colors">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {excerpt}
            </p>
            {post.tags.length > 0 && (
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground/70">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="lowercase">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
