import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  title: ReactNode
  description?: ReactNode
  image?: { src: string; alt: string; width?: number; height?: number }
  children?: ReactNode
  className?: string
}

const PageHero = ({ title, description, image, children, className }: PageHeroProps) => (
  <header id="page-content" tabIndex={-1} className={cn('page-hero', className)}>
    <div className={cn('container page-hero-layout', !image && 'page-hero-text-only')}>
      <div className="page-hero-copy">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children && <div className="flex flex-wrap items-center gap-4">{children}</div>}
      </div>
      {image && <img className="page-hero-image" src={image.src} alt={image.alt} width={image.width ?? 800} height={image.height ?? 600} fetchPriority="high" />}
    </div>
  </header>
)

export default PageHero
