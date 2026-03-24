export type Language = "zh" | "en";

type TranslationValues = Record<string, string | number>;

const translations = {
  zh: {
    "hero.comment": "notes on everything",
    "hero.title": "Raspberry 的博客",
    "hero.subtitle": "things I build, learn, and think about",
    "tags.label": "tags",
    "posts.label": "posts",
    "posts.empty": "暂无文章",
    "blog.toc": "目录",
    "blog.backToList": "返回文章列表",
    "blog.related": "相关文章",
    "blog.tocToggleAria": "切换目录",
    "blog.copyCode": "复制",
    "blog.codeCopied": "已复制",
    "header.toggleLanguage": "切换语言",
    "header.toggleTheme": "切换主题",
    "footer.copyright": "{siteName} © {year}",
    "footer.built": "已运行 {days} 天",
  },
  en: {
    "hero.comment": "notes on everything",
    "hero.title": "Raspberry's Blog",
    "hero.subtitle": "things I build, learn, and think about",
    "tags.label": "tags",
    "posts.label": "posts",
    "posts.empty": "No posts yet",
    "blog.toc": "Contents",
    "blog.backToList": "Back to posts",
    "blog.related": "Related posts",
    "blog.tocToggleAria": "Toggle table of contents",
    "blog.copyCode": "Copy",
    "blog.codeCopied": "Copied",
    "header.toggleLanguage": "Toggle language",
    "header.toggleTheme": "Toggle theme",
    "footer.copyright": "{siteName} © {year}",
    "footer.built": "Running for {days} days",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["zh"];

const LANGUAGE_LABELS: Record<Language, string> = {
  zh: "中",
  en: "EN",
};

const LANGUAGE_LOCALES: Record<Language, string> = {
  zh: "zh-CN",
  en: "en-US",
};

export function getLocale(language: Language): string {
  return LANGUAGE_LOCALES[language];
}

export function getNextLanguage(language: Language): Language {
  return language === "zh" ? "en" : "zh";
}

export function getLanguageToggleLabel(language: Language): string {
  return LANGUAGE_LABELS[getNextLanguage(language)];
}

export function translate(language: Language, key: TranslationKey, values: TranslationValues = {}): string {
  const template = translations[language][key] ?? translations.zh[key] ?? key;

  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = values[name];
    return value === undefined ? `{${name}}` : String(value);
  });
}
