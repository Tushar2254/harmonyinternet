import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('enter'); // enter → exit

  useEffect(() => {
    const hold = setTimeout(() => setPhase('exit'), 2400);
    const done = setTimeout(() => onDone(), 3400);
    return () => { clearTimeout(hold); clearTimeout(done); };
  }, [onDone]);

  return (
    <div className={`splash ${phase}`}>

      {/* Animated rings */}
      <div className="splash-ring ring-1" />
      <div className="splash-ring ring-2" />
      <div className="splash-ring ring-3" />

      {/* Floating particles */}
      {[...Array(14)].map((_, i) => (
        <div key={i} className="splash-particle" style={{ '--i': i }} />
      ))}

      {/* Center */}
      <div className="splash-center">

        {/* Logo */}
        <div className="splash-logo-wrap">
          <div className="splash-logo-glow" />
          <div className="splash-logo-loader" aria-hidden="true" />
          <img
            src="/logo.png"
            alt="Harmony Internet"
            className="splash-logo-img"
          />
        </div>

        {/* Brand */}
        <div className="splash-brand">
          <span className="splash-brand-main">HARMONY INTERNET</span>
          <span className="splash-brand-sub">Pvt. Ltd.</span>
        </div>

        {/* Tagline */}
        <p className="splash-tagline">WHERE SPEED MEETS INNOVATION</p>

        {/* Loading bar */}
        <div className="splash-bar-track">
          <div className="splash-bar-fill" />
        </div>

        {/* Loading dots */}
        <div className="splash-dots">
          <span /><span /><span />
        </div>
      </div>

    </div>
  );
}
