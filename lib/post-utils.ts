import { getLocale, type Language } from "@/lib/i18n";

export function getPostUrl(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}`;
}

export function formatDate(
  dateStr: string,
  language: Language = "zh",
): { year: string; monthDay: string } {
  const date = new Date(dateStr);
  const locale = getLocale(language);
  const year = date.toLocaleDateString(locale, { year: "numeric" });
  const monthDay = date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
  });

  return { year, monthDay };
}
