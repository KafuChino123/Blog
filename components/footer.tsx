"use client";

import { useLanguage } from "@/components/providers";
import { getRunningDays, SITE_NAME } from "@/lib/site";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const runningDays = getRunningDays();

  return (
    <footer className="border-t border-divider mt-16 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span>
          {t("footer.copyright", { siteName: SITE_NAME, year: currentYear })}
        </span>
        <span className="text-muted-foreground/60">
          // {t("footer.built", { days: runningDays })}
        </span>
      </div>
    </footer>
  );
}
