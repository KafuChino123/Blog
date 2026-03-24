import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Post, PostSummary } from "@/lib/post-types";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

interface PostFileData extends Post {
  timestamp: number;
}

interface PostMeta {
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

function listPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(POSTS_DIRECTORY, entry.name, "index.mdx")),
    )
    .map((entry) => entry.name.normalize("NFKC"))
    .sort((a, b) => a.localeCompare(b));
}

function postDir(slug: string): string {
  return path.join(POSTS_DIRECTORY, slug);
}

function normalizeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).normalize("NFKC");
  } catch {
    return slug.normalize("NFKC");
  }
}

function getTimestamp(stats: fs.Stats): number {
  return stats.birthtimeMs > 0 ? stats.birthtimeMs : stats.mtimeMs;
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\|/g, " ")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(markdown: string, fallbackSlug: string): string {
  const match = markdown.match(/^\s*#\s+(.+?)\s*$/m);

  if (!match) {
    return fallbackSlug;
  }

  const title = stripMarkdown(match[1]);
  return title || fallbackSlug;
}

function extractExcerpt(markdown: string): string {
  const withoutCodeBlocks = markdown
    .replace(/\r\n/g, "\n")
    .replace(/```[\s\S]*?```/g, "\n\n")
    .replace(/~~~[\s\S]*?~~~/g, "\n\n");

  const blocks = withoutCodeBlocks
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  for (const block of blocks) {
    if (/^#{1,6}\s/.test(block)) continue;
    if (/^(import|export)\s/.test(block)) continue;
    if (/^(>|[-*+]\s|\d+\.\s)/.test(block)) continue;
    if (/^</.test(block)) continue;

    const text = stripMarkdown(block);
    if (text) return text;
  }

  return "";
}

function normalizeTags(tags: unknown, filePath: string): string[] {
  if (tags === undefined) return [];

  if (!Array.isArray(tags)) {
    throw new Error(
      `Invalid tags in ${filePath}: expected an array of strings.`,
    );
  }

  const uniqueTags = new Set<string>();

  for (const tag of tags) {
    if (typeof tag !== "string") {
      throw new Error(
        `Invalid tags in ${filePath}: expected an array of strings.`,
      );
    }

    const normalizedTag = tag.trim();
    if (normalizedTag) {
      uniqueTags.add(normalizedTag);
    }
  }

  return Array.from(uniqueTags);
}

function readPostMeta(slug: string): PostMeta {
  const metaPath = path.join(postDir(slug), "meta.json");

  if (!fs.existsSync(metaPath)) {
    return { tags: [] };
  }

  const fileContent = fs.readFileSync(metaPath, "utf8");
  const parsed = JSON.parse(fileContent) as {
    tags?: unknown;
    createdAt?: string;
    updatedAt?: string;
  };

  return {
    tags: normalizeTags(parsed.tags, metaPath),
    createdAt: parsed.createdAt,
    updatedAt: parsed.updatedAt,
  };
}

function readPostFile(slug: string): PostFileData {
  const dir = postDir(slug);
  const indexPath = path.join(dir, "index.mdx");
  const enPath = path.join(dir, "index.en.mdx");

  const content = fs.readFileSync(indexPath, "utf8");
  const meta = readPostMeta(slug);
  const stats = fs.statSync(indexPath);
  const contentEn = fs.existsSync(enPath)
    ? fs.readFileSync(enPath, "utf8")
    : undefined;

  const timestamp = meta.createdAt
    ? new Date(meta.createdAt).getTime()
    : getTimestamp(stats);
  const date = meta.createdAt || formatTimestamp(getTimestamp(stats));

  const title = extractTitle(content, slug);
  const excerpt = extractExcerpt(content) || title;
  const titleEn = contentEn ? extractTitle(contentEn, slug) : undefined;
  const excerptEn = contentEn
    ? extractExcerpt(contentEn) || titleEn
    : undefined;

  return {
    slug,
    title,
    excerpt,
    titleEn,
    excerptEn,
    date,
    tags: meta.tags,
    content,
    contentEn,
    hasTranslation: !!contentEn,
    timestamp,
  };
}

function toPostSummary(post: PostFileData): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    titleEn: post.titleEn,
    excerptEn: post.excerptEn,
    date: post.date,
    tags: post.tags,
    hasTranslation: post.hasTranslation,
  };
}

export function getAllPosts(): PostSummary[] {
  return listPostSlugs()
    .map((slug) => readPostFile(slug))
    .sort(
      (a, b) => b.timestamp - a.timestamp || a.slug.localeCompare(b.slug),
    )
    .map((post) => toPostSummary(post));
}

export function getAllTags(): string[] {
  return Array.from(
    new Set(getAllPosts().flatMap((post) => post.tags)),
  ).sort((a, b) => a.localeCompare(b));
}

export function getPostBySlug(slug: string): Post | null {
  const normalizedSlug = normalizeSlug(slug);
  const allSlugs = listPostSlugs();

  if (!allSlugs.includes(normalizedSlug)) {
    return null;
  }

  const { timestamp: _timestamp, ...post } = readPostFile(normalizedSlug);
  return post;
}
