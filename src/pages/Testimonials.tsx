import React from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jennifer Martinez",
      relation: "Daughter",
      content: "Golden Days AFH has been a blessing for our family. Mom has been there for two years now, and the care she receives is exceptional. The staff treats her like their own family member, and she's made wonderful friends. I can sleep peacefully knowing she's in such good hands.",
      rating: 5,
      location: "Bellevue, WA"
    },
    {
      name: "Robert Chen",
      relation: "Son",
      content: "After searching for months, we found Golden Days AFH and knew immediately it was the right place for Dad. The facility is beautiful, the staff is incredibly caring, and they've helped Dad maintain his independence while getting the support he needs. Highly recommend!",
      rating: 5,
      location: "Seattle, WA"
    },
    {
      name: "Mary Johnson",
      relation: "Wife",
      content: "My husband moved to Golden Days AFH last year after his stroke. The rehabilitation support and daily care have been outstanding. He's regained so much of his strength and confidence. The activities keep him engaged, and I love how they include families in everything.",
      rating: 5,
      location: "Redmond, WA"
    },
    {
      name: "Patricia Williams",
      relation: "Daughter",
      content: "I was so worried about finding the right place for Mom, especially with her dementia. Golden Days AFH has specialized memory care, and the staff is trained to work with residents who have cognitive challenges. Mom is happy, safe, and well-cared for.",
      rating: 5,
      location: "Kirkland, WA"
    },
    {
      name: "Thomas Davis",
      relation: "Son",
      content: "The transition to Golden Days AFH was seamless. The admissions team helped us with everything, and the staff made Dad feel welcome from day one. It's been six months now, and he tells me he's never been happier. That means everything to our family.",
      rating: 5,
      location: "Issaquah, WA"
    },
    {
      name: "Linda Rodriguez",
      relation: "Daughter",
      content: "What sets Golden Days AFH apart is how they truly care about the whole person. They remember Mom's preferences, celebrate her birthday, and even accommodate her dietary restrictions perfectly. It feels like she's living with extended family rather than in a care facility.",
      rating: 5,
      location: "Bothell, WA"
    }
  ];

  const videoTestimonials = [
    {
      title: "The Martinez Family Story",
      description: "Jennifer shares her experience with Golden Days AFH",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "A Son's Perspective",
      description: "Robert talks about finding the right care for his father",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Recovery and Independence",
      description: "Mary discusses her husband's rehabilitation journey",
      thumbnail: "/placeholder.svg"
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-soft-gray to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Families Say
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real stories from families who trust Golden Days AFH with their loved ones' care
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">4.9</span>
              <span className="text-muted-foreground">out of 5 stars (127 reviews)</span>
            </div>
            <Button variant="trust" size="lg">Share Your Experience</Button>
          </div>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Family Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear directly from families about their experience with our care team
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <Quote className="h-8 w-8 text-warm-accent mb-4" />
                  <p className="text-muted-foreground mb-6 flex-grow">
                    "{testimonial.content}"
                  </p>
                  <div className="space-y-2">
                    {renderStars(testimonial.rating)}
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.relation}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Video Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch families share their personal experiences with Golden Days AFH
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Track Record</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that reflect our commitment to exceptional care
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-blue mb-2">98%</div>
              <p className="text-muted-foreground">Family Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-blue mb-2">10+</div>
              <p className="text-muted-foreground">Years of Service</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-blue mb-2">200+</div>
              <p className="text-muted-foreground">Families Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-blue mb-2">24/7</div>
              <p className="text-muted-foreground">Care & Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-trust-blue to-trust-blue/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Golden Days Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join the many families who have found peace of mind with our compassionate care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">Schedule a Tour</Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-trust-blue">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;