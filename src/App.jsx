// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import FloatingActions from './components/FloatingActions';

/* ────────────────────────  Page Transition  ──────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -30 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.6,
};

/* ────────────────────────  Scroll To Top on Route Change  ──────────────────────── */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

/* ────────────────────────  Animated Routes  ──────────────────────── */
const AnimatedRoutes = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      {/* Auto Scroll to Top */}
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <HomePage setPage={setCurrentPage} />
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <AboutPage />
              </PageWrapper>
            }
          />
          <Route
            path="/products"
            element={
              <PageWrapper>
                <ProductPage />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <ContactPage />
              </PageWrapper>
            }
          />
          <Route
            path="*"
            element={
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

/* ────────────────────────  Page Wrapper  ──────────────────────── */
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

/* ────────────────────────  404 Page  ──────────────────────── */
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
    <h1 className="text-6xl sm:text-7xl font-extrabold text-green-800">404</h1>
    <p className="mt-4 text-lg sm:text-2xl text-gray-600">Page not found</p>
    <button
      onClick={() => (window.location.href = '/')}
      className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-full font-bold transition"
    >
      Back to Home
    </button>
  </div>
);

/* ────────────────────────  Main App  ──────────────────────── */
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar – sticky */}
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <Navbar />
        </header>

        {/* Main content */}
        <main className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
          <AnimatedRoutes />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating actions */}
        <FloatingActions />
      </div>
    </Router>
  );
};

export default App;