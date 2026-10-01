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
const DOWNLOAD_URL = 'https://speed.cloudflare.com/__down';
const UPLOAD_URL   = 'https://speed.cloudflare.com/__up';
const TEST_DURATION_MS = 5000;
const UI_UPDATE_INTERVAL_MS = 100;
const DOWNLOAD_CHUNK_BYTES = 10 * 1000 * 1000;
const UPLOAD_CHUNK_BYTES = 2 * 1024 * 1024;
const PING_SAMPLES = 4;

function ensureSuccessfulResponse(response, testName) {
  if (!response.ok) {
    throw new Error(`${testName} request failed with status ${response.status}`);
  }
}

async function measurePing(onProgress) {
  const samples = [];

  for (let i = 0; i < PING_SAMPLES; i++) {
    const t0 = performance.now();
    const response = await fetch(
      `${DOWNLOAD_URL}?bytes=1&r=${Math.random()}`,
      { cache: 'no-store' }
    );
    ensureSuccessfulResponse(response, 'Ping');
    await response.arrayBuffer();
    samples.push(performance.now() - t0);
    onProgress?.(((i + 1) / PING_SAMPLES) * 100);
  }

  samples.sort((a, b) => a - b);
  return Math.round(samples[Math.floor(samples.length / 2)]);
}

async function measureDownload(onProgress) {
  const start = performance.now();
  let loaded = 0;
  let lastUiUpdate = 0;

  while (performance.now() - start < TEST_DURATION_MS) {
    const res = await fetch(
      `${DOWNLOAD_URL}?bytes=${DOWNLOAD_CHUNK_BYTES}&r=${Math.random()}`,
      { cache: 'no-store' }
    );
    ensureSuccessfulResponse(res, 'Download');

    if (!res.body) throw new Error('Download streaming is not supported by this browser.');

    const reader = res.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      loaded += value.length;
      const elapsedMs = performance.now() - start;
      const elapsedSeconds = Math.max(elapsedMs / 1000, 0.001);
      const mbps = ((loaded * 8) / 1e6) / elapsedSeconds;

      // Network streams can emit hundreds of chunks per second. Limiting visual
      // updates keeps React rendering smooth while every byte still contributes
      // to the final measurement.
      if (elapsedMs - lastUiUpdate >= UI_UPDATE_INTERVAL_MS) {
        lastUiUpdate = elapsedMs;
        onProgress(Math.round(mbps * 10) / 10, Math.min((elapsedMs / TEST_DURATION_MS) * 100, 100));
      }
    }
  }

  if (loaded === 0) throw new Error('The download test returned no data.');

  const elapsed = (performance.now() - start) / 1000;
  const finalMbps = Math.round(((loaded * 8) / 1e6 / elapsed) * 10) / 10;
  onProgress(finalMbps, 100);
  return finalMbps;
}

async function measureUpload(onProgress) {
  const data = new Uint8Array(UPLOAD_CHUNK_BYTES);

  // Web Crypto accepts at most 65,536 bytes per getRandomValues call.
  // Fill the payload in chunks so the upload phase works in all browsers.
  const CRYPTO_CHUNK_SIZE = 65536;
  for (let offset = 0; offset < data.length; offset += CRYPTO_CHUNK_SIZE) {
    crypto.getRandomValues(data.subarray(offset, Math.min(offset + CRYPTO_CHUNK_SIZE, data.length)));
  }

  const blob = new Blob([data]);

  const start = performance.now();
  let uploaded = 0;

  while (performance.now() - start < TEST_DURATION_MS) {
    const response = await fetch(UPLOAD_URL + '?r=' + Math.random(), {
      method: 'POST',
      body: blob,
      cache: 'no-store',
    });
    ensureSuccessfulResponse(response, 'Upload');
    uploaded += blob.size;

    const elapsedMs = performance.now() - start;
    const elapsedSeconds = Math.max(elapsedMs / 1000, 0.001);
    const mbps = ((uploaded * 8) / 1e6) / elapsedSeconds;
    onProgress(Math.round(mbps * 10) / 10, Math.min((elapsedMs / TEST_DURATION_MS) * 100, 100));
  }

  const elapsed = (performance.now() - start) / 1000;
  const mbps = Math.round(((uploaded * 8) / 1e6 / elapsed) * 10) / 10;
  onProgress(mbps, 100);
  return mbps;
}

/* ─────────────────────────────────────────
   GAUGE COMPONENT
───────────────────────────────────────── */
function Gauge({ value, label, color, progress, running }) {
  const max     = value > 500 ? 1000 : 500;
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
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const tickAngle = trackStart + i * 27;
    return {
      inner: polarToXY(tickAngle, 66),
      outer: polarToXY(tickAngle, 73),
      active: i / 10 <= pct,
    };
  });

  return (
    <div className={`gauge-wrap ${running ? 'is-running' : ''}`}>
      <svg viewBox="0 0 200 200" className="gauge-svg">
        <defs>
          <linearGradient id="speedGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {/* Track */}
        <path
          d={arcPath(trackStart, trackEnd, r)}
          fill="none"
          stroke="rgba(148,163,184,0.16)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Fill */}
        {value > 0 && (
          <path
            d={arcPath(trackStart, fillEnd, r)}
            fill="none"
            stroke="url(#speedGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        )}
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.inner.x}
            y1={tick.inner.y}
            x2={tick.outer.x}
            y2={tick.outer.y}
            stroke={tick.active ? color : 'rgba(148,163,184,0.28)'}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
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
        <span className="gauge-kicker">{label}</span>
        <span className="gauge-number">{value > 0 ? value.toFixed(1) : '0'}</span>
        <span className="gauge-unit">Mbps</span>
      </div>
      <div className="gauge-scale"><span>0</span><span>{max / 2}</span><span>{max}+</span></div>
      {running && <div className="gauge-live"><span /> Live measurement · {Math.round(progress)}%</div>}
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
  const [testProgress, setTestProgress] = useState(0);
  const [networkInfo, setNetworkInfo] = useState({
    shortName: '—',
    provider: '—',
    ip: '—',
    city: '—',
  });
  const running = useRef(false);

  const fetchNetworkInfo = useCallback(async () => {
    try {
      const response = await fetch('https://speed.cloudflare.com/meta', { cache: 'no-store' });
      ensureSuccessfulResponse(response, 'Network information');
      const data = await response.json();
      const provider = data.asOrganization || (data.asn ? `AS${data.asn}` : 'Internet Provider');
      const shortName = provider.split(/\s+/).slice(0, 2).join(' ');

      setNetworkInfo({
        shortName,
        provider,
        ip: data.clientIp || 'IP unavailable',
        city: data.city || data.country || 'Location unavailable',
      });
    } catch (_) {
      setNetworkInfo({
        shortName: 'Unavailable',
        provider: 'Unavailable',
        ip: 'IP unavailable',
        city: 'Location unavailable',
      });
    }
  }, []);

  const reset = () => {
    setPhase('idle');
    setPing(0);
    setDownload(0);
    setUpload(0);
    setError('');
    setTestProgress(0);
    setNetworkInfo({ shortName: '—', provider: '—', ip: '—', city: '—' });
  };

  const runTest = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    reset();
    fetchNetworkInfo();

    try {
      // 1. Ping
      setPhase('ping');
      const p = await measurePing(progress => setTestProgress(progress * 0.1));
      setPing(p);
      setTestProgress(10);

      // 2. Download
      setPhase('download');
      const downloadSpeed = await measureDownload((value, progress) => {
        setDownload(value);
        setTestProgress(10 + progress * 0.45);
      });
      setDownload(downloadSpeed);
      setTestProgress(55);

      // 3. Upload
      setPhase('upload');
      const uploadSpeed = await measureUpload((value, progress) => {
        setUpload(value);
        setTestProgress(55 + progress * 0.45);
      });
      setUpload(uploadSpeed);

      setTestProgress(100);
      setPhase('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Test failed. Please check your connection and try again.');
      setPhase('idle');
    } finally {
      running.current = false;
    }
  }, [fetchNetworkInfo]);

  const isRunning = phase !== 'idle' && phase !== 'done';
  const isDone    = phase === 'done';
  const currentSpeed = phase === 'upload' ? upload : phase === 'download' ? download : 0;
  const currentLabel = phase === 'upload' ? 'Upload speed' : isDone ? 'Test complete' : 'Download speed';

  const connectionRating = download >= 300
    ? 'Exceptional connection'
    : download >= 100
      ? 'Excellent connection'
      : download >= 50
        ? 'Fast connection'
        : download > 0
          ? 'Everyday connection'
          : '';

  const phaseLabel = {
    idle:     'Ready for a full connection test',
    ping:     'Finding the nearest test server',
    download: 'Measuring sustained download performance',
    upload:   'Measuring sustained upload performance',
    done:     'Your connection results are ready',
  };

  return (
    <div className={`st-widget ${isDone ? 'completed' : ''}`}>

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

      <div className="st-speed-results">
        <div className={`st-speed-result download ${phase === 'download' ? 'active' : ''}`}>
          <div className="st-speed-result-label"><i className="fas fa-arrow-circle-down" /> Download <span>Mbps</span></div>
          <div className="st-speed-result-value">{download > 0 ? download.toFixed(2) : '—'}</div>
        </div>
        <div className={`st-speed-result upload ${phase === 'upload' ? 'active' : ''}`}>
          <div className="st-speed-result-label"><i className="fas fa-arrow-circle-up" /> Upload <span>Mbps</span></div>
          <div className="st-speed-result-value">{upload > 0 ? upload.toFixed(2) : '—'}</div>
        </div>
      </div>

      <div className="st-connection-details">
        <div><span>Ping</span><strong><i className="fas fa-bolt" /> {ping > 0 ? ping : '—'} <small>ms</small></strong></div>
        <div className="st-network-detail">
          <span>Your network</span>
          <strong><i className="fas fa-user" /> {networkInfo.shortName}</strong>
          <small>{networkInfo.ip}</small>
        </div>
        <div className="st-network-detail">
          <span>Internet provider</span>
          <strong><i className="fas fa-building" /> {networkInfo.provider}</strong>
          <small>{networkInfo.city}</small>
        </div>
      </div>

      <div className="st-stage">
        <Gauge
          value={currentSpeed}
          label={currentLabel}
          color={phase === 'upload' ? '#8b5cf6' : '#22d3ee'}
          progress={testProgress}
          running={isRunning && phase !== 'ping'}
        />
      </div>

      <div className="st-progress-panel">
        <div className="st-progress-copy">
          <span>{phaseLabel[phase]}</span>
          <strong>{Math.round(testProgress)}%</strong>
        </div>
        <div className="st-progress-track">
          <div className="st-progress-fill" style={{ width: `${testProgress}%` }} />
        </div>
      </div>

      <div className="st-control-row">
        <button
          className={`st-go-btn ${isRunning ? 'running' : ''} ${isDone ? 'done' : ''}`}
          onClick={runTest}
          disabled={isRunning}
        >
          {isRunning ? <span className="st-spinner" /> : <i className={`fas ${isDone ? 'fa-redo' : 'fa-play'}`} />}
          <span>{isRunning ? 'Testing' : isDone ? 'Test Again' : 'Start Speed Test'}</span>
        </button>
      </div>

      {isDone && (
        <div className="st-result-summary">
          <div className="st-result-check"><i className="fas fa-check" /></div>
          <div><span>Test complete</span><strong>{connectionRating}</strong></div>
          <i className="fas fa-signal st-result-signal" />
        </div>
      )}

      {error && <p className="st-error"><i className="fas fa-exclamation-triangle"></i> {error}</p>}

      <div className="st-server-strip">
        <span><i className="fas fa-server" /> Cloudflare Global Network</span>
        <span><i className="fas fa-layer-group" /> Multi-sample test</span>
        <span><i className="fas fa-shield-alt" /> Secure connection</span>
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
    speed: '60 Mbps', label: 'Basic', title: 'Light Usage',
    uses: ['Web browsing', 'Social media', 'SD video streaming', 'Video calls (1 device)'],
  },
  {
    speed: '100 Mbps', label: 'Standard', title: 'Family & WFH',
    uses: ['HD / 4K streaming', 'Online gaming', 'Video conferencing', 'Multiple devices'],
  },
  {
    speed: '300+ Mbps', label: 'Premium', title: 'Power Users',
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
