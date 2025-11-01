// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sprout } from 'lucide-react';
import { NAV_LINKS } from '../data/config';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPath = (path) => (path === 'home' ? '/' : `/${path}`);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-green-800/95 backdrop-blur-md shadow-xl' : 'bg-green-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold text-white tracking-widest flex items-center">
              <Sprout className="w-7 h-7 mr-2 text-yellow-300 animate-float" />
              HRITIK <span className="text-yellow-300 ml-1">TRADERS</span>
            </Link>
          </motion.div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = location.pathname === getPath(link.path);
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={getPath(link.path)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2
                      ${isActive
                        ? 'bg-yellow-500 text-green-900 shadow-lg'
                        : 'text-gray-100 hover:bg-green-600 hover:text-white'
                      }`}
                  >
                    <link.Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-200 hover:bg-green-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-green-800"
      >
        <div className="px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === getPath(link.path);
            return (
              <Link
                key={link.path}
                to={getPath(link.path)}
                onClick={() => setIsOpen(false)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-base font-medium transition
                  ${isActive
                    ? 'bg-yellow-500 text-green-900'
                    : 'text-gray-200 hover:bg-green-700'
                  }`}
              >
                <link.Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;