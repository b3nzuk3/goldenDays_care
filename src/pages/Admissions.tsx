import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Calendar, FileText } from "lucide-react";
import { sitePhotos } from "@/data/site-photos";

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
  "Personal items and clothing list",
];

const processSteps = [
  {
    title: "Tour & Meet",
    description: "Schedule a tour to meet our staff and see our facilities firsthand.",
  },
  {
    title: "Assessment",
    description: "Complete care assessment to determine the best fit for your loved one's needs.",
  },
  {
    title: "Documentation",
    description: "Complete required paperwork and gather necessary documents.",
  },
  {
    title: "Move In",
    description: "Smooth transition with our team supporting every step of the move-in process.",
  },
];

const faqs = [
  {
    question: "How long does the admissions process take?",
    answer:
      "Typically 1-2 weeks from initial tour to move-in, depending on availability and document preparation.",
  },
  {
    question: "What if my loved one has specific medical needs?",
    answer:
      "We conduct thorough assessments to ensure we can meet all care needs before admission.",
  },
  {
    question: "Can we bring personal belongings?",
    answer:
      "Yes! We encourage personal items, furniture, and decorations to make the space feel like home.",
  },
  {
    question: "What happens if care needs change?",
    answer:
      "We regularly reassess care needs and adjust our services accordingly to ensure appropriate care.",
  },
];

const Admissions = () => {
  return (
    <div className="editorial-page min-h-screen bg-background">
      <Navigation />

      <PageHero
        title="Admissions Process"
        description="Starting your journey with Golden Days AFH is simple. We're here to guide you every step of the way."
        image={sitePhotos.admissions}
      >
        <Button asChild variant="trust" size="lg">
          <Link to="/contact#contact-form">Schedule a Tour Today</Link>
        </Button>
      </PageHero>

      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Simple 4-Step Process
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our streamlined admissions process ensures a smooth transition for your loved one
              </p>
            </div>
            <ol className="grid gap-x-8 border-t border-border md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <li
                  key={step.title}
                  className="list-decimal border-b border-border py-8 pl-2 marker:font-semibold marker:text-warm-accent"
                >
                  <div className="pl-3">
                    <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-soft-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)] lg:gap-20">
              <div>
                <h2 className="mb-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Admissions Checklist
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                  To help ensure a smooth admissions process, please prepare the following items. Don&apos;t worry if you don&apos;t have everything - our team will help you gather what&apos;s needed.
                </p>
                <ul className="border-t border-border">
                  {checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 border-b border-border py-4 text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-warm-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button variant="trust" disabled className="flex items-center gap-2">
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download Checklist PDF
                  </Button>
                  <Button variant="outline" disabled className="flex items-center gap-2">
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Admission Forms
                  </Button>
                </div>
              </div>

              <div id="schedule-visit">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" aria-hidden="true" />
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

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="border-t border-border">
              {faqs.map((faq) => (
                <article key={faq.question} className="grid gap-3 border-b border-border py-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
                  <h3 className="text-xl font-semibold text-foreground">{faq.question}</h3>
                  <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admissions;
