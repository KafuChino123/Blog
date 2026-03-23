"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";
import { List, X } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Tag } from "@/components/tag";
import { useLanguage } from "@/components/providers";
import { formatDate, getPostUrl } from "@/lib/post-utils";
import type { Post, PostSummary } from "@/lib/post-types";

interface BlogPostViewProps {
  post: Post;
  relatedPosts: PostSummary[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[2].replace(/[`*_~\[\]]/g, "");
    const id = text
      .normalize("NFKC")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\p{Letter}\p{Number}-]+/gu, "")
      .replace(/-+/g, "-");

    items.push({ id, text, level: match[1].length });
  }

  return items;
}

function removeLeadingTitle(markdown: string): string {
  return markdown.replace(/^\s*#\s+.+\s*$/m, "").trimStart();
}

function slugify(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "")
    .replace(/-+/g, "-");
}

function CodeBlock({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const language = className?.replace("language-", "") ?? "";
  const html = highlight(children.trimEnd());

  return (
    <div className="code-block">
      {language && <div className="code-lang">{language}</div>}
      <pre>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

function TableOfContents({
  items,
  onItemClick,
}: {
  items: TocItem[];
  onItemClick?: () => void;
}) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={onItemClick}
          className="block text-sm text-muted-foreground hover:text-foreground transition-colors leading-relaxed"
          style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}

export function BlogPostView({ post, relatedPosts }: BlogPostViewProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const { language, t } = useLanguage();
  const content = useMemo(() => removeLeadingTitle(post.content), [post.content]);
  const toc = useMemo(() => extractToc(content), [content]);
  const formattedDate = formatDate(post.date, language);

  const headingRenderer = (level: number) => {
    const Heading = `h${level}` as "h2" | "h3" | "h4";

    return ({ children }: { children?: ReactNode }) => {
      const text = String(children).replace(/[`*_~\[\]]/g, "");
      const id = slugify(text);
      return <Heading id={id}>{children}</Heading>;
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:flex lg:gap-10">
        {toc.length > 0 && (
          <aside className="hidden lg:block lg:w-56 shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                {t("blog.toc")}
              </p>
              <TableOfContents items={toc} />
            </div>
          </aside>
        )}

        <article className="min-w-0 max-w-3xl w-full">
          <header className="mb-12 space-y-6 border-b border-divider pb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-accent hover:text-foreground transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <span className="ml-2">{t("blog.backToList")}</span>
            </Link>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight text-balance">
                {post.title}
              </h1>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <time dateTime={post.date}>
                  {formattedDate.year} {formattedDate.monthDay}
                </time>
              </div>
            </div>
          </header>

          <div className="prose-blog">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: headingRenderer(2),
                h3: headingRenderer(3),
                h4: headingRenderer(4),
                code({ children, className, ...props }) {
                  const value = String(children);
                  const isBlock = Boolean(className) || value.includes("\n");

                  if (!isBlock) {
                    return (
                      <code className="inline-code" {...props}>
                        {children}
                      </code>
                    );
                  }

                  return (
                    <CodeBlock className={className}>
                      {value}
                    </CodeBlock>
                  );
                },
                a({ children, href, ...props }) {
                  return (
                    <a
                      href={href}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {relatedPosts.length > 0 && (
            <section className="border-t border-divider pt-12 mt-12 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {t("blog.related")}
              </h2>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={getPostUrl(relatedPost.slug)}
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
      </div>

      {toc.length > 0 && (
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          aria-label={t("blog.tocToggleAria")}
        >
          {tocOpen ? <X size={18} /> : <List size={18} />}
        </button>
      )}

      {toc.length > 0 && tocOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setTocOpen(false)}
          />
          <div className="lg:hidden fixed bottom-20 right-6 z-50 w-64 max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-background p-4 shadow-xl">
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
              {t("blog.toc")}
            </p>
            <TableOfContents
              items={toc}
              onItemClick={() => setTocOpen(false)}
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
