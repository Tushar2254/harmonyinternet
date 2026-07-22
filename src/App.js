import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import TopBar   from './components/TopBar/TopBar';
import Navbar   from './components/Navbar/Navbar';
import Footer   from './components/Footer/Footer';
import Home     from './pages/Home/Home';
import About    from './pages/About/About';
import Services from './pages/Services/Services';
import Plans    from './pages/Plans/Plans';
import PayBill  from './pages/PayBill/PayBill';
import Support  from './pages/Support/Support';
import Contact  from './pages/Contact/Contact';
import SpeedTest from './pages/SpeedTest/SpeedTest';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/services"   element={<Services />} />
        <Route path="/plans"      element={<Plans />} />
        <Route path="/pay-bill"   element={<PayBill />} />
        <Route path="/support"    element={<Support />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="/speed-test" element={<SpeedTest />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    AOS.init({ once: true, duration: 900, easing: 'ease-out-cubic', offset: 60 });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {/* Top info bar — sits above the navbar */}
      <TopBar />
      {/* Main navbar — offset by 38px (top bar height) */}
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;
