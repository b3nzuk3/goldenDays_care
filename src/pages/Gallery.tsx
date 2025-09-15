import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, Home, Users, Coffee, Gamepad2 } from "lucide-react";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Photos", icon: <ZoomIn className="h-4 w-4" /> },
    { id: "rooms", name: "Rooms", icon: <Home className="h-4 w-4" /> },
    { id: "common", name: "Common Areas", icon: <Users className="h-4 w-4" /> },
    { id: "dining", name: "Dining", icon: <Coffee className="h-4 w-4" /> },
    { id: "activities", name: "Activities", icon: <Gamepad2 className="h-4 w-4" /> }
  ];

  const photos = [
    {
      id: 1,
      src: "/src/assets/private-room.jpg",
      alt: "Comfortable private room with natural lighting",
      category: "rooms",
      title: "Private Room",
      description: "Spacious private room with comfortable furnishing and natural light"
    },
    {
      id: 2,
      src: "/placeholder.svg",
      alt: "Warm and inviting living room with comfortable seating",
      category: "common",
      title: "Main Living Room",
      description: "Comfortable common area where residents gather for activities and socializing"
    },
    {
      id: 3,
      src: "/placeholder.svg",
      alt: "Beautiful dining room set for mealtime",
      category: "dining",
      title: "Dining Room",
      description: "Elegant dining space where residents enjoy home-cooked meals together"
    },
    {
      id: 4,
      src: "/src/assets/care-team.jpg",
      alt: "Residents enjoying group activities with staff",
      category: "activities",
      title: "Group Activities",
      description: "Engaging activities and social programs for residents"
    },
    {
      id: 5,
      src: "/placeholder.svg",
      alt: "Cozy shared room with twin beds",
      category: "rooms",
      title: "Shared Room",
      description: "Comfortable shared accommodation with privacy options"
    },
    {
      id: 6,
      src: "/placeholder.svg",
      alt: "Bright sunroom with plants and comfortable chairs",
      category: "common",
      title: "Sunroom",
      description: "Peaceful sunroom perfect for reading and relaxation"
    },
    {
      id: 7,
      src: "/placeholder.svg",
      alt: "Modern kitchen where fresh meals are prepared",
      category: "dining",
      title: "Kitchen",
      description: "Professional kitchen where our chefs prepare nutritious, home-style meals"
    },
    {
      id: 8,
      src: "/placeholder.svg",
      alt: "Outdoor garden area with seating",
      category: "activities",
      title: "Garden Area",
      description: "Beautiful outdoor space for fresh air and nature activities"
    },
    {
      id: 9,
      src: "/placeholder.svg",
      alt: "Accessible bathroom with safety features",
      category: "rooms",
      title: "Accessible Bathroom",
      description: "Safe and accessible bathroom with assistive features"
    },
    {
      id: 10,
      src: "/placeholder.svg",
      alt: "Therapy room with exercise equipment",
      category: "activities",
      title: "Therapy Room",
      description: "Dedicated space for physical therapy and rehabilitation"
    },
    {
      id: 11,
      src: "/placeholder.svg",
      alt: "Library and quiet reading area",
      category: "common",
      title: "Library Corner",
      description: "Quiet space for reading and peaceful reflection"
    },
    {
      id: 12,
      src: "/placeholder.svg",
      alt: "Game room with puzzles and board games",
      category: "activities",
      title: "Game Room",
      description: "Fun activities room with games, puzzles, and entertainment"
    }
  ];

  const filteredPhotos = activeCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

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
              Take a virtual tour of our beautiful facility and see why families choose Golden Days AFH
            </p>
            <Button variant="trust" size="lg">Schedule an In-Person Tour</Button>
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
                variant={activeCategory === category.id ? "trust" : "outline"}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <Card 
                key={photo.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                onClick={() => setSelectedPhoto(photo)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        {categories.find(cat => cat.id === photo.category)?.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{photo.title}</h3>
                    <p className="text-sm text-muted-foreground">{photo.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Visit?</h2>
            <p className="text-muted-foreground mb-8">
              While photos show our beautiful facility, nothing replaces an in-person visit. 
              Schedule a tour to meet our staff, see our amenities, and experience the warm atmosphere firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="trust" size="lg">Schedule a Tour</Button>
              <Button variant="outline" size="lg">Download Brochure</Button>
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
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
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
              <h3 className="text-xl font-semibold text-foreground mb-2">{selectedPhoto.title}</h3>
              <p className="text-muted-foreground">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;