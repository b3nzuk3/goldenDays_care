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

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  useEffect(() => { setIsOpen(false) }, [pathname])

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
    <header className="site-header">
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
