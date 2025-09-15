import React from "react";
import Navigation from "@/components/Navigation";
import StaffCard from "@/components/StaffCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Heart, Shield, Users } from "lucide-react";

const Staff = () => {
  const staffMembers = [
    {
      name: "Sarah Johnson",
      title: "Administrator & RN",
      credentials: ["RN", "BSN", "15+ years experience"],
      experience: "15+ years in nursing",
      bio: "Sarah brings over 15 years of nursing experience to Golden Days AFH. She is passionate about creating a warm, family-like environment where residents thrive.",
      photo: "/placeholder.svg"
    },
    {
      name: "Michael Chen",
      title: "Care Coordinator",
      credentials: ["CNA", "CPR Certified", "8 years experience"],
      experience: "8 years in care coordination",
      bio: "Michael specializes in personalized care planning and medication management. His gentle approach helps residents feel comfortable and secure.",
      photo: "/placeholder.svg"
    },
    {
      name: "Maria Rodriguez",
      title: "Activities Director",
      credentials: ["Recreation Therapy Certification"],
      experience: "6 years in recreational therapy",
      bio: "Maria designs engaging activities and social programs that keep our residents active, social, and mentally stimulated. She speaks fluent Spanish.",
      photo: "/placeholder.svg"
    },
    {
      name: "David Thompson",
      title: "Caregiver",
      credentials: ["CNA", "First Aid Certified", "6 years experience"],
      experience: "6 years in caregiving",
      bio: "David provides compassionate daily care and assistance. His background in physical therapy helps residents maintain their independence and mobility.",
      photo: "/placeholder.svg"
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
              Our Caring Team
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Meet the dedicated professionals who make Golden Days AFH a place where your loved ones thrive
            </p>
            <Button variant="trust" size="lg">Join Our Team</Button>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Team Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every member of our team is committed to providing exceptional care with these core values
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Compassion</h3>
                <p className="text-sm text-muted-foreground">Treating every resident with kindness and empathy</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <GraduationCap className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">Continuous learning and professional development</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Safety</h3>
                <p className="text-sm text-muted-foreground">Maintaining the highest safety and care standards</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Family</h3>
                <p className="text-sm text-muted-foreground">Creating genuine connections and relationships</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Staff Members */}
      <section className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced, licensed professionals are here 24/7 to provide the best possible care
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {staffMembers.map((staff, index) => (
              <StaffCard
                key={index}
                name={staff.name}
                title={staff.title}
                credentials={staff.credentials}
                experience={staff.experience}
                bio={staff.bio}
                photo={staff.photo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Staff Qualifications & Training</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team meets and exceeds state requirements for adult family home care
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Required Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• State licensing and background checks</li>
                  <li>• CPR and First Aid certification</li>
                  <li>• Medication administration training</li>
                  <li>• Dementia care specialization</li>
                  <li>• Annual continuing education</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Training</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Monthly safety and care workshops</li>
                  <li>• Emergency response drills</li>
                  <li>• Family communication skills</li>
                  <li>• Cultural sensitivity training</li>
                  <li>• Best practices in elder care</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Staff Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 24/7 on-call nursing support</li>
                  <li>• Regular team meetings</li>
                  <li>• Professional development opportunities</li>
                  <li>• Mental health and wellness programs</li>
                  <li>• Career advancement pathways</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 bg-gradient-to-br from-trust-blue to-trust-blue/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Caring Team</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Are you passionate about making a difference in the lives of seniors? We're always looking for dedicated caregivers to join our family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">View Open Positions</Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-trust-blue">
              Learn About Benefits
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staff;