import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SplashScreen from './components/SplashScreen/SplashScreen';
import TopBar      from './components/TopBar/TopBar';
import Navbar      from './components/Navbar/Navbar';
import Footer      from './components/Footer/Footer';
import Home        from './pages/Home/Home';
import About       from './pages/About/About';
import Services    from './pages/Services/Services';
import ServiceDetail from './pages/Services/ServiceDetail';
import Plans       from './pages/Plans/Plans';
import PayBill     from './pages/PayBill/PayBill';
import Support     from './pages/Support/Support';
import Contact     from './pages/Contact/Contact';
import SpeedTest   from './pages/SpeedTest/SpeedTest';
import NewConnection from './pages/NewConnection/NewConnection';
import './styles/ambient.css';

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
        <Route path="/"                element={<Home />} />
        <Route path="/about"           element={<About />} />
        <Route path="/services"        element={<Services />} />
        <Route path="/services/:slug"  element={<ServiceDetail />} />
        <Route path="/plans"           element={<Plans />} />
        <Route path="/pay-bill"        element={<PayBill />} />
        <Route path="/support"         element={<Support />} />
        <Route path="/contact"         element={<Contact />} />
        <Route path="/speed-test"      element={<SpeedTest />} />
        <Route path="/new-connection"  element={<NewConnection />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashDone = useCallback(() => setSplashDone(true), []);

  useEffect(() => {
    AOS.init({ once: true, duration: 900, easing: 'ease-out-cubic', offset: 60 });
  }, []);

  return (
    <Router>
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;
