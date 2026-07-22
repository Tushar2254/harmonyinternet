import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './SpeedTest.css';

/* ─────────────────────────────────────────
   CUSTOM SPEED TEST ENGINE
   Uses fetch() to download a test file and
   measures throughput in real time.
───────────────────────────────────────── */

// A publicly available large test file (Cloudflare's speed test endpoint)
const DOWNLOAD_URL = 'https://speed.cloudflare.com/__down?bytes=25000000'; // 25 MB
const UPLOAD_URL   = 'https://speed.cloudflare.com/__up';

async function measurePing() {
  const t0 = performance.now();
  try {
    await fetch('https://speed.cloudflare.com/__down?bytes=1', { cache: 'no-store' });
  } catch (_) { /* ignore */ }
  return Math.round(performance.now() - t0);
}

async function measureDownload(onProgress) {
  const start = performance.now();
  let loaded = 0;
  try {
    const res = await fetch(DOWNLOAD_URL + '&r=' + Math.random(), { cache: 'no-store' });
    const reader = res.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      loaded += value.length;
      const elapsed = (performance.now() - start) / 1000;
      const mbps = ((loaded * 8) / 1e6) / elapsed;
      onProgress(Math.round(mbps * 10) / 10);
    }
  } catch (_) { /* ignore */ }
  const elapsed = (performance.now() - start) / 1000;
  return Math.round(((loaded * 8) / 1e6 / elapsed) * 10) / 10;
}

async function measureUpload(onProgress) {
  // Upload 5 MB of random data
  const SIZE = 5 * 1024 * 1024;
  const data = new Uint8Array(SIZE);
  crypto.getRandomValues(data);
  const blob = new Blob([data]);

  const start = performance.now();
  try {
    await fetch(UPLOAD_URL + '?r=' + Math.random(), {
      method: 'POST',
      body: blob,
      cache: 'no-store',
    });
  } catch (_) { /* ignore */ }
  const elapsed = (performance.now() - start) / 1000;
  const mbps = Math.round(((SIZE * 8) / 1e6 / elapsed) * 10) / 10;
  onProgress(mbps);
  return mbps;
}

/* ─────────────────────────────────────────
   GAUGE COMPONENT
───────────────────────────────────────── */
function Gauge({ value, max, label, unit, color }) {
  const pct     = Math.min(value / max, 1);
  const angle   = -135 + pct * 270; // sweep from -135° to +135°
  const r       = 80;
  const cx      = 100;
  const cy      = 100;

  // Arc path helper
  function polarToXY(deg, radius) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function arcPath(startDeg, endDeg, radius) {
    const s   = polarToXY(startDeg, radius);
    const e   = polarToXY(endDeg,   radius);
    const lg  = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${lg} 1 ${e.x} ${e.y}`;
  }

  const trackStart = -135;
  const trackEnd   = 135;
  const fillEnd    = trackStart + pct * 270;

  return (
    <div className="gauge-wrap">
      <svg viewBox="0 0 200 200" className="gauge-svg">
        {/* Track */}
        <path
          d={arcPath(trackStart, trackEnd, r)}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Fill */}
        {value > 0 && (
          <path
            d={arcPath(trackStart, fillEnd, r)}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        )}
        {/* Needle */}
        {(() => {
          const tip = polarToXY(angle, r - 10);
          const base1 = polarToXY(angle - 90, 8);
          const base2 = polarToXY(angle + 90, 8);
          return (
            <polygon
              points={`${tip.x},${tip.y} ${base1.x},${base1.y} ${base2.x},${base2.y}`}
              fill={color}
              opacity="0.9"
            />
          );
        })()}
        {/* Center dot */}
        <circle cx={cx} cy={cy} r="6" fill={color} />
        <circle cx={cx} cy={cy} r="3" fill="#0d1526" />
      </svg>

      <div className="gauge-value">
        <span className="gauge-number">{value > 0 ? value : '—'}</span>
        <span className="gauge-unit">{unit}</span>
      </div>
      <div className="gauge-label">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN SPEED TEST COMPONENT
───────────────────────────────────────── */
const PHASES = ['idle', 'ping', 'download', 'upload', 'done'];

function SpeedTestWidget() {
  const [phase,    setPhase]    = useState('idle');
  const [ping,     setPing]     = useState(0);
  const [download, setDownload] = useState(0);
  const [upload,   setUpload]   = useState(0);
  const [error,    setError]    = useState('');
  const running = useRef(false);

  const reset = () => {
    setPhase('idle');
    setPing(0);
    setDownload(0);
    setUpload(0);
    setError('');
  };

  const runTest = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    reset();

    try {
      // 1. Ping
      setPhase('ping');
      const p = await measurePing();
      setPing(p);

      // 2. Download
      setPhase('download');
      await measureDownload(v => setDownload(v));

      // 3. Upload
      setPhase('upload');
      await measureUpload(v => setUpload(v));

      setPhase('done');
    } catch (e) {
      setError('Test failed. Please check your connection and try again.');
      setPhase('idle');
    } finally {
      running.current = false;
    }
  }, []);

  const isRunning = phase !== 'idle' && phase !== 'done';
  const isDone    = phase === 'done';

  const phaseLabel = {
    idle:     'Press GO to start',
    ping:     'Measuring ping...',
    download: 'Testing download speed...',
    upload:   'Testing upload speed...',
    done:     'Test complete!',
  };

  return (
    <div className="st-widget">

      {/* Status bar */}
      <div className="st-status-bar">
        {PHASES.filter(p => p !== 'idle').map((p, i) => (
          <div
            key={p}
            className={`st-phase-step ${phase === p ? 'active' : ''} ${
              PHASES.indexOf(phase) > PHASES.indexOf(p) ? 'done' : ''
            }`}
          >
            <div className="st-phase-dot"></div>
            <span>{p.charAt(0).toUpperCase() + p.slice(1)}</span>
          </div>
        ))}
      </div>

      {/* Gauges */}
      <div className="st-gauges">
        <Gauge
          value={download}
          max={500}
          label="Download"
          unit="Mbps"
          color="#38e8ff"
        />

        {/* GO button in center */}
        <div className="st-center">
          <button
            className={`st-go-btn ${isRunning ? 'running' : ''} ${isDone ? 'done' : ''}`}
            onClick={isRunning ? undefined : isDone ? reset : runTest}
            disabled={false}
          >
            {isRunning ? (
              <span className="st-spinner"></span>
            ) : isDone ? (
              <>
                <i className="fas fa-redo"></i>
                <span>Retest</span>
              </>
            ) : (
              <>
                <i className="fas fa-play"></i>
                <span>GO</span>
              </>
            )}
          </button>
          <p className="st-phase-label">{phaseLabel[phase]}</p>
        </div>

        <Gauge
          value={upload}
          max={500}
          label="Upload"
          unit="Mbps"
          color="#60a5fa"
        />
      </div>

      {/* Ping result */}
      <div className="st-ping-row">
        <div className={`st-ping-card ${ping > 0 ? 'visible' : ''}`}>
          <i className="fas fa-satellite-dish"></i>
          <div>
            <span className="st-ping-value">{ping > 0 ? ping : '—'}</span>
            <span className="st-ping-unit"> ms</span>
          </div>
          <div className="st-ping-label">Ping / Latency</div>
        </div>

        {isDone && (
          <>
            <div className="st-result-card">
              <i className="fas fa-arrow-down" style={{ color: '#38e8ff' }}></i>
              <div>
                <span className="st-ping-value" style={{ color: '#38e8ff' }}>{download}</span>
                <span className="st-ping-unit"> Mbps</span>
              </div>
              <div className="st-ping-label">Download</div>
            </div>
            <div className="st-result-card">
              <i className="fas fa-arrow-up" style={{ color: '#60a5fa' }}></i>
              <div>
                <span className="st-ping-value" style={{ color: '#60a5fa' }}>{upload}</span>
                <span className="st-ping-unit"> Mbps</span>
              </div>
              <div className="st-ping-label">Upload</div>
            </div>
          </>
        )}
      </div>

      {error && <p className="st-error"><i className="fas fa-exclamation-triangle"></i> {error}</p>}

      {/* Ookla fallback */}
      <div className="st-ookla-link">
        <span>Prefer Ookla?</span>
        <a href="https://www.speedtest.net" target="_blank" rel="noreferrer">
          Run on Speedtest.net <i className="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
const tips = [
  { icon: 'fas fa-ethernet',     title: 'Use Ethernet',        desc: 'For the most accurate result, connect via Ethernet cable directly to your router.' },
  { icon: 'fas fa-times-circle', title: 'Close Other Apps',    desc: 'Close background apps and browser tabs that may be using bandwidth during the test.' },
  { icon: 'fas fa-redo',         title: 'Run Multiple Tests',  desc: 'Run the test 2–3 times at different times of day for a reliable average reading.' },
  { icon: 'fas fa-map-marker-alt',title: 'Test at Peak Hours', desc: 'Test during evening hours (6–10 PM) to see real-world performance under load.' },
];

const speedGuide = [
  {
    speed: '25 Mbps', label: 'Basic', title: 'Light Usage',
    uses: ['Web browsing', 'Social media', 'SD video streaming', 'Video calls (1 device)'],
  },
  {
    speed: '100 Mbps', label: 'Standard', title: 'Family & WFH',
    uses: ['HD / 4K streaming', 'Online gaming', 'Video conferencing', 'Multiple devices'],
  },
  {
    speed: '500+ Mbps', label: 'Premium', title: 'Power Users',
    uses: ['4K multi-stream', 'Large file uploads', 'Smart home devices', 'Business use'],
  },
];

function SpeedTest() {
  return (
    <PageWrapper>

      {/* HERO */}
      <section className="speedtest-hero">
        <div data-aos="fade-up">
          <div className="speedtest-badge">
            <span className="speedtest-badge-dot"></span>
            Live Speed Test
          </div>
          <h1>Test Your Internet Speed</h1>
          <p>
            Check your real-time download, upload, and ping — powered by our
            built-in speed engine using Cloudflare's test infrastructure.
          </p>
        </div>
      </section>

      {/* SPEED TEST WIDGET */}
      <section className="speedtest-widget-section">
        <div className="speedtest-widget-wrap" data-aos="fade-up">
          <div className="speedtest-widget-header">
            <div className="speedtest-widget-title">
              <div className="speedtest-widget-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              <div>
                <h3>Harmony Internet Speed Test</h3>
                <p>Powered by Cloudflare Speed Infrastructure</p>
              </div>
            </div>
            <div className="speedtest-powered">
              <i className="fas fa-shield-alt"></i>
              Secured &amp; <span>Accurate</span>
            </div>
          </div>

          <SpeedTestWidget />
        </div>
      </section>

      {/* TIPS */}
      <section className="speedtest-tips">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Best Practices</span>
          <h2>Get the Most Accurate Result</h2>
          <p>Follow these tips before running your speed test.</p>
        </div>
        <div className="tips-grid">
          {tips.map((tip, i) => (
            <div className="tip-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="tip-icon"><i className={tip.icon}></i></div>
              <h4>{tip.title}</h4>
              <p>{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPEED GUIDE */}
      <section className="speed-guide-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Speed Guide</span>
          <h2>What Speed Do You Need?</h2>
          <p>Use this guide to understand if your current plan matches your usage.</p>
        </div>
        <div className="speed-guide-grid">
          {speedGuide.map((item, i) => (
            <div className="speed-guide-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="speed-guide-speed">{item.speed}</div>
              <div className="speed-guide-label">{item.label}</div>
              <h4>{item.title}</h4>
              <ul className="speed-guide-uses">
                {item.uses.map((use, j) => (
                  <li key={j}><i className="fas fa-check-circle"></i>{use}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="speedtest-cta">
        <div data-aos="fade-up">
          <h2>Speed Not What You Expected?</h2>
          <p>Our support team can diagnose and fix issues — usually within the same day.</p>
          <div className="speedtest-cta-actions">
            <Link to="/contact" className="btn-primary">
              Contact Support <i className="fas fa-arrow-right"></i>
            </Link>
            <Link to="/plans" className="btn-ghost">Upgrade Your Plan</Link>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}

export default SpeedTest;
