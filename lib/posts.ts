export interface Post {
  id: string
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readingTime: string
}

export const posts: Post[] = [
  {
    id: "1",
    slug: "react-server-components",
    title: "深入理解 React Server Components",
    date: "2025-03-15",
    tags: ["React", "Next.js", "性能"],
    excerpt:
      "React Server Components 彻底改变了我们构建 Web 应用的方式。本文深入探讨其工作原理、与客户端组件的边界划分，以及在实际项目中的最佳实践。",
    readingTime: "8 分钟",
  },
  {
    id: "2",
    slug: "tailwind-css-design-system",
    title: "用 Tailwind CSS 构建可扩展的设计系统",
    date: "2025-02-28",
    tags: ["CSS", "设计系统", "Tailwind"],
    excerpt:
      "从零开始构建一套设计系统，涵盖 Design Token、组件变体管理与团队协作规范。探索如何让设计与开发无缝对齐。",
    readingTime: "6 分钟",
  },
  {
    id: "3",
    slug: "typescript-advanced-patterns",
    title: "TypeScript 高级类型体操：从入门到精通",
    date: "2025-02-10",
    tags: ["TypeScript", "类型系统"],
    excerpt:
      "深入解析条件类型、映射类型与模板字面量类型，通过实际案例理解如何利用 TypeScript 的类型系统构建更健壮的代码。",
    readingTime: "12 分钟",
  },
  {
    id: "4",
    slug: "vercel-edge-runtime",
    title: "Edge Runtime 与无服务器函数的性能对比",
    date: "2025-01-22",
    tags: ["Vercel", "性能", "Edge"],
    excerpt:
      "Edge Runtime 在全球节点运行代码，显著降低延迟。本文通过基准测试数据，详细对比 Edge 函数与 Node.js 无服务器函数的适用场景。",
    readingTime: "7 分钟",
  },
  {
    id: "5",
    slug: "zustand-state-management",
    title: "Zustand：轻量级状态管理的哲学",
    date: "2025-01-05",
    tags: ["React", "状态管理", "Zustand"],
    excerpt:
      "为什么越来越多的开发者抛弃 Redux 转向 Zustand？本文通过实际对比，探讨 Zustand 简洁 API 背后的设计哲学与最佳使用模式。",
    readingTime: "5 分钟",
  },
  {
    id: "6",
    slug: "web-animation-principles",
    title: "Web 动画的 12 条黄金法则",
    date: "2024-12-18",
    tags: ["动画", "UX", "CSS"],
    excerpt:
      "优雅的动画能提升用户体验，笨拙的动画却适得其反。借鉴迪士尼动画的 12 条原则，探讨如何在 Web 中打造自然流畅的交互动效。",
    readingTime: "9 分钟",
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))
