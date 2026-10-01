import { useRef, useEffect, useState } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './About.css';

const timeline = [
  { year: '2014', title: 'Founded',           desc: 'Harmony Internet was established in Pune with a mission to deliver affordable, high-speed internet.' },
  { year: '2016', title: 'First 100 Customers', desc: 'Reached our first milestone of 100 happy customers across Shivajinagar and surrounding areas.' },
  { year: '2018', title: 'Fiber Rollout',      desc: 'Launched our fiber optic network, delivering speeds up to 200 Mbps for the first time.' },
  { year: '2020', title: 'Business Division',  desc: 'Launched dedicated business internet packages including leased lines and managed services.' },
  { year: '2022', title: '5000+ Customers',     desc: 'Crossed 5000 active customers and expanded coverage to 15+ localities in Pune.' },
  { year: '2024', title: 'Gigabit Ready',      desc: 'Upgraded backbone to support 1 Gbps speeds. Launched 24x7x365 NOC monitoring center.' },
];

const team = [
  {
    name: 'Mr. Suraj Shinde',
    role: 'CEO',
    image: '/Team/suraj.JPG',
    description: 'Suraj Shinde has over 15 years of experience in the Security industry, leading innovative projects and teams.',
  },
   {
    name: 'Mr. Tushar Jadhav',
    role: 'Admin Officer',
    image: '/Team/tushar.PNG',
    description: 'Dedicated admin officer with a strong focus on client satisfaction and operational excellence.',
  },
  {
    name: 'Mr. Tukaram Ganjave',
    role: 'General Manager',
    image: '/Team/tukaram%20sir.png',
    description: 'Experienced admin officer ensuring smooth day-to-day operations across all sites.',
  },
  {
    name: 'Mrs. Namrata Bakre',
    role: 'HR Manager',
    image: '/Team/namrata.png',
    description: 'Mrs. Namrata leverages her expertise to develop effective strategies that drive growth and impactful solutions.',
  },
 
];

function About() {
  const videoRef    = useRef(null);
  const journeyRef  = useRef(null);
  const bgVideoRef  = useRef(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!journeyRef.current) return;
      const rect = journeyRef.current.getBoundingClientRect();
      const sectionMid = rect.top + rect.height / 2;
      const windowMid  = window.innerHeight / 2;
      setParallax((windowMid - sectionMid) * 0.25);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="about-hero">
        <video
          ref={videoRef}
          className="about-hero-video"
          src="/second_from_to_only_i_wan.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="about-hero-overlay" />
        <div data-aos="fade-up">
          <span className="section-tag">Our Story</span>
          <h1>Delivering Speed, Reliability <br />& Trust</h1>
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
              With over 10 years of experience and 5000+ satisfied customers, we are Pune's
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
      <section className="timeline-section" ref={journeyRef}>
        {/* Parallax video background */}
        <video
          ref={bgVideoRef}
          className="timeline-bg-video"
          src="/Journey.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ transform: `translateY(${parallax}px) scale(1.15)` }}
        />
        <div className="timeline-bg-overlay" />
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
              To be Pune's most trusted Class A Internet service provider — delivering infinite
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
              pricing with zero compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">The People Behind Harmony</span>
          <h2>Our Team</h2>
          <p>The experts behind Harmony's infinite connectivity.</p>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <article className="team-card" key={member.name} data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="team-photo-wrap">
                <img
                  className="team-photo"
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />
                <div className="team-description">
                  <p>{member.description}</p>
                </div>
              </div>
              <div className="team-details">
                <h3>{member.name}</h3>
                <span>{member.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

export default About;
