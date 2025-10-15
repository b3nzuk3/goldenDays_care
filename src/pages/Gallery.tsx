import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/photos')
      const data = await response.json()
      if (data.success) {
        setPhotos(data.data.filter((photo: Photo) => photo.isActive))
      } else {
        setError('Failed to load photos')
      }
    } catch (err) {
      setError('Failed to load photos')
      console.error('Error fetching photos:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredPhotos =
    activeCategory === 'all'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory)

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-soft-gray to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Take a virtual tour of our beautiful facility and see why families
              choose Golden Days AFH
            </p>
            <Button variant="trust" size="lg">
              Schedule an In-Person Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'trust' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              <span className="ml-2 text-muted-foreground">
                Loading photos...
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchPhotos} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                No photos available in this category.
              </p>
              <p className="text-sm text-muted-foreground">
                Photos will appear here once they are uploaded through the admin
                dashboard.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <Card
                  key={photo._id}
                  className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-foreground"
                        >
                          {
                            categories.find((cat) => cat.id === photo.category)
                              ?.name
                          }
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {photo.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Visit?
            </h2>
            <p className="text-muted-foreground mb-8">
              While photos show our beautiful facility, nothing replaces an
              in-person visit. Schedule a tour to meet our staff, see our
              amenities, and experience the warm atmosphere firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="trust" size="lg">
                Schedule a Tour
              </Button>
              <Button variant="outline" size="lg">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-muted-foreground">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
