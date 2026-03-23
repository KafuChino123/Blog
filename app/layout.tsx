import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Dev.log — 开发者博客",
  description: "分享关于 Web 开发、设计系统与前沿技术的深度思考",
  generator: "v0.app",
  keywords: ["博客", "Next.js", "React", "前端开发", "TypeScript"],
  authors: [{ name: "Dev.log" }],
  openGraph: {
    title: "Dev.log — 开发者博客",
    description: "分享关于 Web 开发、设计系统与前沿技术的深度思考",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
