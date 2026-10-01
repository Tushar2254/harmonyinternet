import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './Plans.css';

/* ── Speed tabs ── */
const speedTabs = [
  { label: '60 Mbps',  sublabel: 'Unlimited', speed: 50  },
  { label: '100 Mbps', sublabel: 'Unlimited', speed: 100 },
  { label: '200 Mbps', sublabel: 'Unlimited', speed: 200 },
  { label: '300 Mbps', sublabel: 'Unlimited', speed: 300 },
  { label: '400 Mbps', sublabel: 'Unlimited', speed: 400 },
];

/* ── Duration plans per speed ── */
const durationPlans = {
  50: [
    { days: 30,  total: 599,  perMonth: 599,  popular: false, bestValue: false,
      features: ['60 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Unlimited OTT Compatibility'] },
    { days: 90,  total: 1699, perMonth: 566,  popular: true,  bestValue: false,
      features: ['60 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Unlimited OTT Compatibility'] },
    { days: 180, total: 3199, perMonth: 533,  popular: false, bestValue: false,
      features: ['60 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
    { days: 360, total: 5999, perMonth: 499,  popular: false, bestValue: true,
      features: ['60 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
  ],
  100: [
    { days: 30,  total: 899,  perMonth: 899,  popular: false, bestValue: false,
      features: ['100 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Unlimited OTT Compatibility'] },
    { days: 90,  total: 2499, perMonth: 833,  popular: true,  bestValue: false,
      features: ['100 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Unlimited OTT Compatibility'] },
    { days: 180, total: 4699, perMonth: 783,  popular: false, bestValue: false,
      features: ['100 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
    { days: 360, total: 8999, perMonth: 749,  popular: false, bestValue: true,
      features: ['100 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
  ],
  200: [
    { days: 30,  total: 1299, perMonth: 1299, popular: false, bestValue: false,
      features: ['200 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Static IP Address'] },
    { days: 90,  total: 3699, perMonth: 1233, popular: true,  bestValue: false,
      features: ['200 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Static IP Address'] },
    { days: 180, total: 6999, perMonth: 1166, popular: false, bestValue: false,
      features: ['200 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
    { days: 360, total: 12999,perMonth: 1083, popular: false, bestValue: true,
      features: ['200 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
  ],
  300: [
    { days: 30,  total: 1799, perMonth: 1799, popular: false, bestValue: false,
      features: ['300 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Static IP Address'] },
    { days: 90,  total: 4999, perMonth: 1666, popular: true,  bestValue: false,
      features: ['300 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Static IP Address'] },
    { days: 180, total: 9499, perMonth: 1583, popular: false, bestValue: false,
      features: ['300 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
    { days: 360, total: 17999,perMonth: 1499, popular: false, bestValue: true,
      features: ['300 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
  ],
  400: [
    { days: 30,  total: 2299, perMonth: 2299, popular: false, bestValue: false,
      features: ['400 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Static IP Address'] },
    { days: 90,  total: 6499, perMonth: 2166, popular: true,  bestValue: false,
      features: ['400 Mbps Unlimited Data','FREE Installation','4-Hour Activation','₹10/Hour Downtime Insurance','100% Fiber Internet','24×7 AI NOC Support','Static IP Address'] },
    { days: 180, total: 12499,perMonth: 2083, popular: false, bestValue: false,
      features: ['400 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
    { days: 360, total: 23999,perMonth: 1999, popular: false, bestValue: true,
      features: ['400 Mbps Unlimited Data','FREE Dual Band Router','FREE Installation','₹10/Hour Downtime Insurance','100% Fiber Internet','99.95% Uptime','24×7 AI NOC Support'] },
  ],
};

const businessPlans = [
  { name: 'Business 500', speed: '500 Mbps', price: '₹2,499/mo', icon: 'fas fa-building',      color: '#059669' },
  { name: 'Enterprise 1G', speed: '1 Gbps',  price: '₹4,999/mo', icon: 'fas fa-server',        color: '#0072ff' },
  { name: 'Leased Line',   speed: 'Custom',  price: 'Custom',     icon: 'fas fa-network-wired', color: '#7c3aed' },
];

const comparison = [
  { feature: 'Download Speed',    basic: '60 Mbps',   standard: '100 Mbps',  premium: '200 Mbps' },
  { feature: 'Upload Speed',      basic: '25 Mbps',   standard: '60 Mbps',   premium: '100 Mbps' },
  { feature: 'Data Limit',        basic: 'Unlimited', standard: 'Unlimited', premium: 'Unlimited' },
  { feature: 'Static IP',         basic: '✗',         standard: '✓',         premium: '✓' },
  { feature: 'Support',           basic: 'Email',     standard: '24x7x365 Phone',premium: 'Priority' },
  { feature: 'Free Router',       basic: '✗',         standard: '✗',         premium: '✓' },
  { feature: 'Installation',      basic: 'Free',      standard: 'Free',      premium: 'Free' },
  { feature: 'Contract',          basic: 'None',      standard: 'None',      premium: 'None' },
];

function Plans() {
  const [activeSpeed, setActiveSpeed] = useState(50);

  const plans = durationPlans[activeSpeed];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="plans-hero">
        <div className="plans-hero-poster-wrap">
          <img
            src="/Plans/ChatGPT Image Sep 1, 2026, 03_22_06 AM.png"
            alt="Harmony Internet Plans"
            className="plans-hero-bg"
          />
        </div>
        <div className="plans-hero-overlay" />
        <div data-aos="fade-up">
          {/* <span className="section-tag">Pricing</span> */}
          
          
        </div>
      </section>

      {/* ── NEW: Speed tabs + Duration cards ── */}
      <section className="speed-plans-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Home Plans</span>
          <h2>Choose Your Speed</h2>
          <p>Select a speed and pick the duration that saves you the most.</p>
        </div>

        
        {/* Speed tabs */}
        <div className="speed-tabs" data-aos="fade-up">
          {speedTabs.map(tab => (
            <button
              key={tab.speed}
              className={`speed-tab ${activeSpeed === tab.speed ? 'active' : ''}`}
              onClick={() => setActiveSpeed(tab.speed)}
            >
              <span className="speed-tab-mbps">{tab.label}</span>
              <span className="speed-tab-sub">{tab.sublabel}</span>
            </button>
          ))}
        </div>

        {/* Duration cards */}
        <div className="duration-cards">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`duration-card ${plan.popular ? 'dc-popular' : ''} ${plan.bestValue ? 'dc-best' : ''}`}
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              {plan.popular   && <div className="dc-badge dc-badge-popular">Most Popular</div>}
              {plan.bestValue && <div className="dc-badge dc-badge-best">Best Value</div>}

              <div className="dc-days">{plan.days} Days</div>
              <div className="dc-price">₹{plan.total.toLocaleString('en-IN')}</div>
              <div className="dc-per-month">₹{plan.perMonth.toLocaleString('en-IN')}/month</div>

              <ul className="dc-features">
                {plan.features.map((f, j) => (
                  <li key={j}>
                    <i className="fas fa-check" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="dc-btn">
                Buy Now
              </Link>
            </div>
          ))}
        </div><br />
        
        {/* GST notice */}
        <div className="gst-notice" data-aos="fade-up">
          <i className="fas fa-check-circle" />
          <span>All Plans are <strong>Unlimited</strong> &amp; Include <strong>GST</strong>. No Extra Charges.</span>
        </div>
      </section>

      {/* Business Plans */}
      <section className="business-plans-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Business Plans</span>
          <h2>For Businesses &amp; Enterprises</h2>
          <p>Dedicated bandwidth, SLA-backed uptime, and a dedicated account manager.</p>
        </div>
        <div className="business-plans-grid">
          {businessPlans.map((plan, i) => (
            <div className="business-plan-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="business-plan-icon" style={{ color: plan.color, background: `${plan.color}15`, borderColor: `${plan.color}25` }}>
                <i className={plan.icon}></i>
              </div>
              <h3>{plan.name}</h3>
              <div className="business-plan-speed" style={{ color: plan.color }}>{plan.speed}</div>
              <div className="business-plan-price">{plan.price}</div>
              <Link to="/contact" className="btn-ghost" style={{ marginTop: 'auto', justifyContent: 'center' }}>
                Get Quote <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Compare</span>
          <h2>Plan Comparison</h2>
        </div>
        <div className="comparison-table-wrap" data-aos="fade-up">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>60 Mbps</th>
                <th className="popular-col">100 Mbps <span>Popular</span></th>
                <th>200 Mbps</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i}>
                  <td>{row.feature}</td>
                  <td>{row.basic}</td>
                  <td className="popular-col">{row.standard}</td>
                  <td>{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="plans-faq">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Questions</span>
          <h2>Common Questions</h2>
        </div>
        <div className="faq-grid" data-aos="fade-up">
          {[
            { q: 'Is there a contract?',           a: 'No contracts. All plans are month-to-month. You can cancel anytime without any penalty.' },
            { q: 'How fast is installation?',      a: 'We complete installation within 24 hours of subscription confirmation, at a time convenient for you.' },
            { q: 'What if my internet goes down?', a: 'Our 24x7x365 support team is always available. Most issues are resolved remotely within minutes.' },
            { q: 'Can I upgrade my plan?',         a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle.' },
          ].map((faq, i) => (
            <div className="faq-card" key={i}>
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

export default Plans;
