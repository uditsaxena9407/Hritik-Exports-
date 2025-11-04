// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sprout, Home, Info, ShoppingBag, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// NOTE: Ensure your NAV_LINKS are imported correctly
// For completeness, I'll include a dummy set here if '../data/config' is not provided.
// Remove this block if your import is correct.
const NAV_LINKS = [
    { name: 'Home', path: 'home', Icon: Home },
    { name: 'About', path: 'about', Icon: Info },
    { name: 'Products', path: 'products', Icon: ShoppingBag },
    { name: 'Contact', path: 'contact', Icon: Mail },
];
// import { NAV_LINKS } from '../data/config'; 

// Import the custom hook
import useScrollDirection from '../hooks/useScrollDirection';

/* ──────────────────────── Mobile Menu Animation Variants ──────────────────────── */

const menuVariants = {
    open: {
        height: 'auto',
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 0.3,
            staggerChildren: 0.07,
            delayChildren: 0.1,
        }
    },
    closed: {
        height: 0,
        opacity: 0,
        transition: {
            type: 'tween',
            duration: 0.3,
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
};

const linkVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
    },
    closed: {
        y: -20,
        opacity: 0,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
    }
};


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    // Use the custom hook to track scroll direction
    const scrollDirection = useScrollDirection();
    
    // Logic to determine if the Navbar should be hidden
    const isHidden = scrollDirection === 'down' && !isOpen; 

    // Determine if the user has scrolled past the initial position (for background/shadow)
    const hasScrolled = typeof window !== 'undefined' && window.scrollY > 20;

    const getPath = (path) => (path === 'home' ? '/' : `/${path}`);

    // Dynamic background and shadow based on scroll state
    const scrollClasses = hasScrolled
        ? 'bg-green-800/95 backdrop-blur-md shadow-xl' 
        : 'bg-green-700 shadow-md'; // Added shadow-md to initial state for depth

    return (
        <motion.nav
            // Framer Motion controls the slide-in/slide-out animation
            // The 'y' position is driven by isHidden
            animate={{ y: isHidden ? -100 : 0 }} 
            transition={{ duration: 0.35, ease: 'easeInOut' }} // Slightly smoother transition
            
            // Fixed position and z-index are crucial for the effect
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrollClasses}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo with Enhanced Animation */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                        className="flex-shrink-0"
                    >
                        <Link to="/" className="text-2xl font-extrabold text-white tracking-widest flex items-center">
                            {/* Sprout icon with a spring effect on hover */}
                            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 500 }}>
                                <Sprout className="w-7 h-7 mr-2 text-yellow-300 animate-float" />
                            </motion.div>
                            HRITIK <span className="text-yellow-300 ml-1">TRADERS</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Links - Subtle hover effects kept */}
                    <div className="hidden md:flex items-center space-x-1">
                        {NAV_LINKS.map((link, i) => {
                            const isActive = location.pathname === getPath(link.path);
                            return (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }} // Faster stagger for desktop
                                    whileHover={{ y: -2 }} // Lift effect on hover
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
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-200 hover:bg-green-600 z-50"
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={isOpen ? 'close' : 'menu'}
                                initial={{ rotate: 0, opacity: 0 }}
                                animate={{ rotate: isOpen ? 90 : 0, opacity: 1 }}
                                exit={{ rotate: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu - Uses staggered variants for better animation */}
            <motion.div
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                variants={menuVariants}
                className="md:hidden overflow-hidden bg-green-800"
            >
                <div className="px-4 py-3 space-y-1">
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === getPath(link.path);
                        return (
                            <motion.div key={link.path} variants={linkVariants}>
                                <Link
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
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;