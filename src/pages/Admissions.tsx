import React from "react";
import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Calendar, FileText } from "lucide-react";

const Admissions = () => {
  const checklist = [
    "Complete admission application",
    "Medical assessment and physician orders",
    "Current medication list",
    "Insurance information and financial documentation",
    "Emergency contact information",
    "Personal care preferences and dietary needs",
    "Recent photos for identification",
    "Power of attorney documents (if applicable)",
    "Advanced directives and care preferences",
    "Personal items and clothing list"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-soft-gray to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Admissions Process
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Starting your journey with Golden Days AFH is simple. We're here to guide you every step of the way.
            </p>
            <Button variant="trust" size="lg">Schedule a Tour Today</Button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Simple 4-Step Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined admissions process ensures a smooth transition for your loved one
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-trust-blue text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">1</span>
                </div>
                <CardTitle className="text-lg">Tour & Meet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Schedule a tour to meet our staff and see our facilities firsthand.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-trust-blue text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">2</span>
                </div>
                <CardTitle className="text-lg">Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete care assessment to determine the best fit for your loved one's needs.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-trust-blue text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">3</span>
                </div>
                <CardTitle className="text-lg">Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete required paperwork and gather necessary documents.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-trust-blue text-white rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">4</span>
                </div>
                <CardTitle className="text-lg">Move In</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Smooth transition with our team supporting every step of the move-in process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admissions Checklist */}
      <section className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Admissions Checklist</h2>
              <p className="text-muted-foreground mb-8">
                To help ensure a smooth admissions process, please prepare the following items. 
                Don't worry if you don't have everything - our team will help you gather what's needed.
              </p>
              <div className="space-y-3">
                {checklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-warm-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="trust" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Checklist PDF
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Admission Forms
                </Button>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule Your Visit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does the admissions process take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Typically 1-2 weeks from initial tour to move-in, depending on availability and document preparation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if my loved one has specific medical needs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We conduct thorough assessments to ensure we can meet all care needs before admission.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can we bring personal belongings?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We encourage personal items, furniture, and decorations to make the space feel like home.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens if care needs change?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We regularly reassess care needs and adjust our services accordingly to ensure appropriate care.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;