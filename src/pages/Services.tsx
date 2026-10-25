import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Home, Utensils, Activity, Stethoscope, Users, Clock } from "lucide-react";
import { sitePhotos } from "@/data/site-photos";

const services = [
  {
    icon: Home,
    title: "Personal Care",
    description: "Assistance with daily activities including bathing, dressing, grooming, and mobility support.",
    features: ["Bathing and hygiene assistance", "Dressing and grooming support", "Mobility assistance", "Personal safety monitoring"],
  },
  {
    icon: Stethoscope,
    title: "Medication Management",
    description: "Professional medication administration and monitoring by trained staff.",
    features: ["Medication administration", "Prescription management", "Health monitoring", "Doctor coordination"],
  },
  {
    icon: Utensils,
    title: "Nutritious Meals",
    description: "Three home-cooked meals daily plus snacks, accommodating dietary restrictions and preferences.",
    features: ["Three daily meals", "Healthy snacks", "Dietary accommodations", "Special diet planning"],
  },
  {
    icon: Activity,
    title: "Activities & Social",
    description: "Engaging activities, outings, and social programs to maintain mental and physical wellness.",
    features: ["Group activities", "Social events", "Outings and trips", "Cognitive stimulation"],
  },
  {
    icon: Users,
    title: "Family Support",
    description: "Regular communication and support for families throughout the care journey.",
    features: ["Regular updates", "Family meetings", "Care plan discussions", "24/7 communication"],
  },
  {
    icon: Clock,
    title: "24/7 Care",
    description: "Round-the-clock supervision and care in a safe, comfortable environment.",
    features: ["24-hour supervision", "Emergency response", "Night-time care", "Safety monitoring"],
  },
];

const roomTypes = [
  {
    title: "Private Room",
    description:
      "Spacious private room with private bathroom, cable TV, and personalized décor options.",
    features: ["Private bathroom", "Cable TV & WiFi", "Personal furniture welcome", "24/7 emergency call system"],
  },
  {
    title: "Shared Room",
    description:
      "Comfortable shared accommodation with compatible roommate matching and privacy options.",
    features: ["Shared bathroom", "Cable TV & WiFi", "Privacy curtains", "Personal storage space"],
  },
  {
    title: "Memory Care",
    description:
      "Specialized rooms designed for residents with memory care needs and enhanced safety features.",
    features: ["Enhanced safety features", "Memory care activities", "Specialized staff training", "Family communication tools"],
  },
];

const pricingDetails = [
  {
    title: "Insurance & Benefits",
    items: [
      "Medicaid accepted",
      "Veterans benefits",
      "Long-term care insurance",
      "Private pay options",
      "Financial assistance available",
    ],
  },
  {
    title: "What's Included",
    items: [
      "All meals and snacks",
      "Personal care services",
      "Activities and outings",
      "Laundry and housekeeping",
      "24/7 supervision",
    ],
  },
];

const Services = () => {
  return (
    <div className="editorial-page min-h-screen bg-background">
      <Navigation />

      <PageHero
        title="Our Care Services"
        description="Comprehensive, personalized care services designed around your loved one's unique needs"
        image={sitePhotos.services}
      >
        <Button asChild variant="trust" size="lg">
          <Link to="/contact#contact-form">Schedule a Tour</Link>
        </Button>
      </PageHero>

      <main>
        <section className="py-16 md:py-24" aria-labelledby="care-services-heading">
          <div className="container mx-auto px-4">
            <h2 id="care-services-heading" className="sr-only">Care services</h2>
            <div className="service-grid">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} ctaText="Discuss care" />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-soft-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Room Types &amp; Accommodations
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Comfortable, private accommodations designed for safety and comfort
              </p>
            </div>
            <div className="border-t border-border">
              {roomTypes.map((room) => (
                <article
                  key={room.title}
                  className="grid gap-6 border-b border-border py-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12"
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">{room.title}</h3>
                  <div>
                    <p className="mb-5 text-lg leading-relaxed text-muted-foreground">{room.description}</p>
                    <ul className="grid gap-3 text-muted-foreground sm:grid-cols-2">
                      {room.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warm-accent" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
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
                Pricing &amp; Insurance
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Transparent pricing with various payment options to make quality care accessible
              </p>
            </div>
            <div className="grid gap-10 border-t border-border md:grid-cols-2 md:gap-12">
              {pricingDetails.map((detail) => (
                <article key={detail.title} className="border-b border-border py-8 md:border-b-0">
                  <h3 className="mb-5 text-2xl font-semibold tracking-tight text-foreground">{detail.title}</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {detail.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warm-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="mt-10">
              <Button asChild variant="trust" size="lg">
                <Link to="/contact#contact-form">Request Pricing Information</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
