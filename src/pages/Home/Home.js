import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero/Hero';
import AnimatedCounter from '../../components/AnimatedCounter/AnimatedCounter';
import ClientDock from '../../components/ClientDock/ClientDock';
import services from '../../data/services';
import './Home.css';

/* ── Stats ── */
const stats = [
  { target: 5000,  suffix: '+',  decimals: 0, label: 'Happy Customers',   icon: 'fas fa-users' },
  { target: 99.9, suffix: '%',  decimals: 1, label: 'Uptime Guarantee',  icon: 'fas fa-shield-alt' },
  { target: 24,   suffix: '/7', decimals: 0, label: 'Technical Support', icon: 'fas fa-headset' },
  { target: 10,   suffix: '+',  decimals: 0, label: 'Years of Service',  icon: 'fas fa-award' },
];

const serviceSlides = Array.from(
  { length: Math.ceil(services.length / 3) },
  (_, index) => services.slice(index * 3, index * 3 + 3)
);

/* ── Features — use a1/a2/a3 images ── */
const features = [
  {
    image: '/fiber.png',
    icon: 'fas fa-bolt',
    title: 'Ultra-Fast Fiber',
    desc: 'Speeds upto 1 Gbps via our dedicated fiber optic backbone - zero throttling, ever. Stream, game, and work without limits.',
    tag: 'Up to 1 Gbps',
  },
  {
    image: '/a2.jpg',
    icon: 'fas fa-shield-alt',
    title: '99.9% Uptime SLA',
    desc: 'Redundant infrastructure with automatic failover ensures your connection never drops - backed by a written SLA guarantee.',
    tag: 'SLA Backed',
  },
  {
    image: '/24_support.jpeg',
    icon: 'fas fa-headset',
    title: '24x7x365 Expert Support',
    desc: 'Real engineers, not bots. Our team resolves issues in minutes, not days - available round the clock, every day of the year.',
    tag: 'Always Available',
  },
];

/* ── OTT / TV channel logos ── */
const ottLogos = [
  { src: '/ott logo/jiohotstar-logo.webp',           alt: 'JioHotstar' },
  { src: '/ott logo/SonyLIV_2020.png',               alt: 'SonyLIV' },
  { src: '/ott logo/amazon-prime-logo-free-png.webp', alt: 'Prime Video' },
  { src: '/ott logo/zee5-movies-tv-shows-live-tv-originals-zee5-app-download-free-11562989787ccp8imbuyt.png', alt: 'ZEE5' },
  { src: '/ott logo/Epic_On_logo.png',               alt: 'EpicOn' },
  { src: '/ott logo/Hungama325x200-1.png',           alt: 'Hungama' },
  { src: '/ott logo/shemaro.jpg',                    alt: 'Shemaroo' },
  { src: '/ott logo/colors.jpg',                     alt: 'Colors' },
  { src: '/ott logo/SONY_SAB_SD_Logo_2022.png',      alt: 'Sony SAB' },
  { src: '/ott logo/Zee_TV-2018.png',                alt: 'ZEE TV' },
  { src: '/ott logo/starplus.jpg',                   alt: 'Star Plus' },
  { src: '/ott logo/starsports.jpg',                 alt: 'Star Sports' },
  { src: '/ott logo/CN.png',                         alt: 'Cartoon Network' },
  { src: '/ott logo/Aaj_tak_logo.png',               alt: 'Aaj Tak' },
  { src: '/ott logo/ABP_Majha_logo.svg',             alt: 'ABP Majha' },
  { src: '/ott logo/b4u-music-b4u-movies-television-channel-others.jpg', alt: 'B4U' },
  { src: '/ott logo/BrandAssets_Logos_01-Wordmark.jpg', alt: 'Netflix' },
  { src: '/ott logo/unnamed.png',                    alt: 'Channel' },
  { src: '/ott logo/images.jpg',                     alt: 'Channel' },
  { src: '/ott logo/YNOS374230.jpg',                 alt: 'Channel' },
  { src: '/ott logo/5f2402df9264e28fc74351acce84d98a.jpg', alt: 'Channel' },
  { src: '/ott logo/&pic.png',                       alt: 'And Pictures' },
];
/* ── Home page speed tabs ── */
const homeSpeeds = [50, 100, 200];

const homePlans = {
  50: [
    { days: 30,  total: 599,  perMonth: 599,  popular: false, bestValue: false,
      features: ['60 Mbps Unlimited Data','FREE Installation','4-Hour Activation','100% Fiber Internet','24×7 NOC Support','OTT Compatible'] },
    { days: 90,  total: 1699, perMonth: 566,  popular: true,  bestValue: false,
      features: ['60 Mbps Unlimited Data','FREE Installation','4-Hour Activation','100% Fiber Internet','24×7 NOC Support','OTT Compatible'] },
    { days: 180, total: 3199, perMonth: 533,  popular: false, bestValue: false,
      features: ['60 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','100% Fiber Internet','99.95% Uptime','24×7 NOC Support'] },
    { days: 360, total: 5999, perMonth: 499,  popular: false, bestValue: true,
      features: ['60 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','100% Fiber Internet','99.95% Uptime','24×7 NOC Support'] },
  ],
  100: [
    { days: 30,  total: 899,  perMonth: 899,  popular: false, bestValue: false,
      features: ['100 Mbps Unlimited Data','FREE Installation','4-Hour Activation','100% Fiber Internet','24×7 NOC Support','Static IP Address'] },
    { days: 90,  total: 2499, perMonth: 833,  popular: true,  bestValue: false,
      features: ['100 Mbps Unlimited Data','FREE Installation','4-Hour Activation','100% Fiber Internet','24×7 NOC Support','Static IP Address'] },
    { days: 180, total: 4699, perMonth: 783,  popular: false, bestValue: false,
      features: ['100 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','100% Fiber Internet','99.95% Uptime','24×7 NOC Support'] },
    { days: 360, total: 8999, perMonth: 749,  popular: false, bestValue: true,
      features: ['100 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','100% Fiber Internet','99.95% Uptime','24×7 NOC Support'] },
  ],
  200: [
    { days: 30,  total: 1299, perMonth: 1299, popular: false, bestValue: false,
      features: ['200 Mbps Unlimited Data','FREE Installation','4-Hour Activation','100% Fiber Internet','24×7 NOC Support','Static IP Address'] },
    { days: 90,  total: 3699, perMonth: 1233, popular: true,  bestValue: false,
      features: ['200 Mbps Unlimited Data','FREE Installation','4-Hour Activation','100% Fiber Internet','24×7 NOC Support','Static IP Address'] },
    { days: 180, total: 6999, perMonth: 1166, popular: false, bestValue: false,
      features: ['200 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','100% Fiber Internet','99.95% Uptime','24×7 NOC Support'] },
    { days: 360, total: 12999,perMonth: 1083, popular: false, bestValue: true,
      features: ['200 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','100% Fiber Internet','99.95% Uptime','24×7 NOC Support'] },
  ],
};

const whyCards = [
  { image: '/dedicated.png', icon: 'fas fa-network-wired', title: 'Dedicated Bandwidth',  desc: 'Your bandwidth is yours alone. No sharing, no slowdowns during peak hours.' },
  { image: '/Fiber Router installation.png', icon: 'fas fa-tools',          title: 'Free Installation',    desc: 'Professional installation by certified technicians within 24 hours of signup.' },
  { image: '/noHiddenCharges.png', icon: 'fas fa-rupee-sign',    title: 'No Hidden Charges',    desc: 'Transparent pricing with no setup fees, no hidden costs, no surprises.' },
];

const businessStrengths = [
  {
    number: '01',
    icon: 'fas fa-network-wired',
    title: 'Business Differentiators',
    // intro: 'A resilient network foundation engineered for dependable business connectivity.',
    items: [
      'Robust Dual Backhaul Connectivity',
      'Experienced NOC',
      'Experienced field team',
      'Sturdy and Secure Network Infrastructure',
      'Path Redundancy',
      'Link delivery within 8-10 days',
      'Cost effective, No hidden charges',
    ],
  },
  {
    number: '02',
    icon: 'fas fa-headset',
    title: 'Services Highlights',
    // intro: 'Proactive management and expert support across the complete network lifecycle.',
    items: [
      '24x7 monitoring system in Auto Mode',
      'Dedicated customer portal',
      'End-to-end delivery',
      'Network Planning, Design, Implementation Support',
      'Network Consulting',
      'Assured Upload and Download',
      'Link monitoring and timely updates',
    ],
  },
  {
    number: '03',
    icon: 'fas fa-rocket',
    title: 'Delivery Mechanism',
    // intro: 'A structured delivery process that moves smoothly from discovery to deployment.',
    items: [
      'Business Analysis',
      'System Analysis',
      'Network Architecture & Config Analysis',
      'Quality Assurance',
      'Seamless Deployment',
    ],
  },
];

/* ── Internet for Everyone use cases ── */
const useCases = [
  {
    image: '/Home/online learning.png',
    emoji: '📚',
    title: 'Online Learning',
    desc: 'Learning is more fun when internet never goes down.',
    color: '#6366f1',
  },
  {
    image: '/Home/work from home.png',
    emoji: '🏠',
    title: 'Work from Home',
    desc: 'Our dedicated 24×7 team ensures your Work/ business stays online.',
    color: '#10b981',
  },
  {
    image: '/Home/educational institute.jpg',
    emoji: '🏫',
    title: 'Educational Institutes',
    desc: 'Modern education requires a dedicated internet.',
    color: '#0891b2',
  },
  {
    image: '/Home/Entertainment.png',
    emoji: '🎬',
    title: 'Entertainment',
    desc: 'Zero buffering while you watch Movies or Series.',
    color: '#f59e0b',
  },
  {
    image: '/Home/live streaming.jpg',
    emoji: '📡',
    title: 'Live Streamers',
    desc: 'We have 1:1 bandwidth ratio for uploading large videos.',
    color: '#ec4899',
  },
  {
    image: '/Home/Gamer.png',
    emoji: '🎮',
    title: 'Gamers',
    desc: 'Dedicated Game Server Peering for Low Latency & Low Ping.',
    color: '#8b5cf6',
  },
];

/* ── Our Clients ticker ── */
const clientLogos = [
  { name: 'Harmony Client 1',  logo: '/clients/Picture1.png' },
  { name: 'Harmony Client 2',  logo: '/clients/Picture3.png' },
  { name: 'Harmony Client 3',  logo: '/clients/Picture4.png' },
  { name: 'Harmony Client 4',  logo: '/clients/Picture6.png' },
  { name: 'Harmony Client 5',  logo: '/clients/Picture7.png' },
  { name: 'Harmony Client 6',  logo: '/clients/Picture8.png' },
  { name: 'Harmony Client 7',  logo: '/clients/Picture9.png' },
  { name: 'Harmony Client 8',  logo: '/clients/Picture10.png' },
  { name: 'Harmony Client 9',  logo: '/clients/Picture11.png' },
  { name: 'Harmony Client 10', logo: '/clients/Picture12.png' },
  { name: 'Harmony Client 11', logo: '/clients/Picture13.png' },
  { name: 'Harmony Client 12', logo: '/clients/chetak.webp' },
  { name: 'Harmony Client 13', logo: '/clients/1630628949800.jpg' },
];

/* ── Reviews ── */
const reviews = [
  { text: 'The installation was quick and professional. The technician explained everything properly and the internet has been working smoothly.', name: 'Rahul', role: 'Working Professional', city: 'Pune', stars: 5 },
  { text: 'I was looking for a reliable internet connection for my work from home. Harmony Internet has been a great experience so far.', name: 'Sneha', role: 'IT Professional', city: 'Pune', stars: 5 },
  { text: 'The connection is fast and stable, especially during video calls and online meetings. Very happy with the service.', name: 'Amit', role: 'Business Owner', city: 'Pune', stars: 5 },
  { text: 'The installation team was very polite and completed the fiber connection neatly. The overall service has been excellent.', name: 'Priya', role: 'Home Maker', city: 'Pune', stars: 5 },
  { text: 'I use the internet every day for work, streaming and online meetings. The connection has been consistent and reliable.', name: 'Akshay', role: 'Software Engineer', city: 'Pune', stars: 5 },
  { text: 'Good internet speed and quick support whenever I need help. Overall, a very good experience with Harmony Internet.', name: 'Neha', role: 'College Student', city: 'Pune', stars: 5 },
  { text: 'I switched to Harmony Internet because I wanted a better fiber connection. The service and installation experience have been really good.', name: 'Saurabh', role: 'Entrepreneur', city: 'Pune', stars: 5 },
  { text: 'The fiber installation was neat and professional. I\'m happy with the speed and the overall quality of the connection.', name: 'Rohan', role: 'Freelancer', city: 'Pune', stars: 5 },
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
  const [activeSpeed, setActiveSpeed] = useState(50);
  const [serviceSlidePosition, setServiceSlidePosition] = useState(1);
  const [serviceSlideTransition, setServiceSlideTransition] = useState(true);

  const activeServiceSlide = (
    serviceSlidePosition - 1 + serviceSlides.length
  ) % serviceSlides.length;

  const loopedServiceSlides = [
    serviceSlides[serviceSlides.length - 1],
    ...serviceSlides,
    serviceSlides[0],
  ];

  useEffect(() => {
    const slideTimer = window.setTimeout(() => {
      setServiceSlideTransition(true);
      setServiceSlidePosition((current) => current + 1);
    }, 8000);

    return () => window.clearTimeout(slideTimer);
  }, [serviceSlidePosition]);

  const moveServices = (direction) => {
    setServiceSlideTransition(true);
    setServiceSlidePosition((current) => current + direction);
  };

  const finishServiceSlide = (event) => {
    if (event.target !== event.currentTarget) return;

    let resetPosition = null;

    if (serviceSlidePosition === serviceSlides.length + 1) resetPosition = 1;
    if (serviceSlidePosition === 0) resetPosition = serviceSlides.length;

    if (resetPosition !== null) {
      setServiceSlideTransition(false);
      setServiceSlidePosition(resetPosition);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setServiceSlideTransition(true));
      });
    }
  };

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

      {/* ── OTT & TV CHANNEL TICKER ── */}
      <section className="home-services-section">
        <div className="section-header home-services-header" data-aos="fade-up">
          <span className="section-tag home-heading-gloss">Our Services</span>
          <h2>Complete Connectivity Solutions</h2>
          <p>From home broadband to enterprise fiber — the right solution for every connection.</p>
        </div>

        <div className="home-services-viewport">
          <div
            className="home-services-track"
            style={{
              transform: `translateX(-${serviceSlidePosition * 100}%)`,
              transition: serviceSlideTransition ? undefined : 'none',
            }}
            onTransitionEnd={finishServiceSlide}
          >
            {loopedServiceSlides.map((slide, renderedIndex) => {
              const slideIndex = renderedIndex === 0
                ? serviceSlides.length - 1
                : renderedIndex === serviceSlides.length + 1
                  ? 0
                  : renderedIndex - 1;

              return (
              <div
                className="home-services-slide"
                key={`${renderedIndex}-${slideIndex}`}
                aria-hidden={serviceSlidePosition !== renderedIndex}
              >
                {slide.map((service, cardIndex) => {
                  const serviceNumber = slideIndex * 3 + cardIndex + 1;
                  return (
                    <Link
                      to={`/services/${service.slug}`}
                      className="home-service-card"
                      key={service.slug}
                      tabIndex={serviceSlidePosition === renderedIndex ? 0 : -1}
                      style={{ '--home-service-color': service.color }}
                    >
                      <div className="home-service-topline" />
                      <div className="home-service-card-head">
                        <div className="home-service-icon"><i className={service.icon} /></div>
                        <span className="home-service-number">{String(serviceNumber).padStart(2, '0')}</span>
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.desc}</p>
                      <span className="home-service-link">
                        Explore Service <i className="fas fa-arrow-right" />
                      </span>
                    </Link>
                  );
                })}
              </div>
              );
            })}
          </div>
        </div>

        <div className="home-services-controls">
          <button
            type="button"
            className="home-services-arrow"
            onClick={() => moveServices(-1)}
            aria-label="Show previous services"
          >
            <i className="fas fa-chevron-left" />
          </button>

          <div className="home-services-dots" aria-label="Choose a services slide">
            {serviceSlides.map((_, index) => (
            <button
              type="button"
              key={index}
              className={activeServiceSlide === index ? 'active' : ''}
              onClick={() => {
                setServiceSlideTransition(true);
                setServiceSlidePosition(index + 1);
              }}
              aria-label={`Show services ${index * 3 + 1} to ${Math.min(index * 3 + 3, services.length)}`}
              aria-current={activeServiceSlide === index ? 'true' : undefined}
            />
            ))}
          </div>

          <button
            type="button"
            className="home-services-arrow"
            onClick={() => moveServices(1)}
            aria-label="Show next services"
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>

        <div className="home-services-cta" data-aos="fade-up">
          <Link to="/services" className="btn-primary">
            View All Services <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </section>

      <div className="ott-section">
        <div className="ott-header" data-aos="fade-up">
          <span className="ott-label home-heading-gloss">
            <i className="fas fa-tv"></i> 1000+ Movies & Original Tv Shows.
          </span>
        </div>
        <div className="ott-track-wrap">
          {/* left fade */}
          <div className="ott-fade ott-fade-left" />
          <div className="ott-track">
            {/* duplicate array for seamless loop */}
            {[...ottLogos, ...ottLogos].map((logo, i) => (
              <div className="ott-logo-pill" key={i}>
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </div>
            ))}
          </div>
          {/* right fade */}
          <div className="ott-fade ott-fade-right" />
        </div>
      </div>

      {/* ── INTERNET FOR EVERYONE ── */}
      <section className="use-cases-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag home-heading-gloss">Internet for Everyone</span>
          <h2>Built for Every Lifestyle</h2>
          <p>Whether you stream, study, work, or game — Harmony Internet keeps you connected without compromise.</p>
        </div>
        <div className="use-cases-grid">
          {useCases.map((uc, i) => (
            <div
              key={i}
              className="use-case-card"
              data-aos="fade-up"
              data-aos-delay={i * 70}
              style={{ '--uc-color': uc.color }}
            >
              {/* Background image */}
              <div className="uc-img-wrap">
                <img src={uc.image} alt={uc.title} className="uc-img" />
                {/* Color overlay on hover */}
                <div className="uc-overlay" />
              </div>

              {/* Content over image */}
              <div className="uc-content">
                <div className="uc-emoji-badge">{uc.emoji}</div>
                <h4>{uc.title}</h4>
                <p>{uc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES — image cards with a1/a2/a3 ── */}
      <section className="features-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag home-heading-gloss">Why Harmony</span>
          <h2>Built for the Modern World</h2>
          <p>Everything you need from an internet provider - and nothing you don't.</p>
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
              {c.image && (
                <div className="why-card-img-wrap">
                  <img src={c.image} alt={c.title} className="why-card-img" />
                  <div className="why-card-img-overlay" />
                </div>
              )}
              <div className="why-card-body">
                <div className="why-card-icon"><i className={c.icon}></i></div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HAPPY CUSTOMERS REVIEWS ── */}
      <section className="harmony-edge-section">
        <div className="harmony-edge-orb harmony-edge-orb-one" aria-hidden="true" />
        <div className="harmony-edge-orb harmony-edge-orb-two" aria-hidden="true" />

        <div className="harmony-edge-inner">
          <div className="section-header harmony-edge-header" data-aos="fade-up">
            <span className="section-tag home-heading-gloss">The Harmony Advantage</span>
            <h2>Think Internet. <span>Think Harmony.</span></h2>
            {/* <p>Strong infrastructure, expert operations, and a proven delivery process—working together to keep your business connected.</p> */}
          </div>

          <div className="harmony-edge-grid">
            {businessStrengths.map((strength, i) => (
              <article
                className="harmony-edge-card"
                key={strength.title}
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                <div className="harmony-edge-card-top">
                  <div className="harmony-edge-icon"><i className={strength.icon} /></div>
                  <span className="harmony-edge-number">{strength.number}</span>
                </div>
                <h3>{strength.title}</h3>
                <ul className="harmony-edge-list">
                  {strength.items.map((item) => (
                    <li key={item}>
                      <span className="harmony-edge-check"><i className="fas fa-check" /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag home-heading-gloss">Happy Customers</span>
          <h2>What Our Customers Say</h2>
          <p>Real experiences from customers who count on Harmony Internet every day.</p>
        </div>

        <div className="reviews-ticker-wrap">
          <div className="reviews-fade reviews-fade-left" />
          <div className="reviews-track">
            {[...reviews, ...reviews].map((r, i) => (
              <div key={i} className="review-card">
                {/* Stars */}
                <div className="review-stars">
                  {[...Array(r.stars)].map((_, j) => (
                    <i key={j} className="fas fa-star" />
                  ))}
                </div>
                {/* Quote */}
                <p className="review-text">"{r.text}"</p>
                {/* Author */}
                <div className="review-author">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-role">{r.role} · {r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-fade reviews-fade-right" />
        </div>
      </section>

      {/* ── PLANS PREVIEW ── */}
      <section className="plans-preview">
        <div className="plans-preview-header" data-aos="fade-up">
          <div className="plans-preview-badge home-heading-gloss">
            <i className="fas fa-bolt" /> Pricing
          </div>
          <h2>Simple, Transparent Pricing</h2>
          <p>No hidden fees. No contracts. Choose your speed and duration.</p>
        </div>

        {/* GST notice */}
        <div className="hp-gst-notice" data-aos="fade-up">
          <i className="fas fa-check-circle" />
          <span>All Plans are <strong>Unlimited</strong> &amp; Include <strong>GST</strong>. No Extra Charges.</span>
        </div>

        {/* Speed selector tabs */}
        <div className="hp-speed-tabs" data-aos="fade-up">
          {homeSpeeds.map(s => (
            <button
              key={s}
              className={`hp-speed-tab ${activeSpeed === s ? 'active' : ''}`}
              onClick={() => setActiveSpeed(s)}
            >
              <span className="hp-tab-mbps">{s} Mbps</span>
              <span className="hp-tab-sub">Unlimited</span>
            </button>
          ))}
        </div>

        {/* Duration cards */}
        <div className="hp-duration-cards">
          {homePlans[activeSpeed].map((plan, i) => (
            <div
              key={i}
              className={`hp-card ${plan.popular ? 'hp-card-popular' : ''} ${plan.bestValue ? 'hp-card-best' : ''}`}
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              {plan.popular   && <div className="hp-badge hp-badge-popular">Most Popular</div>}
              {plan.bestValue && <div className="hp-badge hp-badge-best">Best Value</div>}

              <div className="hp-card-top">
                <div className="hp-days">{plan.days} Days</div>
                <div className="hp-price">₹{plan.total.toLocaleString('en-IN')}</div>
                <div className="hp-per-month">₹{plan.perMonth.toLocaleString('en-IN')}/month</div>
              </div>

              <ul className="hp-features">
                {plan.features.map((f, j) => (
                  <li key={j}><i className="fas fa-check" />{f}</li>
                ))}
              </ul>

              <Link to="/contact" className="hp-btn">Buy Now</Link>
            </div>
          ))}
        </div>

        <div className="plans-cta" data-aos="fade-up">
          <p>Need 300 Mbps, 400 Mbps or a business plan?</p>
          <Link to="/plans" className="btn-ghost">
            View All Plans <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* ── WHO WE SERVE + OUR CLIENTS (merged) ── */}
      <section className="serve-clients-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag home-heading-gloss">Who We Serve</span>
          <h2>Connecting Every Industry</h2>
          <p>Trusted by 5000+ happy customers across Pune — from homes to enterprises.</p>
        </div>

        {/* Industry pills ticker */}
        <div className="industries-track-wrap" data-aos="fade-up">
          <div className="industries-track">
            {[...industries, ...industries].map((item, i) => (
              <div className="industry-pill" key={i}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="serve-divider" data-aos="fade-up">
          <span className="home-heading-gloss"><i className="fas fa-handshake" /> Our Clients</span>
        </div>

        {/* Client logos — macOS Dock effect */}
        <div className="dock-outer">
          <ClientDock clients={clientLogos} />
        </div>
      </section>


      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <video
          className="cta-video"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          preload="metadata"
          onLoadedMetadata={(event) => {
            event.currentTarget.defaultPlaybackRate = 0.65;
            event.currentTarget.playbackRate = 0.65;
          }}
          aria-hidden="true"
        >
          <source src="/connect.mp4" type="video/mp4" />
        </video>
        <div className="cta-content" data-aos="fade-up">
          <h2><span className="cta-title-gloss home-heading-gloss">Ready for Infinite Connectivity?</span></h2>
          <p>Join 5000+ customers who trust Harmony for their internet needs.</p>
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
