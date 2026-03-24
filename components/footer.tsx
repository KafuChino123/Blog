"use client";

import { useLanguage } from "@/components/providers";
import { getRunningDays, SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

interface FooterProps {
  avoidMobileFab?: boolean;
}

export function Footer({ avoidMobileFab = false }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const runningDays = getRunningDays();

  return (
    <footer
      className={cn(
        "border-t border-divider mt-16 pt-6 pb-6",
        avoidMobileFab &&
          "pb-[calc(env(safe-area-inset-bottom,0px)+5rem)] lg:pb-6",
      )}
    >
      <div
        className={cn(
          "max-w-3xl mx-auto flex items-center justify-between pl-4 pr-4 sm:pl-6 sm:pr-6 text-xs font-mono text-muted-foreground",
        )}
      >
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
