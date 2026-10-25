import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, MapPin, Menu, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Staff', href: '/staff' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
]

const Navigation = ({ overlay = false }: { overlay?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    if (!overlay) return
    const updateScroll = () => setIsScrolled(window.scrollY > 24)
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [overlay])

  useEffect(() => {
    if (!isOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return (
    <header className={`site-header${overlay ? ' site-header--hero' : ''}`} data-scrolled={isScrolled}>
      {overlay && <svg className="hero-brand-filter" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="hero-brand-outline" x="-10%" y="-20%" width="120%" height="140%" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceAlpha" operator="dilate" radius="0.8" result="outline" />
            <feFlood floodColor="hsl(40 38% 97%)" result="outline-color" />
            <feComposite in="outline-color" in2="outline" operator="in" result="light-outline" />
            <feMerge>
              <feMergeNode in="light-outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>}
      <a href="#page-content" className="skip-link">Skip to content</a>
      <div className="contact-strip">
        <div className="container contact-strip-inner">
          <a href="https://www.google.com/maps/search/?api=1&query=4224+E+Prairie+Ln+Court+Spokane+WA+99223" target="_blank" rel="noreferrer" className="location-link">
            <MapPin size={13} aria-hidden="true" />
            <span>4224 E Prairie Ln Court, Spokane, WA</span>
          </a>
          <span className="care-hours">24/7 Care & Support</span>
          <a href="tel:9132714783"><Phone size={13} aria-hidden="true" /><span>(913) 271-4783</span></a>
        </div>
      </div>
      <div className="container nav-inner">
        <NavLink to="/" className="brand" aria-label="Golden Days Adult Family Home, home">
          <img className="brand-logo" src="/images/golden-days-mark.svg" width="1220" height="410" alt="" />
          <img className="brand-wordmark" src="/images/golden-days-wordmark.svg" width="1360" height="248" alt="Golden Days Adult Family Home" />
        </NavLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(item => <NavLink key={item.href} to={item.href} end={item.href === '/'}>{item.name}</NavLink>)}
        </nav>
        <Button asChild variant="warm" className="nav-tour"><a href="/contact#contact-form">Schedule a Tour <ArrowUpRight aria-hidden="true" /></a></Button>
        <Button ref={menuButton} className="menu-toggle" variant="ghost" size="icon" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>
      {isOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
        <div className="container">
          {navItems.map(item => <NavLink key={item.href} to={item.href} end={item.href === '/'} onClick={() => setIsOpen(false)}>{item.name}<ArrowUpRight size={17} aria-hidden="true" /></NavLink>)}
          <Button asChild variant="warm" className="mt-5 w-full"><a href="/contact#contact-form">Schedule a Tour <ArrowUpRight aria-hidden="true" /></a></Button>
        </div>
      </nav>}
    </header>
  )
}

export default Navigation
