import { useState } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './Contact.css';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="contact-hero">
        <div data-aos="fade-up">
          <span className="section-tag">Contact Us</span>
          <h1>Let's Get You<br />Connected</h1>
          <p>Have a question or ready to subscribe? Our team is here to help.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-inner">

          {/* Info */}
          <div className="contact-info" data-aos="fade-right">
            <h2>Get in Touch</h2>
            <p>
              Whether you want to subscribe, upgrade your plan, or just have a question —
              we're always happy to hear from you.
            </p>

            <div className="contact-info-items">
              {[
                { icon: 'fas fa-map-marker-alt', label: 'Address',        value: 'Sangamwadi, Pune — 411003' },
                { icon: 'fas fa-phone-alt',      label: 'Phone',          value: '+91 75845 26824' },
                { icon: 'fas fa-envelope',       label: 'Email',          value: 'info@harmonynet.in' },
                { icon: 'fas fa-headset',        label: 'Support',        value: '24/7 Technical Support' },
                { icon: 'fas fa-clock',          label: 'Office Hours',   value: 'Mon–Sat: 10am – 7pm' },
              ].map((item, i) => (
                <div className="contact-info-item" key={i}>
                  <div className="contact-info-icon"><i className={item.icon}></i></div>
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-socials">
              <a href="https://facebook.com"  className="contact-social" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com"   className="contact-social" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" className="contact-social" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com"  className="contact-social" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card" data-aos="fade-left">
            <h3>Send Us a Message</h3>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '3rem', color: '#00d4ff', marginBottom: 16 }}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3 style={{ color: '#fff', marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
                  We'll get back to you within 24 hours.
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
                    <label>Mobile Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select required>
                    <option value="">Select a topic</option>
                    <option>New Connection</option>
                    <option>Plan Upgrade</option>
                    <option>Technical Support</option>
                    <option>Billing Enquiry</option>
                    <option>Business Internet</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Tell us how we can help..." required></textarea>
                </div>
                <button type="submit" className="contact-submit">
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="map-section">
        <div className="map-wrap" data-aos="fade-up">
          <iframe
            title="Harmony Internet Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173522636!2d73.87432!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c080b3b3b3b3%3A0x0!2sSangamwadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Contact;
