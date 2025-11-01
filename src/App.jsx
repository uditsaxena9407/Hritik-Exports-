import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import FloatingActions from './components/FloatingActions';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -30 },
};

const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.6 };

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><ProductPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="in"
    exit="out"
    transition={pageTransition}
    className="flex-grow"
  >
    {children}
  </motion.div>
);

const NotFound = () => (
  <div className="flex items-center justify-center h-screen text-center p-10">
    <div>
      <h1 className="text-7xl font-extrabold text-green-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Page not found</p>
      <button onClick={() => window.location.href = '/'} className="mt-8 bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition">
        Back to Home
      </button>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </Router>
  );
};

export default App;