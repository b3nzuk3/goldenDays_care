import { ArrowUpRight, Check, type LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  ctaText?: string
  onLearnMore?: () => void
}

const ServiceCard = ({ icon: Icon, title, description, features, ctaText = 'Learn More', onLearnMore }: ServiceCardProps) => (
  <article className="service-entry">
    <span className="service-icon"><Icon size={29} strokeWidth={1.4} aria-hidden="true" /></span>
    <h3>{title}</h3>
    <p>{description}</p>
    <ul>{features.map(feature => <li key={feature}><Check size={16} strokeWidth={1.6} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
    {onLearnMore ? <button type="button" className="text-link" onClick={onLearnMore}>{ctaText}<span className="sr-only"> about {title}</span> <ArrowUpRight size={19} aria-hidden="true" /></button> : <a className="text-link" href="/contact#contact-form">{ctaText}<span className="sr-only"> about {title}</span> <ArrowUpRight size={19} aria-hidden="true" /></a>}
  </article>
)

export default ServiceCard
