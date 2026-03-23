'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { getPublishedPosts } from '@/lib/posts'
import { useLanguage } from '@/components/providers'

export default function Home() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="space-y-4 py-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="text-accent">{'//'}</span>
              <span>{t('hero.comment')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium text-foreground text-balance leading-tight whitespace-pre-line">
              {t('hero.title')}
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg font-mono">
              {'>'} {t('hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Posts List */}
        <section className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-6">
            <span className="text-accent">const</span>
            <span>{t('posts.label')}</span>
            <span className="text-muted-foreground/60">=</span>
            <span className="text-muted-foreground/60">[</span>
          </div>
          
          <div className="space-y-3">
            {getPublishedPosts().map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mt-6">
            <span className="text-muted-foreground/60">]</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
