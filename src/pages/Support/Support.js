import { useState, useRef } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './Support.css';

const faqs = [
  { q: 'How do I reset my Wi-Fi router?',          a: 'Press and hold the reset button on the back of your router for 10 seconds until the lights blink. Wait 2 minutes for it to restart. Your default credentials are on the label on the router.' },
  { q: 'Why is my internet slow?',                  a: 'Check if multiple devices are using bandwidth simultaneously. Try restarting your router. If the issue persists, contact our 24x7x365 support team and we will run a line test remotely.' },
  { q: 'How do I upgrade my plan?',                 a: 'Call our support line or raise a ticket below. Plan upgrades are processed within 24 hours and take effect from the next billing cycle.' },
  { q: 'What is my Customer ID?',                   a: 'Your Customer ID is in the format HI-XXXX-XXXX and can be found on your welcome email, invoice, or by calling our support team.' },
  { q: 'How do I pay my bill?',                     a: 'Click "Pay Bill" in the navigation bar. Enter your mobile number or Customer ID to fetch your bill and pay securely via Razorpay.' },
  { q: 'What is the installation process?',         a: 'After subscription, our technician will visit within 24 hours. Installation typically takes 1-2 hours. We will call you to confirm the appointment time.' },
  { q: 'Do you offer a static IP address?',         a: 'Yes, static IP is included in Standard and Premium plans. For Basic plan customers, it can be added for a small monthly fee.' },
  { q: 'What is your refund policy?',               a: 'We offer a 7-day money-back guarantee for new customers. If you are not satisfied, contact us within 7 days of installation for a full refund.' },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(p => !p)}>
        {faq.q}
        <i className="fas fa-plus"></i>
      </button>
      <div
        className="faq-answer"
        style={{ height: open ? contentRef.current?.scrollHeight + 'px' : '0px' }}
      >
        <div className="faq-answer-inner" ref={contentRef}>
          {faq.a}
        </div>
      </div>
    </div>
  );
}

function Support() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="support-hero">
        {/* Background image */}
        <img
          src="/IMG_3468.JPEG"
          alt=""
          className="support-hero-bg"
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div className="support-hero-overlay" />

        <div data-aos="fade-up">
          <span className="section-tag">Help Center</span>
          <h1>How Can We<br />Help You?</h1>
          <p>Our expert support team is available 24x7x365 to resolve any connectivity issues.</p>
        </div>
      </section>

      {/* Support Channels */}
      <section className="support-channels">
        <div className="channels-grid">
          {[
            { icon: 'fas fa-phone-alt', color: '#00d4ff', title: '24x7x365 Phone Support', desc: 'Speak directly with a network engineer.', link: 'tel:+917584526824', linkLabel: '+91 75845 26824' },
            { icon: 'fas fa-envelope',  color: '#0072ff', title: 'Email Support',       desc: 'Get a response within 2 hours.', link: 'mailto:support@harmonynet.in', linkLabel: 'support@harmonynet.in' },
            { icon: 'fas fa-comments',  color: '#7c3aed', title: 'Live Chat',           desc: 'Chat with us in real-time (coming soon).', link: '#', linkLabel: 'Start Chat' },
          ].map((ch, i) => (
            <div className="channel-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="channel-icon" style={{ background: `${ch.color}15`, border: `1px solid ${ch.color}25`, color: ch.color }}>
                <i className={ch.icon}></i>
              </div>
              <h3>{ch.title}</h3>
              <p>{ch.desc}</p>
              <a href={ch.link}>{ch.linkLabel}</a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">FAQ</span>
          <h2>Frequently Asked<br />Questions</h2>
        </div>
        <div className="faq-accordion">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </section>

      {/* Raise Ticket */}
      <section className="ticket-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Support Ticket</span>
          <h2>Raise a Ticket</h2>
          <p>Can't find your answer? Submit a ticket and we'll get back to you within 2 hours.</p>
        </div>
        <div className="ticket-form-wrap" data-aos="fade-up">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '3rem', color: '#00d4ff', marginBottom: 16 }}>
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 style={{ color: '#fff', marginBottom: 8 }}>Ticket Submitted!</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
                We'll get back to you within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Customer ID</label>
                  <input type="text" placeholder="HI-XXXX-XXXX" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div className="form-group">
                  <label>Issue Type</label>
                  <select required>
                    <option value="">Select issue</option>
                    <option>Slow Speed</option>
                    <option>No Connectivity</option>
                    <option>Billing Issue</option>
                    <option>Plan Upgrade</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Describe Your Issue</label>
                <textarea placeholder="Please describe your issue in detail..." required></textarea>
              </div>
              <button type="submit" className="ticket-submit">
                <i className="fas fa-paper-plane"></i> Submit Ticket
              </button>
            </form>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

export default Support;
