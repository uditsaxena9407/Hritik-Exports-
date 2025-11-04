// src/pages/ProductPage.jsx
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Sprout, Sun, Truck, CheckCircle, Package, Factory, TrendingUp,
  ArrowRight, Leaf, Filter, Star, Globe
} from 'lucide-react';
import { POTATO_VARIETIES } from '../data/config';
import WhatsAppButton from '../components/WhatsAppButton';
import CardHover3D from '../components/CardHover3D';

// -------------------------------------------------
// Animated Counter Hook
const useCountUp = (end, suffix = '', duration = 2000) => {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(prog * end));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return [count + suffix, ref];
};

// -------------------------------------------------
// Variety Card (real Unsplash image)
const VarietyCard = ({ variety, index }) => {
  const phone = '+918299789304';
  const msg = encodeURIComponent(`Hi! Interested in *${variety.name}* (${variety.use}) – Export Grade`);
  const waLink = `https://wa.me/${phone}?text=${msg}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7 }}
    >
      <CardHover3D>
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-gray-100">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={variety.img}
              alt={variety.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-3 right-3 bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Leaf className="w-3 h-3" /> {variety.moisture}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-green-800 flex items-center gap-2">
              {variety.name}
              {variety.popular && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
            </h3>
            <p className="text-sm text-yellow-700 font-semibold">{variety.origin} • {variety.use}</p>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{variety.description}</p>

            <div className="mt-5 flex justify-between items-center">
              <div className="flex items-center gap-1 text-xs font-bold text-green-700">
                <Package className="w-4 h-4" /> Min: 500 kg
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

// -------------------------------------------------
const ProductPage = () => {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);

  // Parallax
  const yBg = useTransform(scrollY, [0, 600], [0, 180]);
  const scaleBg = useTransform(scrollY, [0, 600], [1, 1.18]);

  // Counters
  const [totalVarieties, varRef] = useCountUp(POTATO_VARIETIES.length, '+');
  const [exportTons, tonsRef] = useCountUp(20, 'k+');
  const [countries, countriesRef] = useCountUp(28, '+');

  // Filter state
  const [filter, setFilter] = useState('all');
  const useCases = ['all', ...new Set(POTATO_VARIETIES.map(v => v.use.split('/')[0].trim()))];

  const filtered = filter === 'all'
    ? POTATO_VARIETIES
    : POTATO_VARIETIES.filter(v => v.use.includes(filter));

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 overflow-hidden">
      {/* ---------- HERO ---------- */}
      <section ref={heroRef} className="relative rounded-3xl overflow-hidden mb-20">
        <motion.div
          style={{ y: yBg, scale: scaleBg }}
          className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-yellow-600"
        />
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center p-10 lg:p-20 text-white">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Export <span className="text-yellow-300">Varieties</span>
            </h1>
            <p className="mt-6 text-lg max-w-lg">
              Hand‑selected from Farrukhabad’s finest farms. EU, GCC, USA compliant. Ready for chips, fries, table, or starch.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <WhatsAppButton />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('varieties').scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-4 px-8 rounded-full shadow-xl flex items-center justify-center gap-2"
              >
                Explore All <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1 }}
            className="flex justify-center"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKjqq0XBt_p36oOKQZcqqfPFR4OSkrfX0qWg&s"
              alt="Premium potatoes"
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-8 border-white/30"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* ---------- FILTER BAR ---------- */}
      <section className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {useCases.map(useCase => (
            <motion.button
              key={useCase}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(useCase === 'all' ? 'all' : useCase)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === (useCase === 'all' ? 'all' : useCase)
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'bg-white text-green-700 border border-green-700 hover:bg-green-50'
              }`}
            >
              {useCase === 'all' ? <Filter className="w-4 h-4 inline mr-1" /> : null}
              {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ---------- VARIETIES GRID ---------- */}
      <section id="varieties" className="mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((v, i) => ({
            ...v,
            popular: i < 2,
            imgId: [
              '1607305387299-a3d9611cd831',
              '15173333690',
              '1560434818',
              '1631185331',
              '1598512431',
              '1603732273',
              '1631558974'
            ][i % 7]
          })).map((v, i) => (
            <VarietyCard key={i} variety={v} index={i} />
          ))}
        </div>
      </section>


      {/* ---------- SUPPLY CHAIN TIMELINE ---------- */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center text-green-800 mb-12"
        >
          End‑to‑End Supply Chain
        </motion.h2>

        <div className="relative">
          {/* Progress Bar (desktop only) */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-green-200 -z-10 hidden lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-green-600 to-yellow-500 origin-left"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { Icon: Sun, title: 'Harvest', desc: 'Peak maturity' },
              { Icon: Factory, title: 'Pre‑Cool', desc: 'Rapid chill' },
              { Icon: CheckCircle, title: 'QC', desc: 'Export grade' },
              { Icon: Package, title: 'Pack', desc: 'Custom specs' },
              { Icon: Truck, title: 'Reefer', desc: 'Cold transit' },
              { Icon: Globe, title: 'Export', desc: 'Global delivery' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center mb-3 shadow-lg"
                >
                  <s.Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="font-bold text-green-800">{s.title}</h4>
                <p className="text-xs text-gray-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default ProductPage;