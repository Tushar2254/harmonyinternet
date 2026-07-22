import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PricingCard from '../../components/PricingCard/PricingCard';
import './Plans.css';

const plans = [
  {
    name: 'Basic',
    tagline: 'Light home use',
    icon: 'fas fa-home',
    speed: 50,
    monthlyPrice: 499,
    popular: false,
    features: [
      { label: '50 Mbps Download',    disabled: false },
      { label: 'Unlimited Data',       disabled: false },
      { label: 'Free Installation',    disabled: false },
      { label: 'Email Support',        disabled: false },
      { label: 'Static IP',            disabled: true  },
      { label: 'Priority Support',     disabled: true  },
      { label: 'Free Router',          disabled: true  },
    ],
  },
  {
    name: 'Standard',
    tagline: 'Families & WFH',
    icon: 'fas fa-bolt',
    speed: 100,
    monthlyPrice: 799,
    popular: true,
    features: [
      { label: '100 Mbps Download',   disabled: false },
      { label: 'Unlimited Data',       disabled: false },
      { label: 'Free Installation',    disabled: false },
      { label: '24/7 Phone Support',   disabled: false },
      { label: 'Static IP',            disabled: false },
      { label: 'Priority Support',     disabled: true  },
      { label: 'Free Router',          disabled: true  },
    ],
  },
  {
    name: 'Premium',
    tagline: 'Power users & gamers',
    icon: 'fas fa-rocket',
    speed: 200,
    monthlyPrice: 1299,
    popular: false,
    features: [
      { label: '200 Mbps Download',   disabled: false },
      { label: 'Unlimited Data',       disabled: false },
      { label: 'Free Installation',    disabled: false },
      { label: 'Priority 24/7 Support',disabled: false },
      { label: 'Static IP',            disabled: false },
      { label: 'Priority Support',     disabled: false },
      { label: 'Free Wi-Fi Router',    disabled: false },
    ],
  },
];

const businessPlans = [
  { name: 'Business 500', speed: '500 Mbps', price: '₹2,499/mo', icon: 'fas fa-building',      color: '#059669' },
  { name: 'Enterprise 1G', speed: '1 Gbps',  price: '₹4,999/mo', icon: 'fas fa-server',        color: '#0072ff' },
  { name: 'Leased Line',   speed: 'Custom',  price: 'Custom',     icon: 'fas fa-network-wired', color: '#7c3aed' },
];

const comparison = [
  { feature: 'Download Speed',    basic: '50 Mbps',   standard: '100 Mbps',  premium: '200 Mbps' },
  { feature: 'Upload Speed',      basic: '25 Mbps',   standard: '50 Mbps',   premium: '100 Mbps' },
  { feature: 'Data Limit',        basic: 'Unlimited', standard: 'Unlimited', premium: 'Unlimited' },
  { feature: 'Static IP',         basic: '✗',         standard: '✓',         premium: '✓' },
  { feature: 'Support',           basic: 'Email',     standard: '24/7 Phone',premium: 'Priority' },
  { feature: 'Free Router',       basic: '✗',         standard: '✗',         premium: '✓' },
  { feature: 'Installation',      basic: 'Free',      standard: 'Free',      premium: 'Free' },
  { feature: 'Contract',          basic: 'None',      standard: 'None',      premium: 'None' },
];

function Plans() {
  const [yearly, setYearly] = useState(false);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="plans-hero">
        <div data-aos="fade-up">
          <span className="section-tag">Pricing</span>
          <h1>Plans for Every<br />Connection Need</h1>
          <p>Simple, transparent pricing. No hidden fees. No contracts. Cancel anytime.</p>
        </div>
      </section>

      {/* Toggle */}
      <div className="plans-toggle-bar" data-aos="fade-up">
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

      {/* Home Plans */}
      <section className="plans-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Home Plans</span>
          <h2>For Homes &amp; Individuals</h2>
        </div>
        <div className="plans-grid-3">
          {plans.map((plan, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <PricingCard plan={plan} yearly={yearly} />
            </div>
          ))}
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
                <th>Basic</th>
                <th className="popular-col">Standard <span>Popular</span></th>
                <th>Premium</th>
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
            { q: 'What if my internet goes down?', a: 'Our 24/7 support team is always available. Most issues are resolved remotely within minutes.' },
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
