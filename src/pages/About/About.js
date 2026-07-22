import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './About.css';

const timeline = [
  { year: '2014', title: 'Founded',           desc: 'Harmony Internet was established in Pune with a mission to deliver affordable, high-speed internet.' },
  { year: '2016', title: 'First 100 Customers', desc: 'Reached our first milestone of 100 happy customers across Sangamwadi and surrounding areas.' },
  { year: '2018', title: 'Fiber Rollout',      desc: 'Launched our fiber optic network, delivering speeds up to 100 Mbps for the first time.' },
  { year: '2020', title: 'Business Division',  desc: 'Launched dedicated business internet packages including leased lines and managed services.' },
  { year: '2022', title: '500+ Customers',     desc: 'Crossed 500 active customers and expanded coverage to 15+ localities in Pune.' },
  { year: '2024', title: 'Gigabit Ready',      desc: 'Upgraded backbone to support 1 Gbps speeds. Launched 24/7 NOC monitoring center.' },
];

const team = [
  { name: 'Suraj Shinde',    role: 'CEO & Founder',    icon: 'fas fa-user-tie' },
  { name: 'Namrata Bakre',   role: 'HR Manager',       icon: 'fas fa-user' },
  { name: 'Tukaram Ganjave', role: 'Network Engineer', icon: 'fas fa-network-wired' },
  { name: 'Tushar Jadhav',   role: 'Support Lead',     icon: 'fas fa-headset' },
];

function About() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="about-hero">
        <div data-aos="fade-up">
          <span className="section-tag">Our Story</span>
          <h1>Connecting Pune,<br />One Home at a Time</h1>
          <p>
            Since 2014, Harmony Internet has been on a mission to make fast, reliable internet
            accessible to every home and business in Pune.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="story-section">
        <div className="story-inner">
          <div className="story-text" data-aos="fade-right">
            <span className="section-tag">Who We Are</span>
            <h2>Harmony Internet<br />Private Limited</h2>
            <p>
              We are a Pune-based Internet Service Provider committed to delivering premium
              fiber optic broadband with unmatched reliability and customer service.
            </p>
            <p>
              Our network is built on enterprise-grade infrastructure, ensuring that whether
              you're streaming 4K, working from home, or running a business — your connection
              never lets you down.
            </p>
            <p>
              With over 10 years of experience and 500+ satisfied customers, we are Pune's
              most trusted ISP for homes and businesses alike.
            </p>
          </div>
          <div className="story-visual" data-aos="fade-left">
            <div className="story-card">
              <div className="story-card-icon">
                <i className="fas fa-wifi"></i>
              </div>
              <h3>Infinite Connectivity</h3>
              <p>
                Our fiber optic network spans across Pune, delivering speeds up to 1 Gbps
                with 99.9% uptime guaranteed by SLA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Our Journey</span>
          <h2>A Decade of<br />Connectivity</h2>
        </div>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div className="timeline-item" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
              {i % 2 === 0 ? (
                <>
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-empty"></div>
                </>
              ) : (
                <>
                  <div className="timeline-empty"></div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Our Purpose</span>
          <h2>Vision & Mission</h2>
        </div>
        <div className="vision-grid">
          <div className="vision-card" data-aos="fade-right">
            <div className="vision-card-icon"><i className="fas fa-eye"></i></div>
            <h3>Our Vision</h3>
            <p>
              To be Pune's most trusted internet service provider — delivering infinite
              connectivity that empowers every home, business, and community to thrive
              in the digital age.
            </p>
          </div>
          <div className="vision-card" data-aos="fade-left">
            <div className="vision-card-icon"><i className="fas fa-bullseye"></i></div>
            <h3>Our Mission</h3>
            <p>
              To provide fast, reliable, and affordable internet access through cutting-edge
              fiber optic technology, backed by world-class customer support and transparent
              pricing — with zero compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">The People</span>
          <h2>Meet Our Team</h2>
          <p>The experts behind Harmony's infinite connectivity.</p>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="team-avatar">
                <i className={member.icon}></i>
              </div>
              <h3>{member.name}</h3>
              <span>{member.role}</span>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

export default About;
