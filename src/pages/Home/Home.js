import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero/Hero';
import PricingCard from '../../components/PricingCard/PricingCard';
import AnimatedCounter from '../../components/AnimatedCounter/AnimatedCounter';
import './Home.css';

/* ── Stats — numeric target + display config ── */
const stats = [
  { target: 500,  suffix: '+',  decimals: 0, label: 'Happy Customers',   icon: 'fas fa-users' },
  { target: 99.9, suffix: '%',  decimals: 1, label: 'Uptime Guarantee',  icon: 'fas fa-shield-alt' },
  { target: 24,   suffix: '/7', decimals: 0, label: 'Technical Support', icon: 'fas fa-headset' },
  { target: 10,   suffix: '+',  decimals: 0, label: 'Years of Service',  icon: 'fas fa-award' },
];

/* ── Features — use a1/a2/a3 images ── */
const features = [
  {
    image: '/a1.jpg',
    icon: 'fas fa-bolt',
    title: 'Ultra-Fast Fiber',
    desc: 'Speeds up to 1 Gbps via our dedicated fiber optic backbone — zero throttling, ever. Stream, game, and work without limits.',
    tag: 'Up to 1 Gbps',
  },
  {
    image: '/a2.jpg',
    icon: 'fas fa-shield-alt',
    title: '99.9% Uptime SLA',
    desc: 'Redundant infrastructure with automatic failover ensures your connection never drops — backed by a written SLA guarantee.',
    tag: 'SLA Backed',
  },
  {
    image: '/a3.jpg',
    icon: 'fas fa-headset',
    title: '24/7 Expert Support',
    desc: 'Real engineers, not bots. Our team resolves issues in minutes, not days — available round the clock, every day of the year.',
    tag: 'Always Available',
  },
];

/* ── Why choose us cards ── */
const whyCards = [
  { icon: 'fas fa-network-wired', title: 'Dedicated Bandwidth',  desc: 'Your bandwidth is yours alone. No sharing, no slowdowns during peak hours.' },
  { icon: 'fas fa-tools',         title: 'Free Installation',    desc: 'Professional installation by certified technicians within 24 hours of signup.' },
  { icon: 'fas fa-rupee-sign',    title: 'No Hidden Charges',    desc: 'Transparent pricing with no setup fees, no hidden costs, no surprises.' },
];

/* ── Plans ── */
const plans = [
  {
    name: 'Basic',
    tagline: 'Perfect for light home use',
    icon: 'fas fa-home',
    speed: 50,
    monthlyPrice: 499,
    popular: false,
    features: [
      { label: '50 Mbps Download Speed', disabled: false },
      { label: 'Unlimited Data',          disabled: false },
      { label: 'Free Installation',       disabled: false },
      { label: 'Email Support',           disabled: false },
      { label: 'Static IP Address',       disabled: true  },
      { label: 'Priority Support',        disabled: true  },
    ],
  },
  {
    name: 'Standard',
    tagline: 'Best for families & WFH',
    icon: 'fas fa-bolt',
    speed: 100,
    monthlyPrice: 799,
    popular: true,
    features: [
      { label: '100 Mbps Download Speed', disabled: false },
      { label: 'Unlimited Data',           disabled: false },
      { label: 'Free Installation',        disabled: false },
      { label: '24/7 Phone Support',       disabled: false },
      { label: 'Static IP Address',        disabled: false },
      { label: 'Priority Support',         disabled: true  },
    ],
  },
  {
    name: 'Premium',
    tagline: 'For power users & gamers',
    icon: 'fas fa-rocket',
    speed: 200,
    monthlyPrice: 1299,
    popular: false,
    features: [
      { label: '200 Mbps Download Speed', disabled: false },
      { label: 'Unlimited Data',           disabled: false },
      { label: 'Free Installation',        disabled: false },
      { label: 'Priority 24/7 Support',    disabled: false },
      { label: 'Static IP Address',        disabled: false },
      { label: 'Free Wi-Fi Router',        disabled: false },
    ],
  },
];

/* ── Industries ── */
const industries = [
  { icon: 'fas fa-home',           label: 'Residential' },
  { icon: 'fas fa-building',       label: 'Commercial' },
  { icon: 'fas fa-hospital',       label: 'Healthcare' },
  { icon: 'fas fa-graduation-cap', label: 'Education' },
  { icon: 'fas fa-hotel',          label: 'Hospitality' },
  { icon: 'fas fa-industry',       label: 'Manufacturing' },
  { icon: 'fas fa-laptop-code',    label: 'IT Parks' },
  { icon: 'fas fa-store',          label: 'Retail' },
  { icon: 'fas fa-university',     label: 'Banking' },
  { icon: 'fas fa-warehouse',      label: 'Warehouses' },
  { icon: 'fas fa-film',           label: 'Media' },
  { icon: 'fas fa-church',         label: 'Societies' },
];

function Home() {
  const [yearly, setYearly] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── HERO ── */}
      <Hero />

      {/* ── STATS BAND ── */}
      <div className="stats-band">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-item" key={i} data-aos="fade-up" data-aos-delay={i * 90}>
              <div className="stat-icon-wrap">
                <i className={s.icon}></i>
              </div>
              <div className="stat-number">
                <AnimatedCounter
                  target={s.target}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  duration={1800}
                />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES — image cards with a1/a2/a3 ── */}
      <section className="features-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Why Harmony</span>
          <h2>Built for the Modern World</h2>
          <p>Everything you need from an internet provider — and nothing you don't.</p>
        </div>

        <div className="features-img-grid">
          {features.map((f, i) => (
            <div
              className="feature-img-card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="feature-img-wrap">
                <img src={f.image} alt={f.title} />
                <div className="feature-img-overlay">
                  <span className="feature-img-tag">{f.tag}</span>
                </div>
              </div>
              <div className="feature-img-body">
                <div className="feature-img-icon">
                  <i className={f.icon}></i>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Why cards row ── */}
        <div className="why-cards-row">
          {whyCards.map((c, i) => (
            <div className="why-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="why-card-icon"><i className={c.icon}></i></div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANS PREVIEW ── */}
      <section className="plans-preview">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Pricing</span>
          <h2>Simple, Transparent Pricing</h2>
          <p>No hidden fees. No contracts. Cancel anytime.</p>
        </div>

        <div className="plans-toggle" data-aos="fade-up">
          <span className={`toggle-label ${!yearly ? 'active' : ''}`}>Monthly</span>
          <div
            className={`toggle-switch ${yearly ? 'on' : ''}`}
            onClick={() => setYearly(p => !p)}
            role="switch"
            aria-checked={yearly}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setYearly(p => !p)}
          >
            <div className="toggle-knob" />
          </div>
          <span className={`toggle-label ${yearly ? 'active' : ''}`}>Yearly</span>
          {yearly && <span className="yearly-badge">2 Months Free</span>}
        </div>

        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <PricingCard plan={plan} yearly={yearly} />
            </div>
          ))}
        </div>

        <div className="plans-cta" data-aos="fade-up">
          <p>Need a custom plan for your business?</p>
          <Link to="/plans" className="btn-ghost">
            View All Plans <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="industries-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Who We Serve</span>
          <h2>Connecting Every Industry</h2>
        </div>
        <div className="industries-track-wrap">
          <div className="industries-track">
            {[...industries, ...industries].map((item, i) => (
              <div className="industry-pill" key={i}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div data-aos="fade-up">
          <h2>Ready for Infinite Connectivity?</h2>
          <p>Join 500+ customers who trust Harmony for their internet needs.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn-primary">
              Get Connected <i className="fas fa-arrow-right"></i>
            </Link>
            <Link to="/plans" className="btn-ghost">
              View Plans
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Home;
