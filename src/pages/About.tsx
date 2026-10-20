import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-care-home.jpg";

const highlights = [
  {
    title: "Compassionate Care",
    description: "Treating every resident like family",
  },
  {
    title: "Safety First",
    description: "Licensed and fully insured",
  },
  {
    title: "Family Environment",
    description: "Small, intimate care setting",
  },
  {
    title: "Quality Care",
    description: "Highly trained staff",
  },
];

const licensing = [
  {
    title: "State Licensed",
    description:
      "Licensed by the Washington State Department of Social and Health Services",
  },
  {
    title: "Fully Insured",
    description: "Comprehensive liability and professional insurance coverage",
  },
  {
    title: "Regular Inspections",
    description: "Routine state inspections ensure compliance with all regulations",
  },
];

const About = () => {
  return (
    <div className="editorial-page min-h-screen bg-background">
      <Navigation />

      <PageHero
        title="About Golden Days AFH"
        description="Providing compassionate, personalized care in a warm family setting since 2010"
        image={{
          src: heroImage,
          alt: "Comfortable living room at Golden Days Adult Family Home",
        }}
      >
        <Button asChild variant="trust">
          <Link to="/services">Learn About Our Services</Link>
        </Button>
      </PageHero>

      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-20">
              <div>
                <h2 className="mb-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  About Our Home
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    Golden Days Adult Family Home stands out among homes in Spokane.
                    The Home is operated by Judy Wanjiru, a Registered Nurse with
                    over 20 years experience in healthcare. She holds a Master of
                    Science in Health Management and was awarded the 2016
                    Compassionate Care Award by SCCC.
                  </p>
                  <p>
                    We are proud to operate a beautiful home with a spacious
                    interior, a large kitchen, outdoor deck, and a full dining room
                    area. Enough room for indoor activities whether in a private
                    bedroom, or the ample living and community area with a large
                    outdoor deck to view nature.
                  </p>
                  <p>
                    Located next to beautiful Ben Burr Park, it offers outdoor areas
                    to spend time with loved ones in the warmer months. Ben Burr
                    Park offers a play area for children, a walking path suitable
                    for mobility aids and walking, open cooking areas, and other
                    activity areas for family experiences.
                  </p>
                  <p>
                    We believe you should consider the friendly and caring
                    environment we offer. Compassionate care where you are family
                    and you are treated with respect, dignity, and compassion. Come
                    join my home and our family.
                  </p>
                </div>
              </div>

              <div className="border-t border-border">
                {highlights.map((highlight) => (
                  <article
                    key={highlight.title}
                    className="grid gap-2 border-b border-border py-6 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6"
                  >
                    <h3 className="font-semibold text-foreground">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-soft-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Licensing &amp; Safety
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We maintain the highest standards of care and safety, fully licensed and regulated
              </p>
            </div>
            <div className="border-t border-border">
              {licensing.map((item) => (
                <article
                  key={item.title}
                  className="grid gap-3 border-b border-border py-6 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10"
                >
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
