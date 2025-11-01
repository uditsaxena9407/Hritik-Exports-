// src/pages/AboutPage.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Users, Leaf, ShieldCheck, TrendingUp, Clock, Globe,
  Award, Sprout, ArrowRight, MessageCircle, MapPin, Star
} from 'lucide-react';
import CardHover3D from '../components/CardHover3D';
import WhatsAppButton from '../components/WhatsAppButton';

// -------------------------------------------------
// Animated Counter Hook (unchanged)
const useCountUp = (end, suffix = '', duration = 2000) => {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return [count + suffix, ref];
};

// -------------------------------------------------
const AboutPage = () => {
  // const navigate = useNavigate();   // optional – not needed for internal scroll

  const { scrollY } = useScroll();
  const heroRef = useRef(null);

  // Parallax for hero background
  const yBg = useTransform(scrollY, [0, 600], [0, 180]);
  const scaleBg = useTransform(scrollY, [0, 600], [1, 1.15]);

  // Counters
  const [years, yearsRef] = useCountUp(12, '+');
  const [tons, tonsRef] = useCountUp(20, 'k+');
  const [varieties, varietiesRef] = useCountUp(7, '+');
  const [continents, continentsRef] = useCountUp(5, '+');

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 overflow-hidden">
      {/* ---------- HERO ---------- */}
      <section ref={heroRef} className="relative rounded-3xl overflow-hidden mb-20">
        <motion.div
          style={{ y: yBg, scale: scaleBg }}
          className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-yellow-600"
        />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-10 lg:p-20 text-white">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="flex-1"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Our Story: <span className="text-yellow-300">Growth & Trust</span>
            </h1>
            <p className="mt-6 text-lg max-w-xl">
              From the fertile fields of Farrukhabad – the <strong>Potato Capital of India</strong> – we deliver export‑grade potatoes to over <strong>28 countries</strong> with a promise of quality, speed, and sustainability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {/* ---- SMOOTH SCROLL BUTTON ---- */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-4 px-8 rounded-full shadow-xl flex items-center justify-center gap-2"
              >
                See Our Impact <ArrowRight className="w-5 h-5" />
              </motion.button>

              <WhatsAppButton />
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="flex-1 flex justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop&auto=format"
              alt="Farrukhabad potato fields"
              className="rounded-2xl shadow-2xl w-full max-w-md object-cover border-8 border-white/30"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* ---------- MISSION / VISION ---------- */}
      <section className="grid md:grid-cols-2 gap-8 mb-20">
        {[
          {
            title: 'Our Mission',
            desc: 'To be the world’s most reliable source of premium Indian potatoes, delivering farm‑fresh quality to every corner of the globe.',
            color: 'from-green-600 to-emerald-700',
            bg: 'bg-green-50',
            border: 'border-green-700',
          },
          {
            title: 'Our Vision',
            desc: 'To innovate continuously in cold‑chain logistics, sustainable farming, and transparent trade – setting new benchmarks for the agro‑export industry.',
            color: 'from-yellow-500 to-amber-600',
            bg: 'bg-yellow-50',
            border: 'border-yellow-600',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.02 }}
            className={`${item.bg} p-8 rounded-2xl border-l-8 ${item.border} shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                {i === 0 ? <Leaf className="w-7 h-7 text-white" /> : <Globe className="w-7 h-7 text-white" />}
              </div>
              <h3 className="text-2xl font-bold text-green-800">{item.title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ---------- CORE VALUES ---------- */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl lg:text-5xl font-extrabold text-center text-green-800 mb-12"
        >
          Core Values
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { Icon: Leaf, title: 'Sustainability', desc: 'Eco‑friendly farming, biodegradable packaging, and carbon‑neutral logistics.' },
            { Icon: ShieldCheck, title: 'Integrity', desc: 'Transparent pricing, ethical sourcing, and zero‑tolerance for quality compromise.' },
            { Icon: TrendingUp, title: 'Reliability', desc: '48‑hour cold‑chain to port, on‑time delivery, every single time.' },
          ].map((v, i) => (
            <CardHover3D key={i}>
              <div className="bg-white p-8 rounded-2xl text-center shadow-xl border border-gray-100">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                >
                  <v.Icon className="w-10 h-10 text-white" />
                </motion.div>
                <h4 className="text-xl font-bold text-green-700">{v.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{v.desc}</p>
              </div>
            </CardHover3D>
          ))}
        </div>
      </section>

      {/* ---------- BY THE NUMBERS (Counters) ---------- */}
      <section id="stats" className="bg-gradient-to-r from-green-800 to-green-900 rounded-3xl p-10 lg:p-16 mb-20 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center mb-12"
        >
          By The Numbers
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { valueRef: yearsRef, label: 'Years of Excellence', icon: Clock },
            { valueRef: tonsRef, label: 'Tons Exported Yearly', icon: TrendingUp },
            { valueRef: varietiesRef, label: 'Premium Varieties', icon: Sprout },
            { valueRef: continentsRef, label: 'Continents Served', icon: Globe },
          ].map((stat, i) => (
            <div key={i} ref={stat.valueRef}>
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-extrabold text-yellow-300"
              >
                {stat.valueRef.current?.textContent || '0'}
              </motion.p>
              <p className="mt-2 text-green-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- TEAM / FARM GLIMPSE ---------- */}
      <section className="grid md:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-bold text-green-800 flex items-center gap-2">
            <Users className="w-8 h-8 text-yellow-600" /> Meet the Team
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Our family‑run operation brings together agronomists, logistics experts, and quality auditors – all passionate about delivering the finest potatoes from Farrukhabad to your table.
          </p>
          <ul className="space-y-3">
            {['Quality First', 'Farmer Partnerships', 'Global Compliance'].map((t, i) => (
              <li key={i} className="flex items-center gap-2 text-green-700">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop&auto=format"
            alt="HRITIK TRADERS team"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-6 left-6 text-white font-bold text-xl">
            Passion • Precision • Potatoes
          </p>
        </motion.div>
      </section>

      {/* ---------- FLOATING CTA ---------- */}
      <WhatsAppButton floating />
    </main>
  );
};

export default AboutPage;