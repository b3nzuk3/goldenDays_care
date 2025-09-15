import React from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-soft-gray to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Golden Days AFH
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Providing compassionate, personalized care in a warm family setting since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                At Golden Days Adult Family Home, we believe every resident deserves to live with dignity, 
                comfort, and joy. Our mission is to provide exceptional personalized care that honors each 
                individual's unique needs while fostering a warm, family-like environment.
              </p>
              <p className="text-muted-foreground mb-8">
                We are committed to enhancing quality of life through compassionate care, meaningful 
                activities, and genuine relationships built on trust and respect.
              </p>
              <Button variant="trust">Learn About Our Services</Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Compassionate Care</h3>
                  <p className="text-sm text-muted-foreground">Treating every resident like family</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Safety First</h3>
                  <p className="text-sm text-muted-foreground">Licensed and fully insured</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Family Environment</h3>
                  <p className="text-sm text-muted-foreground">Small, intimate care setting</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Quality Care</h3>
                  <p className="text-sm text-muted-foreground">Highly trained staff</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing & Safety */}
      <section className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Licensing & Safety</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards of care and safety, fully licensed and regulated
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">State Licensed</h3>
                <p className="text-muted-foreground">
                  Licensed by the Washington State Department of Social and Health Services
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Fully Insured</h3>
                <p className="text-muted-foreground">
                  Comprehensive liability and professional insurance coverage
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Regular Inspections</h3>
                <p className="text-muted-foreground">
                  Routine state inspections ensure compliance with all regulations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;