"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Site name
export const SITE_NAME = "blog.r7y";

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

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Site start date for running days calculation
const SITE_START_DATE = new Date("2024-02-20");

function getRunningDays(): number {
  const now = new Date();
  return Math.floor(
    (now.getTime() - SITE_START_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );
}

// Translations
function getTranslations(): Record<Language, Record<string, string>> {
  const days = getRunningDays();
  return {
    zh: {
      "hero.comment": "notes on everything",
      "hero.title": "Raspberry 的博客",
      "hero.subtitle": "things i build, learn, and think about",
      "tags.label": "tags",
      "posts.label": "posts",
      "footer.copyright": `${SITE_NAME} © ${new Date().getFullYear()}`,
      "footer.built": `已运行 ${days} 天`,
    },
    en: {
      "hero.comment": "notes on everything",
      "hero.title": "Raspberry's Blog",
      "hero.subtitle": "things i build, learn, and think about",
      "tags.label": "tags",
      "posts.label": "posts",
      "footer.copyright": `${SITE_NAME} © ${new Date().getFullYear()}`,
      "footer.built": `Already running ${days} days`,
    },
  };
}

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
    return getTranslations()[language][key] || key;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>
        <LanguageContext.Provider
          value={{
            language: "zh",
            toggleLanguage: () => {},
            t: (key) => getTranslations().zh[key] || key,
          }}
        >
          {children}
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
