import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { serviceData } from '../../pages/Services/ServiceDetail';
import './Navbar.css';

const NAV_SERVICES = Object.values(serviceData).map(s => ({
  slug: s.slug,
  label: s.title,
  icon: s.icon,
  color: s.color,
}));

const links = [
  { to: '/',       label: 'Home' },
  { to: '/about',  label: 'About' },
  { to: '/plans',  label: 'Plans' },
  { to: '/support',label: 'Support' },
  { to: '/contact',label: 'Contact' },
];

function AnimatedLogoMark({ compact = false }) {
  return (
    <span className={`nav-logo-mark ${compact ? 'compact' : ''}`}>
      <span className="nav-logo-flipper">
        <img src="/logo.png" alt="Harmony Internet" className="nav-logo-img nav-logo-face nav-logo-face-front" />
      </span>
      <span className="nav-logo-gloss" aria-hidden="true" />
    </span>
  );
}

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [topHidden, setTopHidden] = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [svcOpen,   setSvcOpen]   = useState(false);
  const [lastY,     setLastY]     = useState(0);
  const dropRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setTopHidden(y > lastY && y > 80);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  useEffect(() => { setMenuOpen(false); setSvcOpen(false); }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setSvcOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${topHidden ? 'top-hidden' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <AnimatedLogoMark />
            <div className="nav-brand-text">
              <span className="nav-brand-name">Harmony Internet</span>
              <span className="nav-brand-sub">Pvt. Ltd.</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            {links.slice(0, 2).map(({ to, label }) => (
              <Link key={to} to={to} className={`nav-link ${location.pathname === to ? 'active' : ''}`}>
                {label}
              </Link>
            ))}

            {/* Services dropdown */}
            <div className="nav-dropdown-wrap" ref={dropRef}>
              <button
                className={`nav-link nav-dropdown-btn ${isServicesActive ? 'active' : ''}`}
                onClick={() => setSvcOpen(p => !p)}
                aria-expanded={svcOpen}
              >
                Services <i className={`fas fa-chevron-down nav-chevron ${svcOpen ? 'open' : ''}`} />
              </button>

              {svcOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-header">
                    <Link to="/services" className="nav-dropdown-all" onClick={() => setSvcOpen(false)}>
                      <i className="fas fa-th-large" /> View All Services
                    </Link>
                  </div>
                  <div className="nav-dropdown-grid">
                    {NAV_SERVICES.map(s => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="nav-dropdown-item"
                        onClick={() => setSvcOpen(false)}
                        style={{ '--item-color': s.color }}
                      >
                        <div className="ndi-icon" style={{ color: s.color, background: `${s.color}14` }}>
                          <i className={s.icon} />
                        </div>
                        <span>{s.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {links.slice(2).map(({ to, label }) => (
              <Link key={to} to={to} className={`nav-link ${location.pathname === to ? 'active' : ''}`}>
                {label}
              </Link>
            ))}
            <Link to="/pay-bill" className="nav-link nav-cta">Pay Bill</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''} ${topHidden ? 'top-hidden' : ''}`}>
        <div className="mobile-menu-logo">
          <AnimatedLogoMark compact />
          <div className="nav-brand-text">
            <span className="nav-brand-name">Harmony Internet</span>
            <span className="nav-brand-sub">Pvt. Ltd.</span>
          </div>
        </div>

        {links.slice(0, 2).map(({ to, label }) => (
          <Link key={to} to={to} className={`nav-link ${location.pathname === to ? 'active' : ''}`}>{label}</Link>
        ))}

        {/* Mobile services accordion */}
        <button className="nav-link mobile-svc-toggle" onClick={() => setSvcOpen(p => !p)}>
          Services <i className={`fas fa-chevron-down nav-chevron ${svcOpen ? 'open' : ''}`} />
        </button>
        {svcOpen && (
          <div className="mobile-svc-list">
            <Link to="/services" className="mobile-svc-item mobile-svc-all" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-th-large" /> All Services
            </Link>
            {NAV_SERVICES.map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="mobile-svc-item" onClick={() => setMenuOpen(false)}>
                <i className={s.icon} style={{ color: s.color }} /> {s.label}
              </Link>
            ))}
          </div>
        )}

        {links.slice(2).map(({ to, label }) => (
          <Link key={to} to={to} className={`nav-link ${location.pathname === to ? 'active' : ''}`}>{label}</Link>
        ))}
        <Link to="/pay-bill" className="nav-link nav-cta" style={{ marginTop: 8 }}>Pay Bill</Link>
      </div>
    </>
  );
}

export default Navbar;
