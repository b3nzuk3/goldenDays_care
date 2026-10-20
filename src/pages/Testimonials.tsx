import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";
import { sitePhotos } from "@/data/site-photos";

const testimonials = [
  {
    name: "Jennifer Martinez",
    relation: "Daughter",
    content: "Golden Days AFH has been a blessing for our family. Mom has been there for two years now, and the care she receives is exceptional. The staff treats her like their own family member, and she's made wonderful friends. I can sleep peacefully knowing she's in such good hands.",
    rating: 5,
    location: "Bellevue, WA",
  },
  {
    name: "Robert Chen",
    relation: "Son",
    content: "After searching for months, we found Golden Days AFH and knew immediately it was the right place for Dad. The facility is beautiful, the staff is incredibly caring, and they've helped Dad maintain his independence while getting the support he needs. Highly recommend!",
    rating: 5,
    location: "Seattle, WA",
  },
  {
    name: "Mary Johnson",
    relation: "Wife",
    content: "My husband moved to Golden Days AFH last year after his stroke. The rehabilitation support and daily care have been outstanding. He's regained so much of his strength and confidence. The activities keep him engaged, and I love how they include families in everything.",
    rating: 5,
    location: "Redmond, WA",
  },
  {
    name: "Patricia Williams",
    relation: "Daughter",
    content: "I was so worried about finding the right place for Mom, especially with her dementia. Golden Days AFH has specialized memory care, and the staff is trained to work with residents who have cognitive challenges. Mom is happy, safe, and well-cared for.",
    rating: 5,
    location: "Kirkland, WA",
  },
  {
    name: "Thomas Davis",
    relation: "Son",
    content: "The transition to Golden Days AFH was seamless. The admissions team helped us with everything, and the staff made Dad feel welcome from day one. It's been six months now, and he tells me he's never been happier. That means everything to our family.",
    rating: 5,
    location: "Issaquah, WA",
  },
  {
    name: "Linda Rodriguez",
    relation: "Daughter",
    content: "What sets Golden Days AFH apart is how they truly care about the whole person. They remember Mom's preferences, celebrate her birthday, and even accommodate her dietary restrictions perfectly. It feels like she's living with extended family rather than in a care facility.",
    rating: 5,
    location: "Bothell, WA",
  },
];

const videoTestimonials = [
  {
    title: "The Martinez Family Story",
    description: "Jennifer shares her experience with Golden Days AFH",
  },
  {
    title: "A Son's Perspective",
    description: "Robert talks about finding the right care for his father",
  },
  {
    title: "Recovery and Independence",
    description: "Mary discusses her husband's rehabilitation journey",
  },
];

const renderStars = (rating: number) => {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="editorial-page min-h-screen bg-background">
      <Navigation />

      <PageHero
        title="What Families Say"
        description="Real stories from families who trust Golden Days AFH with their loved ones' care"
        image={sitePhotos.testimonials}
      >
        <div className="flex flex-wrap items-center gap-2" aria-label="4.9 out of 5 stars (127 reviews)">
          <div className="flex gap-1" aria-hidden="true">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-2xl font-bold text-foreground">4.9</span>
          <span className="text-muted-foreground">out of 5 stars (127 reviews)</span>
        </div>
        <Button asChild variant="trust" size="lg">
          <Link to="/contact#contact-form">Share Your Experience</Link>
        </Button>
      </PageHero>

      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Family Testimonials
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Hear directly from families about their experience with our care team
              </p>
            </div>
            <div className="border-t border-border">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="grid gap-6 border-b border-border py-8 md:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)] md:gap-12"
                >
                  <div>
                    <Quote className="mb-4 h-7 w-7 text-warm-accent" aria-hidden="true" />
                    <div className="space-y-2">
                      {renderStars(testimonial.rating)}
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.relation}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <blockquote className="text-lg leading-relaxed text-muted-foreground">
                    &quot;{testimonial.content}&quot;
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-soft-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Video Stories
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Watch families share their personal experiences with Golden Days AFH
              </p>
            </div>
            <div className="border-t border-border">
              {videoTestimonials.map((video) => (
                <article
                  key={video.title}
                  className="grid gap-6 border-b border-border py-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:items-center md:gap-12"
                >
                  <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-background px-6 text-center">
                    <Button variant="outline" disabled>Video unavailable</Button>
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">{video.title}</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">{video.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Our Track Record
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Numbers that reflect our commitment to exceptional care
              </p>
            </div>
            <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
              <div className="border-b border-border py-7 sm:px-6 sm:first:pl-0 lg:border-r">
                <div className="text-4xl font-semibold text-warm-accent">98%</div>
                <p className="mt-2 text-muted-foreground">Family Satisfaction Rate</p>
              </div>
              <div className="border-b border-border py-7 sm:px-6 lg:border-r">
                <div className="text-4xl font-semibold text-warm-accent">10+</div>
                <p className="mt-2 text-muted-foreground">Years of Service</p>
              </div>
              <div className="border-b border-border py-7 sm:px-6 lg:border-r">
                <div className="text-4xl font-semibold text-warm-accent">200+</div>
                <p className="mt-2 text-muted-foreground">Families Served</p>
              </div>
              <div className="border-b border-border py-7 sm:px-6 sm:last:pr-0">
                <div className="text-4xl font-semibold text-warm-accent">24/7</div>
                <p className="mt-2 text-muted-foreground">Care &amp; Support</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Experience the Golden Days Difference
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-primary-foreground/85">
                Join the many families who have found peace of mind with our compassionate care
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/contact#contact-form">Schedule a Tour</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/contact#contact-form">Contact Us Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Testimonials;
