import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import services from '../../data/services';
import './Services.css';

function Services() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const startVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playbackRate = 0.65;
      if (video.readyState >= 1 && video.currentTime < 0.8) video.currentTime = 0.8;
      const playRequest = video.play();
      if (playRequest) playRequest.catch(() => {});
    };

    const resumeVideo = () => {
      if (!video.ended && document.visibilityState === 'visible') startVideo();
    };

    if (video.readyState >= 3) startVideo();
    video.addEventListener('loadeddata', startVideo);
    video.addEventListener('canplay', startVideo);
    video.addEventListener('pause', resumeVideo);
    document.addEventListener('visibilitychange', resumeVideo);
    window.addEventListener('focus', resumeVideo);

    return () => {
      video.removeEventListener('loadeddata', startVideo);
      video.removeEventListener('canplay', startVideo);
      video.removeEventListener('pause', resumeVideo);
      document.removeEventListener('visibilitychange', resumeVideo);
      window.removeEventListener('focus', resumeVideo);
    };
  }, []);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="services-hero">
        <video
          ref={videoRef}
          className="services-hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
        >
          <source src="/services-hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="services-hero-overlay" />

        <div data-aos="fade-up">
          <span className="section-tag">What We Offer</span>
          <h1>Complete Connectivity<br />Solutions</h1>
          <p>From home broadband to enterprise fiber — we have the right solution for every need.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">All Services</span>
          <h2>What We Offer</h2>
          <p>Click any service to explore in detail — features, benefits, and why Harmony Internet is the right choice.</p>
        </div>
        <div className="services-grid">
          {services.map((svc, i) => (
            <Link
              to={`/services/${svc.slug}`}
              className="service-card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 60}
              style={{ '--svc-color': svc.color, textDecoration: 'none' }}
            >
              <div className="service-card-icon" style={{ color: svc.color, background: `${svc.color}15`, borderColor: `${svc.color}25` }}>
                <i className={svc.icon}></i>
              </div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
              <span className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </span>
            </Link>
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
