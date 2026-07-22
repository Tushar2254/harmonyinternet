import { Link } from 'react-router-dom';
import './Footer.css';

const quickLinks = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/plans',    label: 'Plans & Pricing' },
  { to: '/pay-bill', label: 'Pay Bill' },
  { to: '/support',  label: 'Support' },
  { to: '/contact',  label: 'Contact' },
];

const services = [
  'Home Broadband',
  'Fiber Optic',
  'Leased Line',
  'Business Internet',
  'Wi-Fi Solutions',
  'IT Support',
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/logo.png" alt="Harmony Internet" className="footer-logo-img" />
            <div className="footer-brand-text">
              <span className="footer-brand-name">Harmony Internet</span>
              <span className="footer-brand-sub">Pvt. Ltd.</span>
            </div>
          </Link>
          <p className="footer-desc">
            Harmony Internet Private Limited — delivering infinite connectivity through
            premium fiber optic broadband across Pune since 2014.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" className="footer-social" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="footer-social" target="_blank" rel="noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="footer-social" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className="footer-social" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer-col-title">Quick Links</h4>
          <div className="footer-links">
            {quickLinks.map(({ to, label }) => (
              <Link key={to} to={to}>
                <i className="fas fa-chevron-right"></i>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="footer-col-title">Services</h4>
          <div className="footer-links">
            {services.map(s => (
              <Link key={s} to="/services">
                <i className="fas fa-chevron-right"></i>
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="footer-col-title">Get In Touch</h4>
          <div className="footer-contact-item">
            <div className="footer-contact-icon"><i className="fas fa-map-marker-alt"></i></div>
            <div>
              <strong>Address</strong>
              <span>Sangamwadi, Pune — 411003</span>
            </div>
          </div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon"><i className="fas fa-phone-alt"></i></div>
            <div>
              <strong>Phone</strong>
              <span>+91 75845 26824</span>
            </div>
          </div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon"><i className="fas fa-envelope"></i></div>
            <div>
              <strong>Email</strong>
              <span>info@harmonynet.in</span>
            </div>
          </div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon"><i className="fas fa-headset"></i></div>
            <div>
              <strong>Support</strong>
              <span>24 / 7 Technical Help</span>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} <a href="/">Harmony Internet Private Limited</a>. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/contact">Privacy Policy</Link>
          <Link to="/contact">Terms of Use</Link>
          <Link to="/contact">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
