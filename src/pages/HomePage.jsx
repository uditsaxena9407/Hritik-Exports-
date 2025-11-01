// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  Locate, Clock, Package, Truck, Globe, Award, Sprout, ArrowRight,
  MessageCircle, Leaf, ShieldCheck, Star, MapPin, TrendingUp, CheckCircle
} from 'lucide-react';
import { POTATO_VARIETIES } from '../data/config';
import WhatsAppButton from '../components/WhatsAppButton';
import CardHover3D from '../components/CardHover3D';

// Custom Hook: Animated Counter
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return [count, ref];
};

// Animated Icon with Stroke Reveal
const AnimatedIcon = ({ Icon, className }) => (
  <motion.div
    initial={{ pathLength: 0, opacity: 0 }}
    whileInView={{ pathLength: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  >
    <Icon className={className} strokeWidth={1.5} />
  </motion.div>
);

// Premium Variety Card
const VarietyCard = ({ variety, index }) => {
  const phone = '8299789304';
  const msg = encodeURIComponent(`Hi! Interested in *${variety.name}* (${variety.use}) - Export Grade`);
  const waLink = `https://wa.me/${phone}?text=${msg}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
    >
      <CardHover3D>
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-gray-100">
          <div className="relative h-56 overflow-hidden">
            <img
              src={`https://images.unsplash.com/photo-${variety.imgId || '1607305387299-a3d9611cd831'}?w=600&h=400&fit=crop&auto=format`}
              alt={variety.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Leaf className="w-3 h-3" /> {variety.moisture}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-green-800 flex items-center gap-2">
              {variety.name}
              {variety.popular && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
            </h3>
            <p className="text-sm text-yellow-700 font-semibold">{variety.origin} • {variety.use}</p>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{variety.description}</p>
            <div className="mt-5 flex justify-between items-center">
              <div className="flex items-center gap-1 text-xs font-bold text-green-700">
                <Package className="w-4 h-4" /> Min: 50 kg
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-bold py-2.5 px-5 rounded-full flex items-center gap-2 shadow-lg transform hover:scale-105 transition-all"
              >
                Inquire <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </CardHover3D>
    </motion.div>
  );
};

const HomePage = ({ setPage }) => {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const [tons, tonsRef] = useCountUp(5000);
  const [countries, countriesRef] = useCountUp(28);
  const [clients, clientsRef] = useCountUp(180);

  // Parallax
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  const scalePotato = useTransform(scrollY, [0, 600], [1, 1.3]);
  const opacityOverlay = useTransform(scrollY, [0, 300], [0.4, 0]);

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 overflow-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative rounded-3xl overflow-hidden mb-20">
        <motion.div
          style={{ y: yHero }}
          className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-yellow-500"
        />
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center p-10 lg:p-20">
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              Farrukhabad's <span className="text-yellow-300 drop-shadow-lg">Finest</span> Potatoes
            </h1>
            <p className="text-xl text-yellow-100 mt-4 max-w-lg">
              Export-grade. Farm-fresh. Delivered globally in <span className="font-bold">48 hours</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage('products')}
                className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-4 px-8 rounded-full shadow-2xl text-lg flex items-center justify-center gap-2"
              >
               <Link to="/products"> Explore Varieties </Link> <ArrowRight className="w-5 h-5" />
              </motion.button>
              <WhatsAppButton />
            </div>

            <div className="flex gap-4 mt-8">
              {[
                { Icon: ShieldCheck, label: "EU Certified" },
                { Icon: Globe, label: "GCC Approved" },
                { Icon: Award, label: "APEDA Member" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium"
                >
                  <item.Icon className="w-4 h-4 text-yellow-300" />
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ scale: scalePotato }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE09sIkbKLG5ggh02Bs-suV9UTsOELutj3aA&s"
                alt="Golden Potato"
                className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-8 border-white/30"
                loading="lazy"
              />
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-yellow-400 text-green-900 px-5 py-2 rounded-2xl font-bold shadow-xl text-sm"
              >
                100% Export Grade
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
        />
      </section>

      {/* FEATURES */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { Icon: Locate, title: 'Farrukhabad Origin', text: 'Potato capital of India', color: 'from-green-500 to-emerald-600' },
            { Icon: Clock, title: '48-Hour Delivery', text: 'Cold chain to port', color: 'from-yellow-500 to-amber-600' },
            { Icon: Truck, title: 'Global Logistics', text: 'Air & sea freight', color: 'from-blue-500 to-cyan-600' },
          ].map((f, i) => (
            <motion.div key={i} whileHover={{ y: -12, scale: 1.03 }} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity`} />
              <div className="relative bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 flex items-center justify-center">
                  <AnimatedIcon Icon={f.Icon} className="w-9 h-9 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-800 text-center">{f.title}</h3>
                <p className="text-gray-600 text-center mt-2">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 rounded-3xl p-10 mb-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: tons, label: "Tons Exported", ref: tonsRef, icon: TrendingUp },
            { value: countries, label: "Countries Served", ref: countriesRef, icon: Globe },
            { value: clients, label: "Happy Clients", ref: clientsRef, icon: CheckCircle },
          ].map((stat, i) => (
            <div key={i} ref={stat.ref}>
              <stat.icon className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-5xl font-extrabold text-yellow-300"
              >
                {stat.value.toLocaleString()}+
              </motion.p>
              <p className="text-green-100 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VARIETIES */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-green-800">
            Top Export Varieties
          </h2>
          <p className="text-gray-600 mt-3 text-lg">Handpicked for chips, fries & premium table use</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {POTATO_VARIETIES.slice(0, 4).map((v, i) => ({
            ...v,
            popular: i === 0 || i === 1,
            imgId: ['1607305387299-a3d9611cd831', '15173333690', '1560434818', '1631185331'][i]
          })).map((v, i) => (
            <VarietyCard key={i} variety={v} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage('products')}
            className="text-green-700 font-bold text-lg flex items-center gap-3 mx-auto hover:gap-5 transition-all"
          >
            View All Varieties <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </section>

      <WhatsAppButton floating />
    </main>
  );
};

export default HomePage;