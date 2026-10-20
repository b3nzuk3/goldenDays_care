import React, { useRef, useState } from 'react'
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
import { ZoomIn, Home, Users, Coffee, Bath, Trees } from 'lucide-react'
import { galleryPhotos, type GalleryPhoto } from '@/data/gallery'

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)
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
      id: 'bathrooms',
      name: 'Bathrooms',
      icon: <Bath className="h-4 w-4" />,
    },
    { id: 'outdoors', name: 'Outdoors', icon: <Trees className="h-4 w-4" /> },
  ]

  const filteredPhotos =
    activeCategory === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((photo) => photo.category === activeCategory)

  return (
    <div className="editorial-page min-h-screen bg-background">
      <Navigation />

      <PageHero
        title="Photo Gallery"
        description="Step inside Golden Days. Explore the bedrooms, shared spaces, meals, and outdoor corners that make up our home."
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
                  <span className="text-xs opacity-75">{category.id === 'all' ? galleryPhotos.length : galleryPhotos.filter((photo) => photo.category === category.id).length}</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <p className="mb-6 text-sm text-muted-foreground" role="status" aria-live="polite">{filteredPhotos.length} photos · Select a photo for a closer look.</p>
            {filteredPhotos.length === 0 ? (
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
                      key={photo.id}
                      type="button"
                      onClick={(event) => { photoTrigger.current = event.currentTarget; setSelectedPhoto(photo) }}
                      aria-label={`View ${photo.title}`}
                      className="group w-full overflow-hidden rounded-2xl border border-border bg-background text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span className="relative block aspect-square overflow-hidden bg-muted">
                        <img
                          src={photo.thumbnailUrl}
                          width={photo.width}
                          height={photo.height}
                          loading="lazy"
                          decoding="async"
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
          <DialogContent className="max-h-[90dvh] max-w-4xl overflow-y-auto p-0 sm:rounded-2xl" onCloseAutoFocus={(event) => { event.preventDefault(); photoTrigger.current?.focus() }}>
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
