export const SITE_NAME = "blog.r7y";
export const SITE_START_DATE = new Date("2024-02-20");

export function getRunningDays(): number {
  const now = new Date();
  return Math.floor(
    (now.getTime() - SITE_START_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );
}
