import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-intro">
          <Link to="/" className="brand" aria-label="Golden Days Adult Family Home, home"><img className="brand-logo" src="/images/golden-days-logo.svg" width="1360" height="684" alt="Golden Days Adult Family Home" /></Link>
          <p>Providing compassionate, dignified care in a home-like environment since 2015.</p>
        </div>
        <div>
          <h2>Explore our home</h2>
          <nav aria-label="Footer navigation">
            <Link to="/about">About us</Link><Link to="/services">Care services</Link><Link to="/admissions">Admissions</Link><Link to="/staff">Our team</Link><Link to="/gallery">Photo gallery</Link><Link to="/testimonials">Family stories</Link>
          </nav>
        </div>
        <div>
          <h2>Let’s talk</h2>
          <a href="tel:9132714783">(913) 271-4783</a>
          <a href="tel:5098187552">(509) 818-7552</a>
          <a href="mailto:goldendaysafh@gmail.com">goldendaysafh<wbr />@gmail.com</a>
          <a href="/contact#contact-form" className="footer-tour">Schedule a Tour <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <div>
          <h2>Visit Golden Days</h2>
          <address>4224 E Prairie Ln Court<br />Spokane, WA 99223</address>
          <p className="footer-certification">Washington State Licensed Adult Family Home • License #123456 • Medicaid & Private Pay Accepted</p>
        </div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Golden Days Adult Family Home. All rights reserved.</p><Link to="/contact#contact-form">Contact us <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
    </div>
  </footer>
)

export default Footer
