"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Theme Context
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Language Context
type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Translations
const translations: Record<Language, Record<string, string>> = {
  zh: {
    "hero.comment": "关于 Web 开发的笔记",
    "hero.title": "关于 Web 开发、设计系统\n与前沿技术的深度思考",
    "hero.subtitle": "构建高质量产品的实践笔记",
    "posts.label": "posts",
    "footer.copyright": "dev.log © 2025",
    "footer.built": "使用 next.js 构建",
  },
  en: {
    "hero.comment": "notes on building for the web",
    "hero.title": "Thoughts on web development,\ndesign systems & modern tech",
    "hero.subtitle": "Notes on building quality products",
    "posts.label": "posts",
    "footer.copyright": "dev.log © 2025",
    "footer.built": "Powered by next.js",
  },
};

// Combined Provider
export function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    // Load saved language
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleLanguage = () => {
    const newLanguage = language === "zh" ? "en" : "zh";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>
        <LanguageContext.Provider value={{ language: "zh", toggleLanguage: () => {}, t: (key) => translations.zh[key] || key }}>{children}</LanguageContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
