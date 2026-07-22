import { useEffect, useRef, useState } from 'react';

/**
 * Counts from 0 up to `target` when the element scrolls into view.
 * `suffix` is appended after the number (e.g. "+", "%", "/7").
 * `prefix` is prepended (e.g. "₹").
 * `decimals` controls decimal places (default 0).
 */
function AnimatedCounter({ target, suffix = '', prefix = '', decimals = 0, duration = 1800 }) {
  const [display, setDisplay] = useState('0');
  const [started, setStarted]   = useState(false);
  const ref = useRef(null);

  /* ── Intersection observer — start when visible ── */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  /* ── Count animation ── */
  useEffect(() => {
    if (!started) return;

    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    let startTime = null;
    let raf;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current  = eased * numericTarget;

      setDisplay(
        decimals > 0
          ? current.toFixed(decimals)
          : Math.floor(current).toString()
      );

      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

export default AnimatedCounter;
