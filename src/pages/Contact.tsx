import React from "react";
import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-soft-gray to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're here to answer your questions and help you find the best care solution for your loved one
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Ready to learn more about Golden Days AFH? We're available 24/7 to answer your questions 
                  and discuss how we can provide the best care for your loved one.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-warm-accent mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                        <p className="text-muted-foreground">Primary: (555) 123-4567</p>
                        <p className="text-muted-foreground">Emergency: (555) 123-4568</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-warm-accent mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <p className="text-muted-foreground">info@goldendaysafh.com</p>
                        <p className="text-muted-foreground">admissions@goldendaysafh.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-warm-accent mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Address</h3>
                        <p className="text-muted-foreground">123 Care Lane</p>
                        <p className="text-muted-foreground">Peaceful Valley, WA 98001</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-warm-accent mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                        <p className="text-muted-foreground">Office: Monday - Friday, 9 AM - 6 PM</p>
                        <p className="text-muted-foreground">Care: 24/7 Support Available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="trust" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Tour
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Live Chat
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Visit Our Location</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of Peaceful Valley, our facility is easily accessible and close to medical facilities, shopping, and parks
            </p>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-warm-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map</h3>
              <p className="text-muted-foreground">
                123 Care Lane, Peaceful Valley, WA 98001
              </p>
              <Button variant="trust" className="mt-4">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-br from-trust-blue to-trust-blue/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">24/7 Emergency Support</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            For urgent matters or emergencies involving current residents, our staff is available around the clock
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Emergency Line: (555) 123-4568
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-trust-blue">
              Family Portal Login
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Common Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Looking for quick answers? Check out our most frequently asked questions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">What's included in the cost?</h3>
                <p className="text-sm text-muted-foreground">Learn about our comprehensive care packages and what's included</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">How do I schedule a tour?</h3>
                <p className="text-sm text-muted-foreground">Easy steps to visit our facility and meet our team</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">What should I bring?</h3>
                <p className="text-sm text-muted-foreground">Packing checklist for moving in to Golden Days AFH</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button variant="trust">View All FAQs</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;