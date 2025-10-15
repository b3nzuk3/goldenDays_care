import React from 'react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Shield, Users, Award } from 'lucide-react'

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
              Providing compassionate, personalized care in a warm family
              setting since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                About Our Home
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Golden Days Adult Family Home stands out among homes in Spokane.
                The Home is operated by Judy Wanjiru, a Registered Nurse with
                over 20 years experience in healthcare. She holds a Master of
                Science in Health Management and was awarded the 2016
                Compassionate Care Award by SCCC.
              </p>
              <p className="text-muted-foreground mb-6">
                We are proud to operate a beautiful home with a spacious
                interior, a large kitchen, outdoor deck, and a full dining room
                area. Enough room for indoor activities whether in a private
                bedroom, or the ample living and community area with a large
                outdoor deck to view nature.
              </p>
              <p className="text-muted-foreground mb-8">
                Located next to beautiful Ben Burr Park, it offers outdoor areas
                to spend time with loved ones in the warmer months. Ben Burr
                Park offers a play area for children, a walking path suitable
                for mobility aids and walking, open cooking areas, and other
                activity areas for family experiences.
              </p>
              <p className="text-muted-foreground mb-8">
                We believe you should consider the friendly and caring
                environment we offer. Compassionate care where you are family
                and you are treated with respect, dignity, and compassion. Come
                join my home and our family.
              </p>
              <Button variant="trust">Learn About Our Services</Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Compassionate Care
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Treating every resident like family
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Safety First
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Licensed and fully insured
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Family Environment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Small, intimate care setting
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-warm-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Quality Care
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Highly trained staff
                  </p>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Licensing & Safety
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards of care and safety, fully
              licensed and regulated
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  State Licensed
                </h3>
                <p className="text-muted-foreground">
                  Licensed by the Washington State Department of Social and
                  Health Services
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Fully Insured
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive liability and professional insurance coverage
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Regular Inspections
                </h3>
                <p className="text-muted-foreground">
                  Routine state inspections ensure compliance with all
                  regulations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
