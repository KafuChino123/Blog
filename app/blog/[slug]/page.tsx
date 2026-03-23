"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";
import { List, X } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Tag } from "@/components/tag";
import { getPostBySlug, formatDate, posts } from "@/lib/posts";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[2].replace(/[`*_~\[\]]/g, "");
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fff-]/g, "");
    items.push({ id, text, level: match[1].length });
  }
  return items;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]/g, "");
}

function CodeBlock({ children, className }: { children: string; className?: string }) {
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

function TableOfContents({ items, onItemClick }: { items: TocItem[]; onItemClick?: () => void }) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} onClick={onItemClick} className="block text-sm text-muted-foreground hover:text-foreground transition-colors leading-relaxed" style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}>
          {item.text}
        </a>
      ))}
    </nav>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);
  const [tocOpen, setTocOpen] = useState(false);

  const toc = useMemo(() => (post ? extractToc(post.content) : []), [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">文章未找到</h1>
            <p className="text-muted-foreground">抱歉，您访问的文章不存在。</p>
            <Link href="/" className="inline-block px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity">
              返回首页
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const relatedPosts = posts.filter((p) => p.id !== post.id && p.publish && p.tags.some((tag) => post.tags.includes(tag))).slice(0, 3);

  const headingRenderer = (level: number) => {
    const Heading = `h${level}` as "h2" | "h3" | "h4";
    return ({ children }: { children?: React.ReactNode }) => {
      const text = String(children).replace(/[`*_~\[\]]/g, "");
      const id = slugify(text);
      return <Heading id={id}>{children}</Heading>;
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:flex lg:gap-10">
        {/* Desktop TOC — sticky left sidebar */}
        {toc.length > 0 && (
          <aside className="hidden lg:block lg:w-56 shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">目录</p>
              <TableOfContents items={toc} />
            </div>
          </aside>
        )}

        {/* Main content */}
        <article className="min-w-0 max-w-3xl w-full">
          {/* Article Header */}
          <header className="mb-12 space-y-6 border-b border-divider pb-8">
            <Link href="/" className="inline-flex items-center text-sm text-accent hover:text-foreground transition-colors group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="ml-2">返回文章列表</span>
            </Link>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight text-balance">{post.title}</h1>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              <time dateTime={post.date} className="text-sm text-muted-foreground pt-2 block">
                {formatDate(post.date)}
              </time>
            </div>
          </header>

          {/* MDX Content */}
          <div className="prose-blog">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: headingRenderer(2),
                h3: headingRenderer(3),
                h4: headingRenderer(4),
                code({ children, className, ...props }) {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="inline-code" {...props}>
                        {children}
                      </code>
                    );
                  }
                  return <CodeBlock className={className}>{String(children)}</CodeBlock>;
                },
                a({ children, href, ...props }) {
                  return (
                    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined} {...props}>
                      {children}
                    </a>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="border-t border-divider pt-12 mt-12 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">相关文章</h2>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                    <div className="border border-border rounded-md p-4 group-hover:bg-post-hover group-hover:border-accent transition-all duration-300">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-1">{relatedPost.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>

      {/* Mobile TOC toggle button */}
      {toc.length > 0 && (
        <button onClick={() => setTocOpen(!tocOpen)} className="lg:hidden fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity" aria-label="切换目录">
          {tocOpen ? <X size={18} /> : <List size={18} />}
        </button>
      )}

      {/* Mobile TOC overlay */}
      {toc.length > 0 && tocOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setTocOpen(false)} />
          <div className="lg:hidden fixed bottom-20 right-6 z-50 w-64 max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-background p-4 shadow-xl">
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">目录</p>
            <TableOfContents items={toc} onItemClick={() => setTocOpen(false)} />
          </div>
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
