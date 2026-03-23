'use client'

import Link from 'next/link'
import { useTheme, useLanguage } from '@/components/providers'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()

  return (
    <header className="border-b border-divider sticky top-0 bg-background/95 backdrop-blur-sm z-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
            <span className="text-accent font-mono text-sm">$</span>
            <span className="font-mono text-sm font-medium text-foreground">dev.log</span>
            <span className="w-2 h-4 bg-accent/80 animate-pulse" />
          </div>
        </Link>
        
        <div className="flex items-center gap-1">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-2 py-1.5 rounded-md text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle language"
          >
            {language === 'zh' ? 'EN' : '中'}
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
