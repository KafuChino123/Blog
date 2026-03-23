"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  type Language,
  type TranslationKey,
  getNextLanguage,
  translate,
} from "@/lib/i18n";

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

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (
    key: TranslationKey,
    values?: Record<string, string | number>,
  ) => string;
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
    const newLanguage = getNextLanguage(language);
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (
    key: TranslationKey,
    values?: Record<string, string | number>,
  ) => {
    return translate(language, key, values);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>
        <LanguageContext.Provider
          value={{
            language: "zh",
            toggleLanguage: () => {},
            t: (key, values) => translate("zh", key, values),
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
