import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'
import ServiceCard from '@/components/ServiceCard'
import StaffCard from '@/components/StaffCard'
import ContactForm from '@/components/ContactForm'
import {
  Heart,
  Shield,
  Users,
  Home,
  Stethoscope,
  Clock,
  Phone,
  MapPin,
  Star,
  Award,
  CheckCircle,
} from 'lucide-react'
import heroImage from '@/assets/hero-care-home.jpg'
import careTeamImage from '@/assets/care-team.jpg'
import privateRoomImage from '@/assets/private-room.jpg'

const Index = () => {
  const services = [
    {
      icon: Heart,
      title: 'Personal Care',
      description:
        'Compassionate assistance with daily living activities in a warm, home-like environment.',
      features: [
        'Assistance with bathing, dressing, and grooming',
        'Medication management and monitoring',
        'Mobility support and fall prevention',
        'Nutritious meal preparation and dining assistance',
      ],
    },
    {
      icon: Stethoscope,
      title: 'Medical Care',
      description:
        "Professional healthcare services coordinated with your loved one's medical team.",
      features: [
        '24/7 licensed nursing supervision',
        'Coordination with physicians and specialists',
        'Health monitoring and vital signs tracking',
        'Management of chronic conditions',
      ],
    },
    {
      icon: Users,
      title: 'Social Activities',
      description:
        'Engaging programs that promote social interaction and mental stimulation.',
      features: [
        'Group activities and entertainment',
        'Individual hobby support',
        'Family visit coordination',
        'Community outings and events',
      ],
    },
  ]

  const features = [
    { icon: Shield, text: 'Licensed & Insured' },
    { icon: Award, text: 'State Certified' },
    { icon: Clock, text: '24/7 Care' },
    { icon: Home, text: 'Home-like Environment' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Comfortable living room at Golden Days Adult Family Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Compassionate Care in a
            <span className="text-warm-accent"> Home-like Setting</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Golden Days Adult Family Home provides personalized, dignified care
            for your loved ones in a warm, family environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="warm" size="lg" className="text-lg px-8 py-3">
              Schedule a Tour
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
            >
              Call (913) 271-4783
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-warm-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-warm-accent" />
                </div>
                <p className="font-medium text-foreground">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Care Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive care tailored to each resident's unique
              needs, ensuring comfort, dignity, and peace of mind for families.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Golden Days AFH?
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-warm-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Small, intimate setting
                    </strong>{' '}
                    with only 6 residents for personalized attention
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-warm-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Licensed professionals
                    </strong>{' '}
                    with over 15 years of eldercare experience
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-warm-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Family-centered approach
                    </strong>{' '}
                    with open communication and regular updates
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-warm-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Beautiful home environment
                    </strong>{' '}
                    with private rooms and comfortable common areas
                  </p>
                </div>
              </div>
              <Button variant="trust" size="lg">
                Learn More About Us
              </Button>
            </div>
            <div className="relative">
              <img
                src={careTeamImage}
                alt="Our caring professional team at Golden Days Adult Family Home"
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Families Are Saying
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-warning fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-muted-foreground mb-6 italic">
                  "Golden Days AFH gave our family peace of mind during a
                  difficult time. The staff treats every resident like family,
                  and Mom has never been happier. We couldn't have asked for
                  better care."
                </blockquote>
                <footer className="text-foreground font-medium">
                  — Sarah M., Daughter of Resident
                </footer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-warm-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Learn More?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a personal tour to see our home and meet our caring team.
            We're here to answer all your questions and help you make the best
            decision for your loved one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-warm-accent"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call (913) 271-4783
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-warm-accent"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Visit Us Today
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Contact Form */}
      <section className="py-20 bg-soft-gray">
        <div className="container mx-auto px-4">
          <ContactForm
            title="Get Started Today"
            subtitle="Reach out to learn more about our compassionate care services and schedule your visit."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Golden Days AFH</h3>
              <p className="text-white/80">
                Providing compassionate, dignified care in a home-like
                environment since 2015.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/admissions"
                    className="hover:text-white transition-colors"
                  >
                    Admissions
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-white/80">
                <li>(913) 271-4783 / (509) 818-7552</li>
                <li>goldendaysafh@gmail.com</li>
                <li>4224 E Prairie Ln Court</li>
                <li>Spokane, WA 99223</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Licensed & Certified</h4>
              <p className="text-white/80 text-sm">
                Washington State Licensed Adult Family Home • License #123456 •
                Medicaid & Private Pay Accepted
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>
              &copy; 2024 Golden Days Adult Family Home. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
