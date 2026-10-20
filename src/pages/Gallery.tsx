import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navigation from '@/components/Navigation'
import PageHero from '@/components/PageHero'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ZoomIn, Home, Users, Coffee, Gamepad2, Loader2 } from 'lucide-react'

interface Photo {
  _id: string
  title: string
  description: string
  imageUrl: string
  category: string
  isActive: boolean
  createdAt: string
}

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const photoTrigger = useRef<HTMLButtonElement | null>(null)

  const categories = [
    { id: 'all', name: 'All Photos', icon: <ZoomIn className="h-4 w-4" /> },
    { id: 'rooms', name: 'Rooms', icon: <Home className="h-4 w-4" /> },
    {
      id: 'common-areas',
      name: 'Common Areas',
      icon: <Users className="h-4 w-4" />,
    },
    { id: 'dining', name: 'Dining', icon: <Coffee className="h-4 w-4" /> },
    {
      id: 'activities',
      name: 'Activities',
      icon: <Gamepad2 className="h-4 w-4" />,
    },
  ]

  const fetchPhotos = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError('')
    setSelectedPhoto(null)

    try {
      const baseUrl =
        import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${baseUrl}/photos`, { signal })

      if (!response.ok) {
        throw new Error(`Photo request failed with status ${response.status}`)
      }

      const data = await response.json()

      if (!data.success || !Array.isArray(data.data)) {
        throw new Error('Photo response did not match the expected format')
      }

      setPhotos(data.data.filter((photo: Photo) => photo.isActive))
    } catch (fetchError) {
      if (signal?.aborted) return

      setError("We couldn't load the gallery right now. Please try again.")
      console.error('Error fetching photos:', fetchError)
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void fetchPhotos(controller.signal)

    return () => controller.abort()
  }, [fetchPhotos])

  const filteredPhotos =
    activeCategory === 'all'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory)

  return (
    <div className="editorial-page min-h-screen bg-background">
      <Navigation />

      <PageHero
        title="Photo Gallery"
        description="Take a virtual tour of our beautiful facility and see why families choose Golden Days AFH"
      >
        <Button asChild variant="trust" size="lg">
          <a href="/contact#contact-form">Schedule an in-person tour</a>
        </Button>
      </PageHero>

      <main>
      <Dialog
        open={Boolean(selectedPhoto)}
        onOpenChange={(open) => {
          if (!open) setSelectedPhoto(null)
        }}
      >
        <section className="border-b border-border py-6 md:py-8">
          <div className="container mx-auto px-4">
            <div
              className="flex flex-wrap gap-3"
              role="group"
              aria-label="Filter gallery by category"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  type="button"
                  variant={
                    activeCategory === category.id ? 'trust' : 'outline'
                  }
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {loading ? (
              <div
                className="flex items-center justify-center py-16 text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                <Loader2
                  className="h-6 w-6 animate-spin text-warm-accent"
                  aria-hidden="true"
                />
                <span className="ml-3 text-base">Loading photos...</span>
              </div>
            ) : error ? (
              <div className="py-16 text-center" role="alert">
                <p className="mb-5 text-base text-muted-foreground">{error}</p>
                <Button
                  type="button"
                  onClick={() => void fetchPhotos()}
                  variant="outline"
                >
                  Try again
                </Button>
              </div>
            ) : filteredPhotos.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-base text-muted-foreground">
                  No photos are available in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPhotos.map((photo) => {
                  const categoryName =
                    categories.find((category) => category.id === photo.category)
                      ?.name || photo.category

                  return (
                    <button
                      key={photo._id}
                      type="button"
                      onClick={(event) => { photoTrigger.current = event.currentTarget; setSelectedPhoto(photo) }}
                      aria-label={`View ${photo.title}`}
                      className="group w-full overflow-hidden rounded-2xl border border-border bg-background text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span className="relative block aspect-square overflow-hidden bg-muted">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                          <ZoomIn
                            className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Open photo</span>
                        </span>
                        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                          {categoryName}
                        </span>
                      </span>
                      <span className="block p-5">
                        <span className="block font-semibold text-foreground">
                          {photo.title}
                        </span>
                        <span className="mt-2 block text-base leading-6 text-muted-foreground">
                          {photo.description}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section className="bg-soft-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Ready to Visit?
              </h2>
              <p className="mb-8 text-base leading-7 text-muted-foreground md:text-lg">
                While photos show our beautiful facility, nothing replaces an
                in-person visit. Schedule a tour to meet our staff, see our
                amenities, and experience the warm atmosphere firsthand.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="trust" size="lg">
                  <a href="/contact#contact-form">Schedule a tour</a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled
                  aria-disabled="true"
                >
                  Brochure unavailable
                </Button>
              </div>
            </div>
          </div>
        </section>

        {selectedPhoto && (
          <DialogContent className="max-w-4xl overflow-hidden p-0 sm:rounded-2xl" onCloseAutoFocus={(event) => { event.preventDefault(); photoTrigger.current?.focus() }}>
            <div className="bg-background">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-full object-contain"
              />
              <div className="p-6 pr-14">
                <DialogHeader className="space-y-2 text-left">
                  <DialogTitle>{selectedPhoto.title}</DialogTitle>
                  <DialogDescription>
                    {selectedPhoto.description}
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
      </main>
    </div>
  )
}

export default Gallery
