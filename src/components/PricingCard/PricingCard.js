import { Link } from 'react-router-dom';
import './PricingCard.css';

function PricingCard({ plan, yearly }) {
  const price = yearly
    ? Math.round(plan.monthlyPrice * 10)   // 2 months free
    : plan.monthlyPrice;

  const period = yearly ? '/ year' : '/ month';

  return (
    <div className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
      {plan.popular && <span className="popular-badge">Most Popular</span>}

      <div className="plan-icon">
        <i className={plan.icon}></i>
      </div>

      <div className="plan-name">{plan.name}</div>
      <div className="plan-tagline">{plan.tagline}</div>

      <div className="plan-price-row">
        <span className="plan-price-currency">₹</span>
        <span className="plan-price">{price.toLocaleString('en-IN')}</span>
        <span className="plan-price-period">{period}</span>
      </div>

      <div className="plan-speed">{plan.speed} Mbps</div>

      <div className="plan-divider" />

      <ul className="plan-features">
        {plan.features.map((f, i) => (
          <li key={i} className={`plan-feature ${f.disabled ? 'disabled' : ''}`}>
            <i className={f.disabled ? 'fas fa-times' : 'fas fa-check'}></i>
            {f.label}
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        className={`plan-btn ${plan.popular ? 'primary' : 'ghost'}`}
      >
        Get Started <i className="fas fa-arrow-right"></i>
      </Link>
    </div>
  );
}

export default PricingCard;
