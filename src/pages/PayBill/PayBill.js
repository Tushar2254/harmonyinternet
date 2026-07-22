import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './PayBill.css';

function PayBill() {
  const [step, setStep]         = useState('login');   // login | details | payment | success | error
  const [loginType, setLoginType] = useState('mobile'); // mobile | customerid
  const [loginValue, setLoginValue] = useState('');
  const [loading, setLoading]   = useState(false);
  const [customerData, setCustomerData] = useState(null);

  // Simulate API fetch
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginValue.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setCustomerData({
        name: 'Rahul Sharma',
        plan: 'Standard 100 Mbps',
        dueDate: '15 Jun 2026',
        amount: 799,
        customerId: 'HI-2024-0042',
        status: 'Due',
      });
      setLoading(false);
      setStep('details');
    }, 1500);
  };

  const handlePay = () => {
    setLoading(true);
    // Razorpay integration placeholder
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 2000);
  };

  return (
    <PageWrapper>
      <section className="paybill-section">
        <div className="paybill-container">

          <div className="paybill-header" data-aos="fade-up">
            <span className="section-tag">Bill Payment</span>
            <h1>Pay Your Bill</h1>
            <p>Quick, secure, and hassle-free bill payment.</p>
          </div>

          <AnimatePresence mode="wait">

            {/* STEP 1 — Login */}
            {step === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                className="paybill-card"
              >
                <div className="paybill-card-icon">
                  <i className="fas fa-user-circle"></i>
                </div>
                <h2>Customer Login</h2>
                <p>Enter your mobile number or Customer ID to fetch your bill details.</p>

                <div className="login-type-tabs">
                  <button
                    className={loginType === 'mobile' ? 'active' : ''}
                    onClick={() => setLoginType('mobile')}
                  >
                    <i className="fas fa-mobile-alt"></i> Mobile Number
                  </button>
                  <button
                    className={loginType === 'customerid' ? 'active' : ''}
                    onClick={() => setLoginType('customerid')}
                  >
                    <i className="fas fa-id-card"></i> Customer ID
                  </button>
                </div>

                <form onSubmit={handleLogin} className="paybill-form">
                  <div className="form-group">
                    <label>{loginType === 'mobile' ? 'Mobile Number' : 'Customer ID'}</label>
                    <input
                      type={loginType === 'mobile' ? 'tel' : 'text'}
                      placeholder={loginType === 'mobile' ? '+91 XXXXX XXXXX' : 'HI-XXXX-XXXX'}
                      value={loginValue}
                      onChange={e => setLoginValue(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="paybill-btn" disabled={loading}>
                    {loading ? (
                      <><i className="fas fa-spinner fa-spin"></i> Fetching...</>
                    ) : (
                      <><i className="fas fa-search"></i> Fetch Bill Details</>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2 — Bill Details */}
            {step === 'details' && customerData && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                className="paybill-card"
              >
                <div className="paybill-card-icon success">
                  <i className="fas fa-file-invoice"></i>
                </div>
                <h2>Bill Details</h2>

                <div className="bill-details">
                  <div className="bill-row">
                    <span>Customer Name</span>
                    <strong>{customerData.name}</strong>
                  </div>
                  <div className="bill-row">
                    <span>Customer ID</span>
                    <strong>{customerData.customerId}</strong>
                  </div>
                  <div className="bill-row">
                    <span>Current Plan</span>
                    <strong>{customerData.plan}</strong>
                  </div>
                  <div className="bill-row">
                    <span>Due Date</span>
                    <strong>{customerData.dueDate}</strong>
                  </div>
                  <div className="bill-row highlight">
                    <span>Amount Due</span>
                    <strong>₹{customerData.amount}</strong>
                  </div>
                </div>

                <div className="paybill-actions">
                  <button className="paybill-btn" onClick={handlePay} disabled={loading}>
                    {loading ? (
                      <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                    ) : (
                      <><i className="fas fa-lock"></i> Pay ₹{customerData.amount} Securely</>
                    )}
                  </button>
                  <button className="paybill-btn-ghost" onClick={() => { setStep('login'); setLoginValue(''); }}>
                    Back
                  </button>
                </div>

                <p className="paybill-secure-note">
                  <i className="fas fa-shield-alt"></i>
                  Secured by Razorpay. Your payment info is encrypted.
                </p>
              </motion.div>
            )}

            {/* STEP 3 — Success */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="paybill-card"
              >
                <motion.div
                  className="paybill-card-icon success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <i className="fas fa-check"></i>
                </motion.div>
                <h2>Payment Successful!</h2>
                <p>Your bill has been paid successfully. A confirmation has been sent to your registered mobile number.</p>
                <div className="success-details">
                  <div className="bill-row">
                    <span>Transaction ID</span>
                    <strong>TXN{Date.now()}</strong>
                  </div>
                  <div className="bill-row">
                    <span>Amount Paid</span>
                    <strong>₹{customerData?.amount}</strong>
                  </div>
                  <div className="bill-row">
                    <span>Status</span>
                    <strong style={{ color: '#00d4ff' }}>Paid</strong>
                  </div>
                </div>
                <button className="paybill-btn" onClick={() => { setStep('login'); setLoginValue(''); setCustomerData(null); }}>
                  <i className="fas fa-home"></i> Back to Home
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </PageWrapper>
  );
}

export default PayBill;
