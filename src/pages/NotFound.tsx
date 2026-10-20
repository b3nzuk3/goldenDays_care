import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main id="page-content" tabIndex={-1} className="container py-24 md:py-32">
      <p className="mb-5 text-warm-accent">404 — Page not found</p>
      <h1 className="mb-6 max-w-xl">Let’s get you back home.</h1>
      <p className="mb-8 max-w-xl text-muted-foreground">We couldn’t find this page. You can return to our home page or contact us if you need a hand.</p>
      <div className="flex flex-wrap gap-4"><Button variant="warm" size="lg" asChild><a href="/"><ArrowLeft aria-hidden="true" /> Return to Home</a></Button><Button variant="outline" size="lg" asChild><a href="/contact">Contact us</a></Button></div>
    </main>
  </div>
)

export default NotFound
