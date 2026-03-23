"use client";

import { useLanguage } from "@/components/providers";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-divider mt-16 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span>{t("footer.copyright")}</span>
        <span className="text-muted-foreground/60">// {t("footer.built")}</span>
      </div>
    </footer>
  );
}
