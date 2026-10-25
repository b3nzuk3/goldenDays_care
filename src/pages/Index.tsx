import { ArrowRight, ArrowUpRight, Award, Check, Clock, Heart, Home, MapPin, Phone, Shield, Stethoscope, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import ServiceCard from '@/components/ServiceCard'
import ContactForm from '@/components/ContactForm'
import HeroMotion from '@/components/HeroMotion'
import { sitePhotos } from '@/data/site-photos'

const services = [
  { icon: Heart, title: 'Personal Care', description: 'Compassionate assistance with daily living activities in a warm, home-like environment.', features: ['Assistance with bathing, dressing, and grooming', 'Medication management and monitoring', 'Mobility support and fall prevention', 'Nutritious meal preparation and dining assistance'] },
  { icon: Stethoscope, title: 'Medical Care', description: "Professional healthcare services coordinated with your loved one's medical team.", features: ['24/7 licensed nursing supervision', 'Coordination with physicians and specialists', 'Health monitoring and vital signs tracking', 'Management of chronic conditions'] },
  { icon: Users, title: 'Social Activities', description: 'Engaging programs that promote social interaction and mental stimulation.', features: ['Group activities and entertainment', 'Individual hobby support', 'Family visit coordination', 'Community outings and events'] },
]
const features = [{ icon: Shield, text: 'Licensed & Insured' }, { icon: Award, text: 'State Certified' }, { icon: Clock, text: '24/7 Care' }, { icon: Home, text: 'Home-like Environment' }]
const reasons = [
  { title: 'Small, intimate setting', text: 'with only 6 residents for personalized attention' },
  { title: 'Licensed professionals', text: 'with over 15 years of eldercare experience' },
  { title: 'Family-centered approach', text: 'with open communication and regular updates' },
  { title: 'Beautiful home environment', text: 'with private rooms and comfortable common areas' },
]

const Index = () => (
  <div className="home-page min-h-screen bg-background">
    <Navigation />
    <main id="page-content" tabIndex={-1}>
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="container hero-layout">
          <div className="hero-copy">
            <h1 id="home-heading">Compassionate Care in a <em><span className="whitespace-nowrap">Home-like</span> Setting</em></h1>
            <p>Golden Days Adult Family Home provides personalized, dignified care for your loved ones in a warm, family environment.</p>
            <div className="hero-actions"><Button asChild variant="warm" size="lg"><a href="/contact#contact-form">Schedule a Tour <ArrowUpRight aria-hidden="true" /></a></Button><Link to="/services" className="text-link">Explore our care <ArrowRight size={18} aria-hidden="true" /></Link></div>
            <a className="hero-location" href="/contact"><MapPin size={16} aria-hidden="true" /> A place to call home in Spokane, Washington</a>
          </div>
          <figure className="hero-photo">
            <HeroMotion />
            <figcaption><span>Care that feels like family.</span><Link to="/about">Our home <ArrowUpRight size={17} aria-hidden="true" /></Link></figcaption>
          </figure>
        </div>
      </section>
      <section className="home-reassurance" aria-label="Our care commitments"><div className="container reassurance-list">{features.map(({ icon: Icon, text }) => <div key={text}><Icon size={21} strokeWidth={1.5} aria-hidden="true" /><span>{text}</span></div>)}</div></section>
      <section className="home-services section-space" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-heading"><h2 id="services-heading">Our Care Services</h2><p>We provide comprehensive care tailored to each resident's unique needs, ensuring comfort, dignity, and peace of mind for families.</p></div>
          <div className="service-grid">{services.map(service => <ServiceCard key={service.title} {...service} />)}</div>
        </div>
      </section>
      <section className="home-about section-space" aria-labelledby="about-heading">
        <div className="container about-layout">
          <div className="about-photographs"><figure className="about-main-photo"><img {...sitePhotos.homeLiving} loading="lazy" decoding="async" /><figcaption>Space to relax and feel connected.</figcaption></figure><figure className="about-room-photo"><img {...sitePhotos.homeBedroom} loading="lazy" decoding="async" /><figcaption>Room to feel at home.</figcaption></figure></div>
          <div className="about-copy"><h2 id="about-heading">Why Choose Golden Days AFH?</h2><ul className="home-reasons">{reasons.map(reason => <li key={reason.title}><Check size={19} aria-hidden="true" /><p><strong>{reason.title}</strong> {reason.text}</p></li>)}</ul><Button asChild variant="outline" size="lg"><Link to="/about">Learn More About Us <ArrowUpRight aria-hidden="true" /></Link></Button></div>
        </div>
      </section>
      <section className="home-testimonial section-space" aria-labelledby="stories-heading"><div className="container testimonial-layout"><div><h2 id="stories-heading">What Families Are Saying</h2><Link to="/testimonials" className="text-link">Read family stories <ArrowRight size={18} aria-hidden="true" /></Link></div><figure><blockquote>“Golden Days AFH gave our family peace of mind during a difficult time. The staff treats every resident like family, and Mom has never been happier. We couldn't have asked for better care.”</blockquote><figcaption><span className="family-initial" aria-hidden="true">S</span><span>Sarah M.<small>Daughter of Resident</small></span></figcaption></figure></div></section>
      <section className="home-visit" aria-labelledby="visit-heading"><div className="container visit-layout"><div><h2 id="visit-heading">Ready to Learn More?</h2><p>Schedule a personal tour to see our home and meet our caring team. We're here to answer all your questions and help you make the best decision for your loved one.</p><div className="visit-actions"><Button asChild variant="secondary" size="lg"><a href="/contact#contact-form">Schedule a Tour <ArrowUpRight aria-hidden="true" /></a></Button><a href="tel:9132714783" className="visit-call"><Phone size={17} aria-hidden="true" /> Call (913) 271-4783</a></div></div><figure><img {...sitePhotos.homeVisit} loading="lazy" decoding="async" /><figcaption><MapPin size={16} aria-hidden="true" /> Spokane, Washington</figcaption></figure></div></section>
      <section className="home-contact section-space"><div className="container home-contact-layout"><div><h2>Get Started Today</h2><p>Reach out to learn more about our compassionate care services and schedule your visit.</p><a href="tel:9132714783" className="contact-phone">(913) 271-4783 <ArrowUpRight size={24} aria-hidden="true" /></a><a href="mailto:goldendaysafh@gmail.com" className="text-link">goldendaysafh@gmail.com</a></div><ContactForm title="Get in Touch" subtitle="We'd love to hear from you and answer any questions about our care services." /></div></section>
    </main>
  </div>
)

export default Index
