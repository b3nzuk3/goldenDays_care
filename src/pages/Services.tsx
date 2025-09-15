import React from "react";
import Navigation from "@/components/Navigation";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Utensils, Activity, Stethoscope, Users, Clock } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Personal Care",
      description: "Assistance with daily activities including bathing, dressing, grooming, and mobility support.",
      features: ["Bathing and hygiene assistance", "Dressing and grooming support", "Mobility assistance", "Personal safety monitoring"]
    },
    {
      icon: Stethoscope,
      title: "Medication Management",
      description: "Professional medication administration and monitoring by trained staff.",
      features: ["Medication administration", "Prescription management", "Health monitoring", "Doctor coordination"]
    },
    {
      icon: Utensils,
      title: "Nutritious Meals",
      description: "Three home-cooked meals daily plus snacks, accommodating dietary restrictions and preferences.",
      features: ["Three daily meals", "Healthy snacks", "Dietary accommodations", "Special diet planning"]
    },
    {
      icon: Activity,
      title: "Activities & Social",
      description: "Engaging activities, outings, and social programs to maintain mental and physical wellness.",
      features: ["Group activities", "Social events", "Outings and trips", "Cognitive stimulation"]
    },
    {
      icon: Users,
      title: "Family Support",
      description: "Regular communication and support for families throughout the care journey.",
      features: ["Regular updates", "Family meetings", "Care plan discussions", "24/7 communication"]
    },
    {
      icon: Clock,
      title: "24/7 Care",
      description: "Round-the-clock supervision and care in a safe, comfortable environment.",
      features: ["24-hour supervision", "Emergency response", "Night-time care", "Safety monitoring"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-soft-gray to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Care Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive, personalized care services designed around your loved one's unique needs
            </p>
            <Button variant="trust" size="lg">Schedule a Tour</Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Room Types */}
      <section className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Room Types & Accommodations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comfortable, private accommodations designed for safety and comfort
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Private Room</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Spacious private room with private bathroom, cable TV, and personalized décor options.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Private bathroom</li>
                  <li>• Cable TV & WiFi</li>
                  <li>• Personal furniture welcome</li>
                  <li>• 24/7 emergency call system</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shared Room</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comfortable shared accommodation with compatible roommate matching and privacy options.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Shared bathroom</li>
                  <li>• Cable TV & WiFi</li>
                  <li>• Privacy curtains</li>
                  <li>• Personal storage space</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Memory Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Specialized rooms designed for residents with memory care needs and enhanced safety features.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Enhanced safety features</li>
                  <li>• Memory care activities</li>
                  <li>• Specialized staff training</li>
                  <li>• Family communication tools</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing & Insurance */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Pricing & Insurance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing with various payment options to make quality care accessible
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Insurance & Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Medicaid accepted</li>
                  <li>• Veterans benefits</li>
                  <li>• Long-term care insurance</li>
                  <li>• Private pay options</li>
                  <li>• Financial assistance available</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• All meals and snacks</li>
                  <li>• Personal care services</li>
                  <li>• Activities and outings</li>
                  <li>• Laundry and housekeeping</li>
                  <li>• 24/7 supervision</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button variant="trust" size="lg">Request Pricing Information</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;