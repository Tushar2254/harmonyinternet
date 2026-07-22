import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './Services.css';

const services = [
  {
    icon: 'fas fa-home',
    title: 'Home Broadband',
    desc: 'Reliable high-speed internet for your home. Unlimited data with speeds up to 100 Mbps. Perfect for streaming, gaming, and remote work.',
    features: ['Up to 100 Mbps', 'Unlimited Data', 'Free Installation', 'Email Support'],
    color: '#00d4ff',
  },
  {
    icon: 'fas fa-bolt',
    title: 'Fiber Optic',
    desc: 'Ultra-fast fiber optic connections delivering speeds up to 1 Gbps. The future of internet connectivity, available today.',
    features: ['Up to 1 Gbps', 'Symmetric Upload/Download', 'Zero Throttling', '24/7 Support'],
    color: '#0072ff',
  },
  {
    icon: 'fas fa-network-wired',
    title: 'Leased Line',
    desc: 'Dedicated symmetric bandwidth for businesses requiring guaranteed, uncontended connectivity with SLA-backed uptime.',
    features: ['Dedicated Bandwidth', 'Symmetric Speed', 'SLA 99.99% Uptime', 'Managed Service'],
    color: '#7c3aed',
  },
  {
    icon: 'fas fa-building',
    title: 'Business Internet',
    desc: 'Enterprise-grade internet packages for offices, IT parks, and commercial spaces. Scalable from 100 Mbps to 10 Gbps.',
    features: ['Scalable Bandwidth', 'Multiple Static IPs', 'Priority Support', 'Account Manager'],
    color: '#059669',
  },
  {
    icon: 'fas fa-broadcast-tower',
    title: 'Wi-Fi Solutions',
    desc: 'Professional Wi-Fi installation and configuration for offices, hotels, housing societies, and large commercial spaces.',
    features: ['Site Survey', 'Enterprise APs', 'Coverage Guarantee', 'Ongoing Support'],
    color: '#d97706',
  },
  {
    icon: 'fas fa-headset',
    title: 'IT Support',
    desc: 'On-site and remote IT support services to keep your network and systems running at peak performance.',
    features: ['Remote Support', 'On-site Visits', 'Network Monitoring', 'Monthly Reports'],
    color: '#dc2626',
  },
];

function Services() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="services-hero">
        <div data-aos="fade-up">
          <span className="section-tag">What We Offer</span>
          <h1>Complete Connectivity<br />Solutions</h1>
          <p>From home broadband to enterprise fiber — we have the right solution for every need.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="services-grid">
          {services.map((svc, i) => (
            <div
              className="service-card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <div className="service-card-icon" style={{ color: svc.color, background: `${svc.color}15`, borderColor: `${svc.color}25` }}>
                <i className={svc.icon}></i>
              </div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
              <ul className="service-features">
                {svc.features.map((f, j) => (
                  <li key={j}>
                    <i className="fas fa-check" style={{ color: svc.color }}></i>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="service-link">
                Get a Quote <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div data-aos="fade-up">
          <h2>Not Sure Which Service<br />You Need?</h2>
          <p>Our team will assess your requirements and recommend the perfect solution.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
            <Link to="/contact" className="btn-primary">Talk to an Expert <i className="fas fa-arrow-right"></i></Link>
            <Link to="/plans"   className="btn-ghost">View Pricing</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Services;
