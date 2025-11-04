// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Locate, Phone, Mail, Sprout } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO } from '../data/config';

const Footer = () => {
  const getPath = (path) => (path === 'home' ? '/' : `/${path}`);

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-6 mb-6">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-xl font-bold text-yellow-300 mb-4 flex items-center">
              <Sprout className="w-5 h-5 mr-2" /> HRITIK TRADERS
            </Link>
            <p className="text-gray-400 text-sm">
              Farrukhabad's premier potato exporter, committed to quality, trust, and global delivery of fresh produce.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={`footer-${link.path}`}>
                  <Link
                    to={getPath(link.path)}
                    className="text-gray-400 hover:text-yellow-300 text-sm transition-colors duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <p className="text-gray-400 text-sm flex items-center mb-2">
              <Locate className="w-4 h-4 mr-2 text-yellow-300" />
              {CONTACT_INFO.address}
            </p>
            <p className="text-gray-400 text-sm flex items-center mb-2">
              <Phone className="w-4 h-4 mr-2 text-yellow-300" />
              {CONTACT_INFO.phone}
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              <Mail className="w-4 h-4 mr-2 text-yellow-300" />
              {CONTACT_INFO.email}
            </p>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Designed and developed by <a href="https://portfolio-ljss.vercel.app/">Udit Narayan Saxena</a>. All rights reserved. Exporting freshness from Farrukhabad.
        </div>
      </div>
    </footer>
  );
};

export default Footer;