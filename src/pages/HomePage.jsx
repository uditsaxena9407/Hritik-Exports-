// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from 'framer-motion';
import {
  Locate, Clock, Package, Truck, Globe, Award, Sprout, ArrowRight,
  MessageCircle, Leaf, ShieldCheck, Star, TrendingUp, CheckCircle,
} from 'lucide-react';
import { POTATO_VARIETIES } from '../data/config';
import WhatsAppButton from '../components/WhatsAppButton';
import CardHover3D from '../components/CardHover3D';

/* ────────────────────────  Animation Variants  ──────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

/* ────────────────────────  Custom Hook: Count‑Up  ──────────────────────── */
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, isInView]);

  return [count, ref];
};

/* ────────────────────────  Animated Icon  ──────────────────────── */
const AnimatedIcon = ({ Icon, className }) => (
  <motion.div
    initial={{ pathLength: 0, opacity: 0 }}
    whileInView={{ pathLength: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
  >
    <Icon className={className} strokeWidth={1.5} />
  </motion.div>
);

/* ────────────────────────  Variety Card  ──────────────────────── */
const VarietyCard = ({ variety, index }) => {
  const phone = '8299789304';
  const msg = encodeURIComponent(`Hi! Interested in *${variety.name}* (${variety.use}) - Export Grade`);
  const waLink = `https://wa.me/${phone}?text=${msg}`;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <CardHover3D>
        <motion.div
          className="bg-white rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-gray-100"
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="relative h-56 overflow-hidden">
            <motion.img
              src={`https://images.unsplash.com/photo-${variety.imgId || '1607305387299-a3d9611cd831'}?w=600&h=400&fit=crop&auto=format`}
              alt={variety.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.6 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute bottom-3 left-3 bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            >
              <Leaf className="w-3 h-3" /> {variety.moisture}
            </motion.div>
          </div>

          <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
            <motion.h3
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl font-bold text-green-800 flex items-center gap-2"
            >
              {variety.name}
              {variety.popular && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
            </motion.h3>

            <p className="text-xs sm:text-sm text-yellow-700 font-semibold">
              {variety.origin} • {variety.use}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{variety.description}</p>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4 sm:mt-5">
              <div className="flex items-center gap-1 text-xs font-bold text-green-700">
                <Package className="w-4 h-4" /> Min: 500 kg
              </div>
              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs sm:text-sm font-bold py-2.5 px-4 sm:px-5 rounded-full flex items-center gap-2 shadow-lg"
              >
                Inquire <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </CardHover3D>
    </motion.div>
  );
};

/* ────────────────────────  Main Component  ──────────────────────── */
const HomePage = ({ setPage }) => {
  const { scrollY, scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const [tons, tonsRef] = useCountUp(5000);
  const [countries, countriesRef] = useCountUp(10);
  const [clients, clientsRef] = useCountUp(180);

  // Mouse‑follow parallax background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const bgX = useTransform(smoothX, [-300, 300], [-60, 60]);
  const bgY = useTransform(smoothY, [-300, 300], [-60, 60]);

  // Scroll‑based transforms
  const yHero = useTransform(scrollY, [0, 600], [0, 180]);
  const scalePotato = useTransform(scrollY, [0, 700], [1, 1.35]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.3], [0.6, 0]);

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 overflow-hidden">
      {/* ───── HERO ───── */}
      <section
        ref={heroRef}
        className="relative rounded-3xl overflow-hidden mb-12 sm:mb-24"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          style={{ x: bgX, y: bgY, y: yHero }}
          className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-yellow-500"
        />
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
        />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-20 text-white">
          {/* Text side */}
          <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight"
            >
              {['Farrukhabad\'s', 'Finest', 'Potatoes'].map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className={i === 1 ? 'text-yellow-300 drop-shadow-lg' : ''}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-yellow-100 mt-4"
            >
              Export‑grade. Farm‑fresh. Delivered globally in{' '}
              <span className="font-bold">48 hours</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setPage('products')}
                className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-2xl text-base sm:text-lg flex items-center justify-center gap-2"
              >
                <Link to="/products">Explore Varieties</Link>{' '}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <WhatsAppButton />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 sm:gap-4 mt-6 justify-center lg:justify-start"
            >
              {[
                { Icon: ShieldCheck, label: 'EU Certified' },
                { Icon: Globe, label: 'GCC Approved' },
                { Icon: Award, label: 'APEDA Member' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm font-medium"
                >
                  <item.Icon className="w-4 h-4 text-yellow-300" />
                  {item.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image side */}
          <motion.div
            style={{ scale: scalePotato }}
            initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <motion.img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE09sIkbKLG5ggh02Bs-suV9UTsOELutj3aA&s"
              alt="Golden Potato"
              className="rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-sm lg:max-w-md object-cover border-8 border-white/30"
              loading="lazy"
              animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200 }}
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-yellow-400 text-green-900 px-3 py-1 sm:px-5 sm:py-2 rounded-2xl font-bold shadow-xl text-xs sm:text-sm"
            >
              100% Export Grade
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="mb-12 sm:mb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {[
            {
              Icon: Locate,
              title: 'Farrukhabad Origin',
              text: 'Potato capital of India',
              color: 'from-green-500 to-emerald-600',
            },
            {
              Icon: Clock,
              title: '48‑Hour Delivery',
              text: 'Cold chain to port',
              color: 'from-yellow-500 to-amber-600',
            },
            {
              Icon: Truck,
              title: 'Global Logistics',
              text: 'Air & sea freight',
              color: 'from-blue-500 to-cyan-600',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -12, scale: 1.05 }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${f.color} rounded-3xl blur-xl opacity-55 group-hover:opacity-75 transition-opacity`}
              />
              <div className="relative bg-white/95 backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 flex items-center justify-center"
                >
                  <AnimatedIcon Icon={f.Icon} className="w-8 h-8 sm:w-9 sm:h-9 text-green-700" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-green-800 text-center">{f.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 text-center mt-2">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ───── STATS ───── */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 rounded-3xl p-6 sm:p-10 mb-12 sm:mb-24 text-white overflow-hidden">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center"
        >
          {[
            { value: tons, label: 'Tons Exported', ref: tonsRef, icon: TrendingUp },
            { value: countries, label: 'States Served', ref: countriesRef, icon: Globe },
            { value: clients, label: 'Happy Clients', ref: clientsRef, icon: CheckCircle },
          ].map((stat, i) => (
            <motion.div
              key={i}
              ref={stat.ref}
              custom={i}
              variants={fadeUp}
              whileHover={{ scale: 1.08 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <stat.icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-yellow-400" />
              </motion.div>
              <motion.p
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: i * 0.2 }}
                className="text-4xl sm:text-5xl font-extrabold text-yellow-300"
              >
                {stat.value.toLocaleString()}+
              </motion.p>
              <p className="text-sm sm:text-base text-green-100 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ───── VARIETIES ───── */}
      <section className="mb-12 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.h2
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-800"
          >
            Top Export Varieties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base text-gray-600 mt-3"
          >
            Handpicked for chips, fries & premium table use
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {POTATO_VARIETIES.slice(0, 4)
            .map((v, i) => ({
              ...v,
              popular: i === 0 || i === 1,
              imgId: ['1607305387299-a3d9611cd831', '15173333690', '1560434818', '1631185331'][i],
            }))
            .map((v, i) => (
              <VarietyCard key={i} variety={v} index={i} />
            ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 sm:mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.12, gap: '1rem' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage('products')}
            className="text-green-700 font-bold text-base sm:text-lg flex items-center gap-3 mx-auto transition-all"
          >
            View All Varieties <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </motion.div>
      </section>

    </main>
  );
};

export default HomePage;