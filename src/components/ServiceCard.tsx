import { ArrowUpRight, type LucideIcon } from 'lucide-react'

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
    <Icon className="service-icon" size={29} strokeWidth={1.4} aria-hidden="true" />
    <h3>{title}</h3>
    <p>{description}</p>
    <ul>{features.map(feature => <li key={feature}>{feature}</li>)}</ul>
    {onLearnMore ? <button className="text-link" onClick={onLearnMore}>{ctaText} <ArrowUpRight size={17} aria-hidden="true" /></button> : <a className="text-link" href="/contact#contact-form">{ctaText}<span className="sr-only"> about {title}</span> <ArrowUpRight size={17} aria-hidden="true" /></a>}
  </article>
)

export default ServiceCard
