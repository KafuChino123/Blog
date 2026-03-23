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
}

function listPostFilenames(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name) === ".mdx")
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function getSlugFromFilename(filename: string): string {
  return path.basename(filename, ".mdx").normalize("NFKC");
}

function getPostPath(filename: string): string {
  return path.join(POSTS_DIRECTORY, filename);
}

function getPostMetaPath(filename: string): string {
  return path.join(
    POSTS_DIRECTORY,
    `${path.basename(filename, ".mdx")}.meta.json`,
  );
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
    if (/^#{1,6}\s/.test(block)) {
      continue;
    }

    if (/^(import|export)\s/.test(block)) {
      continue;
    }

    if (/^(>|[-*+]\s|\d+\.\s)/.test(block)) {
      continue;
    }

    if (/^</.test(block)) {
      continue;
    }

    const text = stripMarkdown(block);
    if (text) {
      return text;
    }
  }

  return "";
}

function normalizeTags(tags: unknown, filePath: string): string[] {
  if (tags === undefined) {
    return [];
  }

  if (!Array.isArray(tags)) {
    throw new Error(`Invalid tags in ${filePath}: expected an array of strings.`);
  }

  const uniqueTags = new Set<string>();

  for (const tag of tags) {
    if (typeof tag !== "string") {
      throw new Error(`Invalid tags in ${filePath}: expected an array of strings.`);
    }

    const normalizedTag = tag.trim();
    if (normalizedTag) {
      uniqueTags.add(normalizedTag);
    }
  }

  return Array.from(uniqueTags);
}

function readPostMeta(filename: string): PostMeta {
  const metaPath = getPostMetaPath(filename);

  if (!fs.existsSync(metaPath)) {
    return { tags: [] };
  }

  const fileContent = fs.readFileSync(metaPath, "utf8");
  const parsed = JSON.parse(fileContent) as { tags?: unknown };

  return {
    tags: normalizeTags(parsed.tags, metaPath),
  };
}

function readPostFile(filename: string): PostFileData {
  const filePath = getPostPath(filename);
  const content = fs.readFileSync(filePath, "utf8");
  const meta = readPostMeta(filename);
  const stats = fs.statSync(filePath);
  const slug = getSlugFromFilename(filename);
  const timestamp = getTimestamp(stats);
  const title = extractTitle(content, slug);
  const excerpt = extractExcerpt(content) || title;

  return {
    slug,
    title,
    excerpt,
    date: formatTimestamp(timestamp),
    tags: meta.tags,
    content,
    timestamp,
  };
}

function toPostSummary(post: PostFileData): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    tags: post.tags,
  };
}

export function getAllPosts(): PostSummary[] {
  return listPostFilenames()
    .map((filename) => readPostFile(filename))
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
  const filename = listPostFilenames().find(
    (entry) => getSlugFromFilename(entry) === normalizedSlug,
  );

  if (!filename) {
    return null;
  }

  const { timestamp: _timestamp, ...post } = readPostFile(filename);
  return post;
}
