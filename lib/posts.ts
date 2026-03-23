export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: string;
  publish: boolean;
  content: string;
}

export const posts: Post[] = [
  {
    id: "0",
    slug: "markdown-demo",
    title: "Markdown 富文本渲染演示",
    date: "2025-03-20",
    tags: ["Markdown", "Demo"],
    excerpt: "一篇全面展示 Markdown 富文本渲染效果的演示文章，涵盖标题、列表、代码块、表格、引用等常见元素。",
    readingTime: "3 分钟",
    publish: true,
    content: `
## 标题层级

文章正文使用舒适的字号与行高。下面展示各级标题的排版效果。

### 三级标题

#### 四级标题

---

## 行内样式

这是一段包含 **加粗文本**、*斜体文本*、以及 ***粗斜体*** 的段落。你也可以使用 ~~删除线~~ 来标记废弃内容。行内代码用反引号包裹，例如 \`const x = 42\` 或 \`Array.prototype.map()\`。

链接示例：访问 [Next.js 官方文档](https://nextjs.org) 了解更多。

---

## 引用

> 设计不是看起来怎样或感觉怎样，设计是它如何工作的。
>
> — Steve Jobs

嵌套引用：

> 外层引用的内容。
>
> > 内层嵌套引用，用于补充说明或对话场景。

---

## 列表

### 无序列表

- 第一个列表项
- 第二个列表项，内容更长一些，用来展示换行后的对齐效果
- 嵌套列表：
  - 子项 A
  - 子项 B
    - 更深层嵌套
- 最后一项

### 有序列表

1. 克隆仓库
2. 安装依赖
3. 启动开发服务器
4. 在浏览器中打开 \`http://localhost:3000\`

### 任务列表

- [x] 项目初始化
- [x] 配置 Tailwind CSS
- [ ] 实现 MDX 渲染
- [ ] 添加代码高亮
- [ ] 部署上线

---

## 代码块

行内代码：\`pnpm add react-markdown\`

JavaScript 示例：

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// 使用示例
const result = fibonacci(10)
console.log(\`第 10 项斐波那契数为 \${result}\`) // 55
\`\`\`

TypeScript + React 示例：

\`\`\`tsx
interface Props {
  title: string
  tags: string[]
  onSelect?: (tag: string) => void
}

export function PostHeader({ title, tags, onSelect }: Props) {
  return (
    <header className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <button key={tag} onClick={() => onSelect?.(tag)}>
            #{tag}
          </button>
        ))}
      </div>
    </header>
  )
}
\`\`\`

CSS 示例：

\`\`\`css
.prose-blog blockquote {
  border-left: 3px solid var(--accent);
  padding: 0.75rem 1.25rem;
  margin: 1.5rem 0;
  background: color-mix(in oklch, var(--accent) 5%, var(--background));
}
\`\`\`

Shell 命令：

\`\`\`bash
# 创建新的 Next.js 项目
pnpm create next-app@latest my-blog --typescript --tailwind --app
cd my-blog && pnpm dev
\`\`\`

无语言标记的代码块：

\`\`\`
这是一个没有指定语言的代码块
适合用来展示纯文本输出或配置文件
\`\`\`

---

## 表格

| 特性 | React | Vue | Svelte |
|------|:------|:---:|------:|
| 虚拟 DOM | ✅ 是 | ✅ 是 | ❌ 否 |
| 响应式 | 手动 | 自动 | 自动 |
| Bundle 体积 | ~42KB | ~33KB | ~1.6KB |
| 学习曲线 | 中等 | 较低 | 最低 |
| 生态系统 | 最丰富 | 丰富 | 成长中 |

---

## 图片

图片会自适应宽度并添加圆角：

![Placeholder](https://placehold.co/800x400/1a1a2e/e2e8f0?text=Blog+Cover+Image)

---

## 综合排版

以下是一个更接近真实博客文章的段落，用于检验整体阅读节奏：

在现代前端开发中，**组件化**已成为不可逆转的趋势。从 React 的 JSX、Vue 的 SFC 到 Svelte 的编译时方案，每个框架都在用自己的方式诠释「组件」的含义。但无论技术如何演进，核心目标始终不变：*让开发者能够以声明式的方式构建可维护的用户界面*。

一个好的组件应该满足以下条件：

1. **职责单一** — 只做一件事，并把它做好
2. **接口清晰** — Props 设计直观，无需阅读源码即可使用
3. **样式隔离** — 不会意外影响外部元素
4. **易于测试** — 可以独立于其他组件进行单元测试

> 好的抽象是发现出来的，不是发明出来的。先写三遍重复代码，再提取公共组件。

最后，别忘了在 \`README.md\` 中为你的组件库写上清晰的使用文档 — 因为三个月后的你，就是你组件的第一个「新用户」。
`,
  },
  {
    id: "1",
    slug: "react-server-components",
    title: "深入理解 React Server Components",
    date: "2025-03-15",
    tags: ["React", "Next.js", "性能"],
    excerpt: "React Server Components 彻底改变了我们构建 Web 应用的方式。本文深入探讨其工作原理、与客户端组件的边界划分，以及在实际项目中的最佳实践。",
    readingTime: "8 分钟",
    publish: true,
    content: `
## 什么是 React Server Components？

React Server Components（RSC）是 React 架构中的一次重大变革。它允许组件**在服务器端渲染**，并将结果以特殊的流式格式发送到客户端。

与传统 SSR 不同的是，Server Components **不会将 JavaScript 发送到客户端**，这意味着更小的 bundle 体积和更快的页面加载。

## 核心概念

### 服务端组件 vs 客户端组件

在 Next.js App Router 中，所有组件默认为 Server Components。如果你需要交互性（如 \`useState\`、\`useEffect\`、事件处理），则需要在文件顶部添加 \`'use client'\` 指令。

\`\`\`tsx
// 这是一个 Server Component（默认）
async function PostList() {
  const posts = await db.query('SELECT * FROM posts')
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
\`\`\`

\`\`\`tsx
'use client'

// 这是一个 Client Component
import { useState } from 'react'

function LikeButton() {
  const [likes, setLikes] = useState(0)
  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  )
}
\`\`\`

### 组件边界划分原则

> **经验法则**：尽可能将 \`'use client'\` 指令下推到组件树的叶子节点，只在真正需要交互的地方使用客户端组件。

以下表格总结了两种组件的适用场景：

| 场景 | Server Component | Client Component |
|------|:---:|:---:|
| 数据获取 | ✅ | ❌ |
| 访问后端资源 | ✅ | ❌ |
| 使用 useState/useEffect | ❌ | ✅ |
| 事件监听器 | ❌ | ✅ |
| 浏览器 API | ❌ | ✅ |

## 性能优势

1. **零 JavaScript 开销** — Server Components 的代码不会包含在客户端 bundle 中
2. **直接访问数据源** — 无需额外的 API 层
3. **自动代码分割** — 每个客户端组件自动成为一个分割点
4. **流式渲染** — 内容可以逐步发送到客户端

## 最佳实践

- 将数据获取逻辑放在 Server Components 中
- 使用 \`Suspense\` 包裹异步操作，提供优雅的加载体验
- 避免在 Server Components 中传递不可序列化的 props（如函数）
- 利用 \`cache()\` 函数去重复请求

\`\`\`tsx
import { Suspense } from 'react'
import { PostList } from './post-list'
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogPage() {
  return (
    <main>
      <h1>最新文章</h1>
      <Suspense fallback={<Skeleton className="h-64" />}>
        <PostList />
      </Suspense>
    </main>
  )
}
\`\`\`

Server Components 代表了 React 框架的未来方向，理解并掌握这一模式对于构建高性能的现代 Web 应用至关重要。
`,
  },
  {
    id: "2",
    slug: "tailwind-css-design-system",
    title: "用 Tailwind CSS 构建可扩展的设计系统",
    date: "2025-02-28",
    tags: ["CSS", "设计系统", "Tailwind"],
    excerpt: "从零开始构建一套设计系统，涵盖 Design Token、组件变体管理与团队协作规范。探索如何让设计与开发无缝对齐。",
    readingTime: "6 分钟",
    publish: true,
    content: `
## 为什么选择 Tailwind CSS？

在设计系统领域，Tailwind CSS 提供了一种独特的方法论：**用约束代替自由**。通过预定义的工具类，团队可以在保持灵活性的同时确保视觉一致性。

## Design Token 的定义

Design Token 是设计系统的原子单位。在 Tailwind CSS v4 中，我们可以用 CSS 变量优雅地定义它们：

\`\`\`css
@theme {
  --color-brand: oklch(0.65 0.18 210);
  --color-brand-light: oklch(0.80 0.12 210);
  --color-brand-dark: oklch(0.45 0.18 210);

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
\`\`\`

## 组件变体管理

使用 \`class-variance-authority\`（CVA）来管理组件变体是目前社区的最佳实践：

\`\`\`tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)
\`\`\`

### 关键设计原则

1. **Token 优先** — 所有颜色、间距、圆角都来自 Token
2. **变体明确** — 每个组件变体都有清晰的命名和用途
3. **可组合性** — 组件可以自由组合，不产生样式冲突
4. **文档驱动** — 每个 Token 和组件都有对应文档

> 好的设计系统不是限制创造力，而是让团队把精力集中在真正重要的设计决策上。

## 团队协作规范

- 使用 **Storybook** 展示所有组件状态
- 定期进行 **Design Review** 同步设计与开发
- 维护 **Changelog**，追踪设计系统的每次变更
- 使用 **Figma Token Plugin** 保持设计文件与代码同步
`,
  },
  {
    id: "3",
    slug: "typescript-advanced-patterns",
    title: "TypeScript 高级类型体操：从入门到精通",
    date: "2025-02-10",
    tags: ["TypeScript", "类型系统"],
    excerpt: "深入解析条件类型、映射类型与模板字面量类型，通过实际案例理解如何利用 TypeScript 的类型系统构建更健壮的代码。",
    readingTime: "12 分钟",
    publish: true,
    content: `
## 类型系统是最好的文档

TypeScript 的类型系统远不止是 \`string\` 和 \`number\`。掌握高级类型技巧，可以让你的代码**自文档化**、**自验证**。

## 条件类型

条件类型让我们可以根据类型关系进行类型推导：

\`\`\`typescript
type IsString<T> = T extends string ? true : false

type A = IsString<'hello'>  // true
type B = IsString<42>       // false
\`\`\`

### 实际应用：API 响应类型

\`\`\`typescript
type ApiResponse<T> = T extends 'user'
  ? { id: string; name: string; email: string }
  : T extends 'post'
  ? { id: string; title: string; content: string }
  : never

// 类型安全的 API 调用
async function fetchApi<T extends 'user' | 'post'>(
  endpoint: T
): Promise<ApiResponse<T>> {
  const res = await fetch(\`/api/\${endpoint}\`)
  return res.json()
}

const user = await fetchApi('user')
// ^? { id: string; name: string; email: string }
\`\`\`

## 映射类型

映射类型可以基于已有类型创建新类型：

\`\`\`typescript
// 将所有属性变为可选
type Partial<T> = {
  [K in keyof T]?: T[K]
}

// 将所有属性变为只读
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

// 自定义：提取所有函数类型的属性
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]
\`\`\`

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型是一个强大的武器：

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`

type ClickEvent = EventName<'click'>   // 'onClick'
type FocusEvent = EventName<'focus'>   // 'onFocus'

// 构建类型安全的 CSS 工具
type Spacing = 1 | 2 | 4 | 8 | 16
type Direction = 't' | 'r' | 'b' | 'l'
type SpacingClass = \`p\${Direction}-\${Spacing}\`
// 'pt-1' | 'pt-2' | ... | 'pl-16'
\`\`\`

## 实用技巧总结

- 使用 \`infer\` 提取嵌套类型信息
- 用 \`never\` 实现类型过滤
- 递归类型处理深层嵌套结构
- \`satisfies\` 运算符保留字面量类型的同时进行类型检查

> 记住：类型体操的目标不是炫技，而是让编译器帮你发现更多 bug。
`,
  },
  {
    id: "4",
    slug: "vercel-edge-runtime",
    title: "Edge Runtime 与无服务器函数的性能对比",
    date: "2025-01-22",
    tags: ["Vercel", "性能", "Edge"],
    excerpt: "Edge Runtime 在全球节点运行代码，显著降低延迟。本文通过基准测试数据，详细对比 Edge 函数与 Node.js 无服务器函数的适用场景。",
    readingTime: "7 分钟",
    publish: true,
    content: `
## Edge Runtime 简介

Edge Runtime 让你的代码运行在离用户最近的边缘节点上，冷启动时间几乎为零。这对于需要**低延迟响应**的场景来说是一个革命性的改进。

## 基准测试对比

我们在全球 5 个区域进行了基准测试：

| 指标 | Edge Runtime | Node.js Serverless |
|------|:---:|:---:|
| 冷启动时间 | ~5ms | ~250ms |
| P50 延迟 | 12ms | 45ms |
| P99 延迟 | 35ms | 320ms |
| 最大执行时间 | 30s | 300s |
| 最大包体积 | 4MB | 250MB |

## 使用方式

\`\`\`typescript
// Edge Runtime API Route
export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') ?? 'World'

  return new Response(
    JSON.stringify({ message: \`Hello, \${name}!\` }),
    { headers: { 'Content-Type': 'application/json' } }
  )
}
\`\`\`

## 适用场景

**推荐使用 Edge Runtime：**
- A/B 测试和特性标志
- 身份验证和授权检查
- 地理位置定向
- 简单的 API 代理

**推荐使用 Node.js Serverless：**
- 复杂的数据处理
- 需要 Node.js 特定 API（如 \`fs\`、\`crypto\`）
- 长时间运行的任务
- 大量内存消耗的操作

> 选择运行时不是非此即彼的问题，关键是根据具体场景做出最优选择。
`,
  },
  {
    id: "5",
    slug: "zustand-state-management",
    title: "Zustand：轻量级状态管理的哲学",
    date: "2025-01-05",
    tags: ["React", "状态管理", "Zustand"],
    excerpt: "为什么越来越多的开发者抛弃 Redux 转向 Zustand？本文通过实际对比，探讨 Zustand 简洁 API 背后的设计哲学与最佳使用模式。",
    readingTime: "5 分钟",
    publish: true,
    content: `
## 为什么不是 Redux？

Redux 很强大，但它的仪式感太重了。一个简单的计数器需要 action types、action creators、reducers、store 配置……Zustand 的哲学是：**状态管理不应该比业务逻辑更复杂**。

## 极简的 API

\`\`\`typescript
import { create } from 'zustand'

interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

const useCounter = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
\`\`\`

就这么简单。没有 Provider 包裹，没有 boilerplate，直接在组件中使用：

\`\`\`tsx
function Counter() {
  const { count, increment, decrement } = useCounter()

  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
\`\`\`

## 高级模式

### 持久化中间件

\`\`\`typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useSettings = create(
  persist(
    (set) => ({
      theme: 'light',
      language: 'zh',
      setTheme: (theme: string) => set({ theme }),
      setLanguage: (lang: string) => set({ language: lang }),
    }),
    { name: 'app-settings' }
  )
)
\`\`\`

### 选择性订阅（性能优化）

\`\`\`tsx
// 只在 count 变化时重新渲染
const count = useCounter((state) => state.count)
\`\`\`

## Zustand vs Redux vs Jotai

| 特性 | Zustand | Redux Toolkit | Jotai |
|------|:---:|:---:|:---:|
| Bundle 大小 | ~1KB | ~11KB | ~3KB |
| 学习曲线 | 低 | 中 | 低 |
| Provider 必需 | ❌ | ✅ | ✅ |
| DevTools | ✅ | ✅ | ✅ |
| 中间件 | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ |

> 最好的状态管理方案是你**不需要思考**的方案。
`,
  },
  {
    id: "6",
    slug: "web-animation-principles",
    title: "Web 动画的 12 条黄金法则",
    date: "2024-12-18",
    tags: ["动画", "UX", "CSS"],
    excerpt: "优雅的动画能提升用户体验，笨拙的动画却适得其反。借鉴迪士尼动画的 12 条原则，探讨如何在 Web 中打造自然流畅的交互动效。",
    readingTime: "9 分钟",
    publish: false,
    content: `
## 动画不是装饰

好的动画是**功能性的**，它们帮助用户理解界面的变化、建立空间关系、提供操作反馈。

## 核心原则

### 1. 缓动（Easing）

永远不要使用线性动画。自然界中没有匀速运动的物体。

\`\`\`css
/* ❌ 不自然 */
.box { transition: transform 300ms linear; }

/* ✅ 自然的减速效果 */
.box { transition: transform 300ms ease-out; }

/* ✅ 自定义贝塞尔曲线 */
.box { transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1); }
\`\`\`

### 2. 持续时间（Duration）

- **微交互**（按钮、开关）：100–200ms
- **页面过渡**：200–400ms
- **复杂动画**：400–700ms

超过 1 秒的动画会让用户感到等待。

### 3. 编排（Choreography）

多个元素同时出现时，使用**交错动画**营造节奏感：

\`\`\`css
.item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 400ms ease-out forwards;
}

.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 60ms; }
.item:nth-child(3) { animation-delay: 120ms; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
\`\`\`

### 4. 性能优先

只动画化 \`transform\` 和 \`opacity\`，它们可以被 GPU 加速：

\`\`\`css
/* ❌ 触发布局重排 */
.box { transition: width 300ms, height 300ms; }

/* ✅ GPU 加速 */
.box { transition: transform 300ms; }
\`\`\`

## 实用的 CSS 动画片段

\`\`\`css
/* 弹性缩放 */
@keyframes pop {
  0% { transform: scale(0.8); opacity: 0; }
  40% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

/* 淡入上移 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
\`\`\`

## 可访问性考虑

始终尊重用户的动画偏好设置：

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

> 最好的动画是用户**注意不到**的动画 — 它自然到融入了界面本身。
`,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPublishedPosts(): Post[] {
  return posts.filter((post) => post.publish);
}

export function formatDate(dateStr: string, language: "zh" | "en" = "zh"): { year: string; monthDay: string } {
  const date = new Date(dateStr);
  const locale = language === "zh" ? "zh-CN" : "en-US";
  const year = date.toLocaleDateString(locale, { year: "numeric" });
  const monthDay = date.toLocaleDateString(locale, { month: "long", day: "numeric" });
  return { year, monthDay };
}

export const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
