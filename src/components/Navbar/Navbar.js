import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/',           label: 'Home' },
  { to: '/about',      label: 'About' },
  { to: '/services',   label: 'Services' },
  { to: '/plans',      label: 'Plans' },
  // { to: '/speed-test', label: 'Speed Test' },
  { to: '/support',    label: 'Support' },
  { to: '/contact',    label: 'Contact' },
];

function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [topHidden,  setTopHidden]  = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [lastY,      setLastY]      = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // top bar hides when scrolling down past 80px
      setTopHidden(y > lastY && y > 80);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${topHidden ? 'top-hidden' : ''}`}>
        <div className="nav-inner">
          {/* ── LOGO + BRAND NAME ── */}
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Harmony Internet" className="nav-logo-img" />
            <div className="nav-brand-text">
              <span className="nav-brand-name">Harmony Internet</span>
              <span className="nav-brand-sub">Pvt. Ltd.</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
              >
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
        {/* Mobile logo + brand */}
        <div className="mobile-menu-logo">
          <img src="/logo.png" alt="Harmony Internet" />
          <div className="nav-brand-text">
            <span className="nav-brand-name">Harmony Internet</span>
            <span className="nav-brand-sub">Pvt. Ltd.</span>
          </div>
        </div>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`nav-link ${location.pathname === to ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link to="/pay-bill" className="nav-link nav-cta" style={{ marginTop: 8 }}>
          Pay Bill
        </Link>
      </div>
    </>
  );
}

export default Navbar;
