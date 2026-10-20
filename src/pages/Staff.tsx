import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import StaffCard from "@/components/StaffCard";
import { Button } from "@/components/ui/button";
import { GraduationCap, Heart, Shield, Users } from "lucide-react";
import { sitePhotos } from "@/data/site-photos";

const staffMembers = [
  {
    name: "Judy Wanjiru",
    title: "Home Operator & Registered Nurse",
    credentials: ["RN", "Master of Science in Health Management"],
    experience: "Over 20 years of experience in healthcare",
    bio: "Judy operates Golden Days Adult Family Home and brings over 20 years of healthcare experience. She holds a Master of Science in Health Management and received the 2016 Compassionate Care Award from SCCC. Her approach centers on a family environment where residents are treated with respect, dignity, and compassion.",
    photo: "",
  },
];

const teamValues = [
  {
    icon: Heart,
    title: "Compassion",
    description: "Treating every resident with kindness and empathy",
  },
  {
    icon: GraduationCap,
    title: "Excellence",
    description: "Continuous learning and professional development",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Maintaining the highest safety and care standards",
  },
  {
    icon: Users,
    title: "Family",
    description: "Creating genuine connections and relationships",
  },
];

const qualifications = [
  {
    title: "Required Certifications",
    items: [
      "State licensing and background checks",
      "CPR and First Aid certification",
      "Medication administration training",
      "Dementia care specialization",
      "Annual continuing education",
    ],
  },
  {
    title: "Ongoing Training",
    items: [
      "Monthly safety and care workshops",
      "Emergency response drills",
      "Family communication skills",
      "Cultural sensitivity training",
      "Best practices in elder care",
    ],
  },
  {
    title: "Staff Support",
    items: [
      "24/7 on-call nursing support",
      "Regular team meetings",
      "Professional development opportunities",
      "Mental health and wellness programs",
      "Career advancement pathways",
    ],
  },
];

const Staff = () => {
  return (
    <div className="editorial-page min-h-screen bg-background">
      <Navigation />

      <PageHero
        title="Our Caring Team"
        description="Meet the dedicated professionals who make Golden Days AFH a place where your loved ones thrive"
        image={sitePhotos.staff}
      >
        <Button asChild variant="trust" size="lg">
          <a href="mailto:goldendaysafh@gmail.com?subject=Join%20Our%20Team">Join Our Team</a>
        </Button>
      </PageHero>

      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Our Team Values
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Every member of our team is committed to providing exceptional care with these core values
              </p>
            </div>
            <div className="grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
              {teamValues.map((value) => {
                const Icon = value.icon;

                return (
                  <article key={value.title} className="border-b border-border py-7 md:px-6 md:first:pl-0 lg:border-r lg:last:border-r-0">
                    <Icon className="mb-4 h-6 w-6 text-warm-accent" aria-hidden="true" />
                    <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-soft-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Meet Our Home Operator
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Get to know the registered nurse who operates Golden Days Adult Family Home.
              </p>
            </div>
            <div className="max-w-2xl">
              {staffMembers.map((staff) => (
                <StaffCard
                  key={staff.name}
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

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Staff Qualifications &amp; Training
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our team meets and exceeds state requirements for adult family home care
              </p>
            </div>
            <div className="border-t border-border">
              {qualifications.map((qualification) => (
                <article
                  key={qualification.title}
                  className="grid gap-6 border-b border-border py-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12"
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">{qualification.title}</h3>
                  <ul className="grid gap-3 text-muted-foreground sm:grid-cols-2">
                    {qualification.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warm-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">Join Our Caring Team</h2>
              <p className="mb-8 text-lg leading-relaxed text-primary-foreground/85">
                Are you passionate about making a difference in the lives of seniors? We're always looking for dedicated caregivers to join our family.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button variant="secondary" size="lg" disabled>View Open Positions</Button>
                <Button
                  variant="outline"
                  size="lg"
                  disabled
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Learn About Benefits
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Staff;
