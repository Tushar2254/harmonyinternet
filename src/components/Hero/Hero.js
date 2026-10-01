import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const TOTAL_FRAMES = 216;
const FRAME_PATH   = (n) => `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

/* Split text into word spans for a scroll-controlled reveal animation */
function WordReveal({ text, className, visible = false, delay = 0 }) {
  const words = text.split(' ');

  return (
    <span className={`word-reveal-wrap ${className || ''} ${visible ? 'revealed' : ''}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-reveal"
          style={{ transitionDelay: `${delay + i * 80}ms` }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}

function Hero() {
  const canvasRef    = useRef(null);
  const imagesRef    = useRef([]);
  const frameRef     = useRef(0);
  const targetFrameRef = useRef(0);
  const renderedFrameRef = useRef(0);
  const rafRef       = useRef(null);
  const resizeRafRef = useRef(null);
  const contextRef   = useRef(null);
  const wrapperRef   = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded,   setAllLoaded]   = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [revealStage, setRevealStage] = useState(0);

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
      img.decoding = 'async';
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
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = contextRef.current || canvas.getContext('2d', { alpha: false });
    contextRef.current = ctx;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const { width, height } = canvas;

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
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const cssWidth = canvas.clientWidth || window.innerWidth;
        const cssHeight = canvas.clientHeight || window.innerHeight;
        const sourceSafeRatio = Math.min(5120 / cssWidth, 2752 / cssHeight);
        const pixelRatio = Math.max(
          1,
          Math.min(window.devicePixelRatio || 1, 2, sourceSafeRatio)
        );

        canvas.width  = Math.round(cssWidth * pixelRatio);
        canvas.height = Math.round(cssHeight * pixelRatio);
        contextRef.current = canvas.getContext('2d', { alpha: false });
        drawFrame(frameRef.current);
      });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
    };
  }, [drawFrame]);

  /* ── Scroll → frame mapping ── */
  useEffect(() => {
    if (!allLoaded) return;

    drawFrame(0);

    const renderTowardsTarget = () => {
      const current = renderedFrameRef.current;
      const target = targetFrameRef.current;
      const distance = target - current;

      if (Math.abs(distance) < 0.2) {
        renderedFrameRef.current = target;
        const finalIndex = Math.round(target);
        if (finalIndex !== frameRef.current) {
          frameRef.current = finalIndex;
          setCurrentFrame(finalIndex + 1);
          drawFrame(finalIndex);
        }
        rafRef.current = null;
        return;
      }

      // A responsive ease keeps fast scrolling smooth without feeling delayed.
      renderedFrameRef.current = current + distance * 0.34;
      const nextIndex = Math.round(renderedFrameRef.current);

      if (nextIndex !== frameRef.current) {
        frameRef.current = nextIndex;
        setCurrentFrame(nextIndex + 1);
        drawFrame(nextIndex);
      }

      rafRef.current = requestAnimationFrame(renderTowardsTarget);
    };

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect       = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      const scrolled   = Math.max(0, -rect.top);
      const progress   = Math.min(scrolled / scrollable, 1);
      const nextRevealStage = progress >= 0.75 ? 3 : progress >= 0.5 ? 2 : progress >= 0.25 ? 1 : 0;
      const index      = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      targetFrameRef.current = index;
      setRevealStage(nextRevealStage);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(renderTowardsTarget);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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

        {/* Canvas */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Text content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Harmony Internet Private Limited
          </div>

          <h1 className="hero-title">
            <WordReveal
              text="Delivering Trust."
              className="hero-title-primary"
              visible={revealStage >= 1}
            />
            <br />
            <span className={`teal ${revealStage >= 3 ? 'revealed' : ''}`}>
              <WordReveal text="Connecting" visible={revealStage >= 2} />{' '}
              <WordReveal text="Futures." visible={revealStage >= 3} />
            </span>
          </h1>

          <div className="hero-actions reveal-actions">
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

        {allLoaded && (
          <div className="frame-counter">{currentFrame} / {TOTAL_FRAMES}</div>
        )}
      </div>
    </div>
  );
}

export default Hero;
