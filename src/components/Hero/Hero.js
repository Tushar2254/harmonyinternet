import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const TOTAL_FRAMES = 216;
const FRAME_PATH   = (n) => `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

function Hero() {
  const canvasRef    = useRef(null);
  const imagesRef    = useRef([]);
  const frameRef     = useRef(0);
  const rafRef       = useRef(null);
  const wrapperRef   = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded,   setAllLoaded]   = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);

  /* ── Pre-load all frames ── */
  useEffect(() => {
    let loaded = 0;
    const images = [];

    const onLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded === TOTAL_FRAMES) setAllLoaded(true);
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload  = onLoad;
      img.onerror = onLoad;
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  /* ── Draw a frame on canvas ── */
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Cover-fit
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const sw    = img.naturalWidth  * scale;
    const sh    = img.naturalHeight * scale;
    const sx    = (width  - sw) / 2;
    const sy    = (height - sh) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  /* ── Resize canvas ── */
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  /* ── Scroll → frame mapping ── */
  useEffect(() => {
    if (!allLoaded) return;

    // Draw first frame immediately
    drawFrame(0);

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect       = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      const scrolled   = Math.max(0, -rect.top);
      const progress   = Math.min(scrolled / scrollable, 1);
      const index      = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      if (index !== frameRef.current) {
        frameRef.current = index;
        setCurrentFrame(index + 1);

        // Use rAF for smooth rendering
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(index));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [allLoaded, drawFrame]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div className="hero-wrapper" ref={wrapperRef}>
      <div className="hero-sticky">

        {/* Loading screen */}
        {!allLoaded && (
          <div className="hero-loading">
            <div className="hero-loading-bar">
              <div className="hero-loading-progress" style={{ width: `${loadPercent}%` }} />
            </div>
            <p>Loading experience — {loadPercent}%</p>
          </div>
        )}

        {/* Canvas for image sequence */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Dark overlay */}
        <div className="hero-overlay" />

        {/* Text content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Harmony Internet Private Limited
          </div>

          <h1 className="hero-title">
            Internet in its<br />
            <span className="teal">Purest Form.</span>
          </h1>

          <p className="hero-subtitle">
            Blazing-fast fiber optic broadband for homes and businesses across Pune.
            Infinite connectivity, zero compromise.
          </p>

          <div className="hero-actions">
            <Link to="/plans" className="btn-primary">
              Explore Plans <i className="fas fa-arrow-right"></i>
            </Link>
            <Link to="/contact" className="btn-ghost">
              Get Connected
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <div className="scroll-mouse" />
          <span>Scroll to explore</span>
        </div>

        {/* Frame counter */}
        {allLoaded && (
          <div className="frame-counter">{currentFrame} / {TOTAL_FRAMES}</div>
        )}
      </div>
    </div>
  );
}

export default Hero;
