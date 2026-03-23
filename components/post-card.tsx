import Link from 'next/link'
import { Post, formatDate } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative">
      <Link 
        href={`/post/${post.slug}`} 
        className="block py-4 px-4 -mx-4 rounded-md transition-colors hover:bg-secondary/50"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          {/* Date */}
          <time 
            dateTime={post.date} 
            className="text-xs font-mono text-muted-foreground shrink-0 tabular-nums"
          >
            {formatDate(post.date)}
          </time>
          
          {/* Content */}
          <div className="flex-1 min-w-0 space-y-1">
            <h2 className="text-foreground font-medium group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground/70">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="lowercase">#{tag}</span>
              ))}
              <span className="ml-auto">{post.readingTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
