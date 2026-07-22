import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY]   = useState(0);

  // Hide top bar when scrolling down, show when scrolling up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  return (
    <div className={`top-bar ${hidden ? 'hidden' : ''}`}>
      <div className="top-bar-inner">

        {/* Left — contact info */}
        <div className="top-bar-left">
          <a href="tel:+917584526824" className="top-bar-item">
            <i className="fas fa-phone-alt"></i>
            +91 75845 26824
          </a>
          <div className="top-bar-divider"></div>
          <a href="tel:18001207066" className="top-bar-item">
            <i className="fas fa-phone-alt"></i>
            1800-120-7066
          </a>
          <div className="top-bar-divider"></div>
          <a href="mailto:info@harmonynet.in" className="top-bar-item">
            <i className="fas fa-envelope"></i>
            info@harmonynet.in
          </a>
        </div>

        {/* Right — speed test + socials */}
        <div className="top-bar-right">
          <div className="top-bar-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="top-bar-divider"></div>
          <Link to="/speed-test" className="top-bar-speedtest">
            <i className="fas fa-tachometer-alt"></i>
            Speed Test
          </Link>
        </div>

      </div>
    </div>
  );
}

export default TopBar;
