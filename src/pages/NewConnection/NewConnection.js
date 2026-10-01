import { useState } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './NewConnection.css';

const PHONE_NUMBER = '+91 7050101024';
const PHONE_LINK = 'tel:+917050101024';
const TOLL_FREE_NUMBER = '1800-120-7066';
const TOLL_FREE_LINK = 'tel:18001207066';
const WHATSAPP_LINK = 'https://wa.me/917050101024?text=Hello%20Harmony%20Internet%2C%20I%20would%20like%20to%20apply%20for%20a%20new%20connection.';

function NewConnection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <section className="nc-hero">
        <div className="nc-hero-orb nc-hero-orb-one" />
        <div className="nc-hero-orb nc-hero-orb-two" />
        <div className="nc-hero-inner" data-aos="fade-up">
          <span className="nc-eyebrow">Start Your Harmony Journey</span>
          <h1>Apply for a New Connection</h1>
          <p>Fast, reliable fiber internet for your home or business is only one step away.</p>
        </div>
      </section>

      <section className="nc-apply-section">
        <div className="nc-apply-card" data-aos="fade-up">
          <div className="nc-apply-heading">
            <span><i className="fas fa-wifi" /></span>
            <div>
              <h2>Get Connected</h2>
              <p>Share your details and our team will contact you shortly.</p>
            </div>
          </div>

          {submitted ? (
            <div className="nc-success" role="status">
              <i className="fas fa-check-circle" />
              <div>
                <strong>Application received!</strong>
                <span>Our connection team will get in touch with you soon.</span>
              </div>
              <button type="button" onClick={() => setSubmitted(false)}>Submit another</button>
            </div>
          ) : (
            <form className="nc-form" onSubmit={handleSubmit}>
              <label className="nc-field">
                <span>Location</span>
                <div className="nc-input-wrap">
                  <i className="fas fa-map-marker-alt" />
                  <input type="text" name="location" placeholder="Your area or location" required />
                </div>
              </label>

              <label className="nc-field">
                <span>Full Name</span>
                <div className="nc-input-wrap">
                  <i className="fas fa-user" />
                  <input type="text" name="name" placeholder="Your full name" autoComplete="name" required />
                </div>
              </label>

              <label className="nc-field">
                <span>Mobile Number</span>
                <div className="nc-input-wrap">
                  <i className="fas fa-phone-alt" />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Your 10-digit number"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit mobile number"
                    required
                  />
                </div>
              </label>

              <button className="nc-submit" type="submit">
                Apply Now <i className="fas fa-arrow-right" />
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="nc-contact-section">
        <div className="nc-contact-grid">
          <article className="nc-contact-card" data-aos="fade-right">
            <div className="nc-contact-icon"><i className="fas fa-phone-alt" /></div>
            <span className="nc-card-label">Talk to our team</span>
            <h2>Call Us</h2>
            <p>Our agents are ready to help you get a new broadband connection.</p>
            <div className="nc-call-actions">
              <a href={TOLL_FREE_LINK}><i className="fas fa-phone-alt" /> {TOLL_FREE_NUMBER}</a>
              <a href={PHONE_LINK}><i className="fas fa-phone-alt" /> {PHONE_NUMBER}</a>
            </div>
          </article>

          <article className="nc-contact-card nc-whatsapp-card" data-aos="fade-left">
            <div className="nc-contact-icon"><i className="fab fa-whatsapp" /></div>
            <span className="nc-card-label">Quick assistance</span>
            <h2>WhatsApp</h2>
            <p>Our team is available to assist you with your new broadband connection.</p>
            <a className="nc-whatsapp-button" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp" /> Click to Chat
            </a>
          </article>
        </div>
      </section>

      <section className="nc-chat-section">
        <div className="nc-chat-inner" data-aos="fade-up">
          <div>
            <span className="nc-card-label">Need help right now?</span>
            <h2>Chat on WhatsApp</h2>
            <p>Send us a message and let our team guide you to the right connection.</p>
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
            <i className="fab fa-whatsapp" /> Start a Conversation
            <i className="fas fa-arrow-right" />
          </a>
        </div>
      </section>
    </PageWrapper>
  );
}

export default NewConnection;
