import React from 'react'
import Navigation from '@/components/Navigation'
import PageHero from '@/components/PageHero'
import ContactForm from '@/components/ContactForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Calendar,
} from 'lucide-react'

const Contact = () => {
  return (
    <div className="editorial-page min-h-screen bg-background">
      <Navigation />

      <PageHero
        title="Contact Us"
        description="We're here to answer your questions and help you find the best care solution for your loved one"
      />

      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div className="space-y-10">
                <div className="max-w-xl">
                  <h2 className="mb-5 text-3xl font-bold text-foreground md:text-4xl">
                    Get in Touch
                  </h2>
                  <p className="text-base leading-7 text-muted-foreground md:text-lg">
                    Ready to learn more about Golden Days AFH? We're available
                    24/7 to answer your questions and discuss how we can provide
                    the best care for your loved one.
                  </p>
                </div>

                <ul className="divide-y divide-border border-y border-border">
                  <li className="flex items-start gap-4 py-5">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-accent/10 text-warm-accent">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <div className="mt-1 space-y-1 text-base text-muted-foreground">
                        <a
                          href="tel:9132714783"
                          className="block underline-offset-4 transition-colors hover:text-warm-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          Primary: (913) 271-4783
                        </a>
                        <a
                          href="tel:5098187552"
                          className="block underline-offset-4 transition-colors hover:text-warm-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          Secondary: (509) 818-7552
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 py-5">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-accent/10 text-warm-accent">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a
                        href="mailto:goldendaysafh@gmail.com"
                        className="mt-1 block text-base text-muted-foreground underline-offset-4 transition-colors hover:text-warm-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        goldendaysafh@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 py-5">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-accent/10 text-warm-accent">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">Address</h3>
                      <address className="mt-1 text-base not-italic leading-6 text-muted-foreground">
                        4224 E Prairie Ln Court
                        <br />
                        Spokane, WA 99223
                      </address>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 py-5">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-accent/10 text-warm-accent">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">Hours</h3>
                      <div className="mt-1 space-y-1 text-base leading-6 text-muted-foreground">
                        <p>Office: Monday - Friday, 9 AM - 6 PM</p>
                        <p>Care: 24/7 Support Available</p>
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="warm" className="sm:flex-1">
                    <a href="#contact-form">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      Schedule a tour
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="sm:flex-1"
                    disabled
                    aria-disabled="true"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Live chat unavailable
                  </Button>
                </div>
              </div>

              <div className="lg:pt-2">
                <ContactForm title="Send Us a Message" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-soft-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Visit Our Location
              </h2>
              <p className="text-base leading-7 text-muted-foreground md:text-lg">
                Located in the heart of Peaceful Valley, our facility is easily
                accessible and close to medical facilities, shopping, and parks
              </p>
            </div>

            <div className="flex min-h-64 flex-col items-start justify-between gap-8 rounded-lg border border-border bg-background p-6 sm:flex-row sm:flex-wrap sm:items-center md:p-10">
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-foreground">
                  Our location
                </h3>
                <p className="text-base leading-7 text-muted-foreground">
                  4224 E Prairie Ln Court, Spokane, WA 99223
                </p>
              </div>
              <MapPin
                className="hidden h-16 w-16 shrink-0 text-warm-accent/70 sm:block"
                aria-hidden="true"
              />
              <Button asChild variant="trust" className="shrink-0">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=4224%20E%20Prairie%20Ln%20Court%2C%20Spokane%2C%20WA%2099223"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-trust-blue py-16 text-white md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              24/7 Emergency Support
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 opacity-90 md:text-lg">
              For urgent matters or emergencies involving current residents, our
              staff is available around the clock
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="secondary" size="lg">
                <a href="tel:9132714783">Call (913) 271-4783</a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="tel:5098187552">Call (509) 818-7552</a>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="border-white bg-transparent text-white hover:bg-white hover:text-trust-blue"
                disabled
                aria-disabled="true"
              >
                Family portal unavailable
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Common Questions
              </h2>
              <p className="text-base leading-7 text-muted-foreground md:text-lg">
                Looking for quick answers? Check out our most frequently asked
                questions
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold text-foreground">
                    What's included in the cost?
                  </h3>
                  <p className="text-base leading-6 text-muted-foreground">
                    Learn about our comprehensive care packages and what's
                    included
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold text-foreground">
                    How do I schedule a tour?
                  </h3>
                  <p className="text-base leading-6 text-muted-foreground">
                    Easy steps to visit our facility and meet our team
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold text-foreground">
                    What should I bring?
                  </h3>
                  <p className="text-base leading-6 text-muted-foreground">
                    Packing checklist for moving in to Golden Days AFH
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <Button type="button" variant="trust" disabled aria-disabled="true">
                FAQs unavailable
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Contact
