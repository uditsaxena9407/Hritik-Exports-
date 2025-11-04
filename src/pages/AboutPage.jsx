// src/pages/AboutPage.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import {
  Users, Leaf, ShieldCheck, TrendingUp, Clock, Globe,
  Award, Sprout, ArrowRight, MessageCircle, MapPin, Star
} from 'lucide-react';
import CardHover3D from '../components/CardHover3D';
import WhatsAppButton from '../components/WhatsAppButton';

// -------------------------------------------------
// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: 'easeOut' },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const popIn = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

// -------------------------------------------------
// Animated Counter Hook (FIXED: uses state, not DOM)
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
  const { scrollY, scrollYProgress } = useScroll();
  const heroRef = useRef(null);

  // Parallax + Mouse-follow glow
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

  const glowX = useTransform(smoothX, [-300, 300], [-100, 100]);
  const glowY = useTransform(smoothY, [-300, 300], [-100, 100]);

  // Scroll parallax
  const yBg = useTransform(scrollY, [0, 600], [0, 180]);
  const scaleBg = useTransform(scrollY, [0, 600], [1, 1.15]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.3], [0.7, 0]);

  // Counters (values come from state)
  const [years, yearsRef] = useCountUp(12, '+');
  const [tons, tonsRef] = useCountUp(20, 'k+');
  const [varieties, varietiesRef] = useCountUp(7, '+');
  const [continents, continentsRef] = useCountUp(5, '+');

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 overflow-hidden">
      {/* ---------- HERO ---------- */}
      <section
        ref={heroRef}
        className="relative rounded-3xl overflow-hidden mb-24 cursor-default"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          style={{ y: yBg, scale: scaleBg }}
          className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-yellow-600"
        />
        <motion.div
          style={{ x: glowX, y: glowY, opacity: 0.4 }}
          className="pointer-events-none absolute -inset-10 bg-yellow-400 rounded-full blur-3xl"
        />
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-10 lg:p-20 text-white">
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex-1"
          >
            <motion.h1
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="text-5xl lg:text-7xl font-extrabold leading-tight"
            >
              {['Our Story:', 'Growth &', 'Trust'].map((word, i) => (
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
              transition={{ delay: 0.7 }}
              className="mt-6 text-lg max-w-xl leading-relaxed"
            >
              From the fertile fields of <strong>Farrukhabad</strong> – the{' '}
              <span className="text-yellow-300">Potato Capital of India</span> – we deliver
              export‑grade potatoes to over <strong>28 countries</strong> with a promise of quality,
              speed, and sustainability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-4 px-8 rounded-full shadow-2xl flex items-center justify-center gap-2 text-lg"
              >
                See Our Impact <ArrowRight className="w-5 h-5" />
              </motion.button>
              <WhatsAppButton />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: 15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            className="flex-1 flex justify-center"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop&auto=format"
              alt="Farrukhabad potato fields"
              className="rounded-2xl shadow-2xl w-full max-w-md object-cover border-8 border-white/30"
              loading="lazy"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ---------- MISSION / VISION ---------- */}
      <section className="grid md:grid-cols-2 gap-8 mb-24">
        {[
          {
            title: 'Our Mission',
            desc: 'To be the world’s most reliable source of premium Indian potatoes, delivering farm‑fresh quality to every corner of the globe.',
            color: 'from-green-600 to-emerald-700',
            bg: 'bg-green-50',
            border: 'border-green-700',
            icon: Leaf,
          },
          {
            title: 'Our Vision',
            desc: 'To innovate continuously in cold‑chain logistics, sustainable farming, and transparent trade – setting new benchmarks for the agro‑export industry.',
            color: 'from-yellow-500 to-amber-600',
            bg: 'bg-yellow-50',
            border: 'border-yellow-600',
            icon: Globe,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            whileHover={{ y: -12, scale: 1.03 }}
            className={`${item.bg} p-8 rounded-2xl border-l-8 ${item.border} shadow-xl relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
              className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}
            >
              <item.icon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-green-800 mb-3">{item.title}</h3>
            <p className="text-gray-700 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ---------- CORE VALUES ---------- */}
      <section className="mb-24">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-4xl lg:text-5xl font-extrabold text-center text-green-800 mb-14"
        >
          Core Values
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { Icon: Leaf, title: 'Sustainability', desc: 'Eco‑friendly farming, biodegradable packaging, and carbon‑neutral logistics.' },
            { Icon: ShieldCheck, title: 'Integrity', desc: 'Transparent pricing, ethical sourcing, and zero‑tolerance for quality compromise.' },
            { Icon: TrendingUp, title: 'Reliability', desc: '48‑hour cold‑chain to port, on‑time delivery, every single time.' },
          ].map((v, i) => (
            <motion.div key={i} custom={i} variants={popIn}>
              <CardHover3D>
                <div className="bg-white p-8 rounded-2xl text-center shadow-xl border border-gray-100 h-full flex flex-col justify-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                  >
                    <v.Icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-green-700">{v.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">{v.desc}</p>
                </div>
              </CardHover3D>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- BY THE NUMBERS (Counters) - FIXED ---------- */}
      <section id="stats" className="bg-gradient-to-r from-green-800 to-green-900 rounded-3xl p-10 lg:p-16 mb-24 text-white overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-4xl lg:text-5xl font-extrabold"
          >
            By The Numbers
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: 12, label: 'Years of Excellence', icon: Clock },
            { value: 500, label: 'Tons Exported Yearly', icon: TrendingUp },
            { value: 20, label: 'Premium Varieties', icon: Sprout },
            { value: 10, label: 'States Served', icon: Globe },
          ].map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <stat.icon className="w-14 h-14 mx-auto mb-4 text-yellow-400" />
              </motion.div>
              <motion.p
                initial={{ scale: 0.3, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: i * 0.15 }}
                className="text-5xl lg:text-6xl font-extrabold text-yellow-300"
              >
                {stat.value}
              </motion.p>
              <p className="mt-2 text-green-100 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- TEAM / FARM GLIMPSE ---------- */}
      <section className="grid md:grid-cols-2 gap-12 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h3
            initial={{ x: -30 }}
            whileInView={{ x: 0 }}
            className="text-3xl font-bold text-green-800 flex items-center gap-3"
          >
            <Users className="w-9 h-9 text-yellow-600" /> Meet the Team
          </motion.h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            Our family‑run operation brings together agronomists, logistics experts, and quality auditors – all passionate about delivering the finest potatoes from Farrukhabad to your table.
          </p>
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            className="space-y-3"
          >
            {['Quality First', 'Farmer Partnerships', 'Global Compliance'].map((t, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={fadeUp}
                className="flex items-center gap-3 text-green-700 font-medium"
              >
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl group"
        >
          <motion.img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUTExMVFhUVGB4aFxgYGCAaFhoYGhgZGh0fGB0fHygiGRolHhgXITEhJSkrLi4uFx81ODMsNygtLisBCgoKDg0OGBAQGisfFx0tLS0tLS0tLS0tLS0tKy0tLS0tLSstLS0rLS0tLSstLS0tLS0tLS0rKy0tLS03LS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAQIDBAYAB//EAEYQAAIBAwIEAwQGBwUIAgMBAAECEQADIQQSBSIxQRNRYTJxgZEGI0JSodEUFVSSscHSM1OT4fAWYnKCotPi8WPCQ6OyB//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACERAQEBAQACAwADAQEAAAAAAAABEQISIQMxURNBYSIy/9oADAMBAAIRAxEAPwD1Tb6t8z+dPHvP4/nWQFq5+06j/ENPi9+03/35/iK8e39b9NgAfM/j+dLn7x/H86yU6j9qvf8AT/TXK2p/arv/AEf0VfK/pjW/8x/H86Uf8Tfj+dZSdT+13f8Ao/opC+p/a7v/AEf0U8r+mNbP+83407P3m+dZDxNT+13flb/op2/U/td35W/6KTq/pjXrP3jXAH7xrJeLqf2u7+7b/opBf1X7Xc/dt/0Vry/0bEz94ilk/eNZDx9V+1XP3Lf9FKNTqv2p/wBy1/RTy/0xrc/eNJn75rJ/pOr7alv8O3/TSfpWr/af/wBSflTyv6jWifvn/Xwrix++f9fCsmNXrP2gf4KUv6VrP2hf8Fabf0anxG++fkPyppvN94/h+VZc67Wf31v42f8Ayrv1jrP7yz/gn+utTr/VxpzfeJ3fw/Kk/SH67h/r4Vmf1jrOm+x/gn/uV36w1f37H+C3/cq+V/UxpDqnidw/D8qS5rLg7r/r4Vmm4lrPvaf/AAm/7lIeJazz03+G/wD3Kbf0xpX1zgEllAGZMRFVjx1f7+z+8PzrL8U4hqjZuKxsQw2YtuG5+XH1kA5q3c1+rHKDpxGBFt+w/wCOm0wescb3khblpiM4M4+dS/rN/Nf9fGsXoNZqWu37g8GS4tklGj6rHJDyBJbrNXDxDVeVj91/6qeV/TGlucZK+09tZMZIGfiaaOO//JZ/eH9VZK/rtQ1xAVsfVgv0bbLSgnPX249xp+o4nfRHZrenhFLEw3YTTb+mNcnGGOQbZ92f5079aP5L8j+dYnhWo1Fq0ieFZIAmSWDc3MZgETJq2eJX/wBntfC4f6KeVTGqPFn8l/H86T9bv5J+P51lP1re76ZPhd/8K4cVufsy/wCN/wCFPKrjVfre591PmaSst+tLn7MP8Uf0V1TypkY1fpfe+6v4f013+19+eiR5RkfGM/KrHE9Pp9zountLsJEoXzHfLdDQPWaMFlW2AJUnmJ7fOt+PKexg/TK99xfn/lSf7YXuypPqAR+EVd+jHB9M4237asyiWbxXXv2AYDuO1WuKcN0Nq07LpXdluMhi5dVcMQCGlhMbetM5NoUfpjdjFtJ9elSr9Lbna0uTPX/KinDOH8Ku21KqwYAbluXHVgY6mDGesjFEE+j/AA+4AAoQ9Pq77R18txI+VYvj+J54zH+2N0EzbWO0Eg/OpP8AbZv7odPPvVnivCuGWyPrbknEFyynmAMMF6jOPSncN0ulFz9HWwlxbmRdYktEDI3AconpH50/5/HTmXr+0KfTNzMWl6CJnr3nPT3VK30wIEmz8hj1+1QzhXD0Oo2cy2mUsYklCCQADBwSDE+dErHB9PctIWvOpdASBGCQDiUpZz+F5suEX6bjvaP4f10v+264+qb16fCOaorf0Y0jTGrcxgw1swfI8uDUd36MacMoGrO07txJtmAqlu0eVP8Aj8TKtp9N1jNpgfSD/wDbNPH00t/3bD4f50L0f0atXEtv+lwbi7o2qQOhg84I696n/wBjl/bB/hr/AN2rvCZV9Pppa7ow8v8AXant9NLXZCc+ox59KEJ9El5t2sRdr7BNsZ5Vb+9H3vwrrn0QIAZNUjgsqyLfdnCdrh6E9PSn/C50NN9L7WeU+7m8v+GkP0wsevXyb+igVzgLWwH8cNyltvhx7Jyp5iJw37pqHi/0fOnUXbl0uhYLCJD5DEe0YxFPHlPbQ/7ZWI3bbnWI/n0iPxrh9NbHQpd+Q/OsJcMLADHaxlwOXaQI3COVsHqfSnXLJXqw9+a14RLW5b6Z2Y9i4fl295rv9srH3LvyX0/3qwDXB5z8DU1lCQCYAaYk9QDBOAYE4+FX+OJtbLUfSm0+wKl0xcVzyiSEM4g5yBRAfSa1htl0CCeZCMjz8p7e6sIjE2nyZtPuA8lY7WE4+0AZjsfOqpvz1Y/Ems+Ma1u+CcVRLFtSG3MNzQpI3MSxk/GrT/SKzmRd6D7B9T/OvOxeP3j8zTlvt2Zv3j+dPGDcWOP2Q9xz4nMw28hPIigD5sXP/NUXF+O2btvwwxG90DllIAthgzfgI+JrGjVMMB2HuYj+BpP024SOd5HSWJI92aZFeh2/pBp3OLqiPvcvympTxOyY+utfvr+dYpbni292DctgB8gbk6B/eOh9INPXQXG6W/m6j+dPGDaLrrZiLtok/wDyL+dNTWoYIdYYwuRk5n+BrD3OD3ok21jr7af1UxeFXiQBaksJABU4EeuOowaeEZ16FuHmP3h+dJWC/UOo/Z2/6f6q6nhE1Dc4n4jTc1BUjIIsdz/w0iW9MRP6XcDAyCLJ+Px+NUoptctd2h06aHbz6u6ZMnGxunmFnsO8UK4hq7dtms2HvNYLBjFyASAPNTmZz38qH3RUNwZq8y79p6XH4iwdWts67QFG4hjAAAGAJECMjtVq39I74yXJPqFOe3ahFIa2zeYM3eOXHADiQqsogAGHIJz2IjBHSpuHcaS2+ndluk2Z3ZU7gRESSPXrQMGuJqfaz0L6Lj9205dGYEgLkKx2hie+JyfnS6X6S6pNkXAAggDYpEYiekxHWg+6uZ8VVHuE642Wu+GfrLjSdw6zJwv/ADE0S1XE7zAgm2jC07gMu3cNjI22Wy2TCjOKGaDTi4gRo52RZOY3WXVfx/hTVsOUQBv/AMFs82dpa3cLBZyuV7Huax5QvIppeIXbfhIUtsEUrIQlYlRM7pYiPKjWl1N8uE8GyVYEqxUqSY3AbS0kx5V55b1NwwRcb0gnExMZx/lS3XbqXY/HyphMbW2rAsHsB9rFjtScMqdA2SZUj4Gh9/Vbbkrpyom2WTwyZCmcgSPM4oDbe5ynxXEzHMZ5c/epbmovBgPGeX6wxnr6HrNNpg9oS9ywwbTDfzkSrLjcSPsduUeu7tNTcV4PqL9pRbsW1IckkOsnmcQD0PVazt8PIJuuT6sT08zNVFuOCYYjEYxjy91NpkEl4JfHK9lyCQS23chkYLCRIGfx8qg1hKyLgTesqwU4J3YgjBBBHSqZZp3b2nzkz59Zp+jUtierGZ9w/Gf41vm1nrFhLIJxsXAOWAA3ZGfcR8aseG25Bt3lfagyMs7RPqAT8DVLafDLFxg9PMbtv8auJpbhYZZ/VUZ4CiB7IJ7mulmRzntN9GwJhgDv5IYxLYaJ7ZxWga0G6hYO0KAAwyQIMiB7vQx0FZLV3mtAxhluhukHl5hg5HQVr01aFtykqzKtxSSNpU5BmJHtMMgxA8683zb9x3+NA/D0beCrAYYgDbyNHWYG4GcjrBqNeFqY3Wl6QSQJkZEjHUAjpjrRAADYwAhQBKzhHlSQDIK5Y5MiM9KaxAwSwUESCGlfaPWDgjtkDOIrh5118YpvwxYIVVIAyjdMbjIjrkEz1E1S1VgA7QYiehI6AdARnOD36UXuLCJu3OUxGCGLMerEEA9jgHInzqveVWCssMuBG5d0bQJg9QD1Iz8q1z8lS8wAs3TZuArBK9uxBwR6qRIoo2gBAuKzsryytuO6CThvVcj/AN1U12mMtyxkmJBA8+bB69ioNN4LqAT4ZzJLWpMAXYgCYMK/T3ha9fx/I4fJxq3c0u1dxVoAmSGI+cR86FXL4jaMmcH7WegonorN66WQs+xzlWO3vlZg7f51N+qntQ62nVlPUKrgAYkQeufXOa7/AM3+OH8fsB1Fi4Gjc3aYBIBgSJ7wZHwrqa1gMSzuysSSRkZJPbtXVjzrfgr+L7vmKaLknFEeL/Rn+0vWXt+FbAcDdLgKBOI8weprN6god4mNzbxy9DnHXvNefmSu10RvCq7NVK3aQkLuUT9p5VB3zAJ/Crf6HbPXXaZPQC5H/wDArWYns+fUfOmmht0kGBdDjzRiR+IBHyp+nunPORjGTVw0TVx5012HnQ4Oe94z8T/OuW8wM+L856fI1cNEg4pl44NDmuPMSaat1vOphrV8H1QtmWbCNp2J7Rvbd8gRT+GcUFxSY27VRYJ8hfIJ/eA+FD+EeCq+JcVWYMoQGcseY9wOgP4VU1ukNhjtcFSxAKsY5TKgkd4j51zza1vpPpCTEdfPp8anuISCT2HnPrUOmPXapOIjbPr0+H4U647ZJVgCIMr/AJ1q1Imsq22QR6A/69KR/aQAbTPpAJM9vWk0+p3cq23Y7duG6GCZE+ycT186tXOG3ATiCrARKzLQe7CQNwk4rnauVAZjAUDPQ+vl51CppL98ISji4rqcztj5A9DiDNMt3QO5/d/8q1BJcNQqjFJUSAxyRI3YIHyn8K5tQD0b8I/ma6xAkyM9T7un866c1npH+mjC7Wnyx164+NHPo5xNNNc8VwSty3DgLJmQwEAgxjNA9KvP4vLg4BOZg5jy/MVKXHfuSf4dK1brE5xY47rkvX2e2CEYzBEEEwDgkmK0/wBG9YzacESxtFlwskIs3F9w7dPOsXeaLsKBlPgZ7jyPSjn0Tuyz2dzJ4q8rCDzWsjBwZzXLv/y3zfbUDUBTkBlUkcqyxSSWAHLzDeRA8yIxXPDgsl43J2yWkQvYuu0bYIHNnuJpLurJHMbgMPLECATBbwyVgSQTHL19KRmAhoIdiybiQrGFgMjnMboMgdZGRXjekr6ogpuNpHmBLGNwKFSnWQQFyR0PWmPdVi2baEliVSQYAgwTtDzzYB7d5puku2rrBURd7pDKV9rmUkTsA3TIJPfpkRUlhAw3Ha8LCmdpYHPSIYkTIEQU7UEFwEgvvEMBuJ5T08tvMSMgE9ekyDWc19nYxxtzEQRnrieh74rVXkAOFJWDsKtIImAQMqqxjIPQ0F1NlSJlnX7IJhvZBj/dBMeUS1dfj6yufcM1OtUoL7K0khbuwZ8SMMeYYcD94HzqJOMFOouLuEiG7fH86qaXUBHZbkG242XApkbGgyp81MMD5iqvEdObdw22bcVAAPYpEqR6EGfjXsl2PP1yMH6QjzufJa6gQtnsrH1Ck0tX0zj0bUadLit4ggbeYrymIAcMOsyTHY1keNfQpkI8Jw3LO05PaNpGSMjMVrLl0tuICbgCZcbCF3ydrjKkNGIBAYde81nUh1ICqYJARTuCiSVI2tuIODIA9oyfL5U+Trn6e+8yvMuC6drWoU3A1vapYSOsgqI+f4UZv64Akh8n0mtPq+H2XB3BQ2C4HMhny6wTK+UistxP6M7TyNtOCVMwAwESCCy9Y6mvTz886+3G8WfQDx674hVsmJHSB5/nQxRRDWaW4vKxaJxklfhVVrJFennqY52K1wZqfSabfOYio7ls0tu4RVtZxbucPYx4Ydj7v4RTLvD7iDc9tgB5ipNLqAMs9wei/wAzIq6/Fk8J7cOdwIlmJM9jn1isW1vIrcPyCAJ5gY+BH4GDRDiVp7iKEsXOUzuJ5TiDAPScfKhPDrpVwQpPmK22gcECbaIoWd1xm548iB1x+Pes99Z7OZobodFcRRvszkMBuBM7QswHFE7mlDFBeUjdkIRG7qIksRE/+xVvchBgeEVO0g4VmD5BJmCOXMjvip7umLOy7rtsE4CBnPT2WYMWwv3SB7zXDr5LXacmWFscq23W14hgDeqMp7rtzuWDENHbOalsAlSVfcbZYbZUMYI+9IAMghYiI9ap6PU88NklYDXBDbySsMs/aypJE9CT0omXKjowGyUg5HI4KZST0IiJPm1c60amjS9yBLcqWQAxvQwSOV09k7CB2AYjpBrOcR+jYVd9rEKSUYyCQoJFthIeOatStxQgw8KH2lkbeoXbKwwJZDJYkAFYEQCKsMsQAxVAAATcblEIV6k7SDykGQQ5PeKc/JeVvGx5alxTEG2fKDP/ANRRrheh09xCzIXAIC80Cdo3d/vTR3i/0Tt3nDptsvvgzAV1JYGAJE8pIPcCqV/TpYUqbqoFnlySIOcAfjXonyTqON5wJ4nZRVItW9pOMntB/GhWraGxWjuWbbZXUWz/AMLSfWREiqL/AEaJ5lugg57n8RW51jGVX1lkrYsyglpKtM4iSAJwJM9Ki4dqDbdLnayQT/zNn8JruL6B7exmaZkDOMR8qrqcwejHcfcO1WX0me3oXESyG508MEly20iRuuKQd0FcMSDnPxqtcA3hZRQVJTddZcz2YJBSfvEyGFCNN4lxEub4baQ4iJtgBVIGAze0JmJmptIpYBGYBgORdqMu5Sx2uVkwR1I88mvN1PbvBVUD7VubweYCFCbCh3OyiCQemZgmelSMxYjftjJk7hzLzErEjcYU7doJFVLOoVlth1A5VBUuVDI0yysoH+9ymekjpU122bfhlGUyDysRLLucr4YYEblOJgtJFZaWXWSTBwIP2kKsTuJX2hEdCcAj3UNv6Fdu4IsxuBgqkZ3GCJKHPMOxAxRS3f8AtLlSwIJIQqV2kodyZQgbdw29p86i1OkVkCC24C3Co3bSyloMncTvEyBt+yD1qS4lY/WWgomGkmOxXrnM9JJic0S4bpbepTY6zdsqdmSN1rqVx1KkyPQml4npdpghQBBXEADuW3Z7MDAnuRFCtJqWtOtxSNyGRBkH09xGPjXp562OV59jv6ijAtsfdfgfLcP4V1WzoN3N45Tdnbvc7ZzAMZA6fCurPl/q+IubzKSbbqHCsZYf2gAG1gvUwBE9eU+dRWWferKtsllAhP7M7iAWQnKGCG6diKrnTyoNo8yLuKMoQyCZ2qyypZZ5hOes0+1fRk3LDC4wZR40m2YBA9kSu5QIPZcdjXlx31Y04BChpB3E5O4rJAAOJPSd3SMGuAaAF3NJMgqoA2iMgxy4JwOsVJcuqGU+MkbjKiGGAwK5XeplvIiBVZ5JBCKWDEyVAU8gWd0sWyAeinr0rMntVXUcMRl6mTmHXBE5iJBwJlTI71mdTwaHYGFAOIkyOuJrT/o92IN0n07R7zLefec1WPDW9Pxrvx1Y5dRm/wBWqOmfU1Hc4YT1j5VpDw89o/H8qVtCexHr2rf8jPizH6lNS6fgpcwoAgSS2FA/nWq0HDybi7oKTkGRu/3QZEE4yTFW790WiT7ADQ2y2HCnqqlj08jIORip18q88aEaLhVu3GQTiGGWB3QcfEGVGBVvS6U7GgK1xdwZGEqkCZDP1boZGetTXNODdAII25ZNu8EMSC1sbgsGRIgNHyqP9AILO5YuoJPIq23UZlQV6QsSZ7ZPbF6tbzEZhQDtSAZXbPUrJDL1AgZJgc3XNNtqwYFVVGFwMpthk3LtQdSYUsuCDOQSJmrmlYR4UMA25QLgBUgKhXBUqgIwCHMbhgDFM1uhDEobsFcEXiFkBGK+IVBVpjbuEdQIMVnVR6xEVg7Lclm8KBMwCGQOGA5tjSpzMdPO3u8NgGwjCVbKsHVuWZAIB3kGOgboKS1o75RbZe2YAMMA5JgkRg77QXEQCB3IpvD9OSj27dpBu9m24ZXG4EmH3fWAwwzECM4pQjWXtM5YsQBKEqGYQYOXyUAG2JMh47irum2lYV7alnU7SAUAwAEUkGCwMr1kkR0plrUNtO8bYQsUXaGKLbAcRmcsrAEzySD2pbj7uXme2PtJckgDoLqEdirbgv2o8qzV0/U2HExa3AleXbLKeeQMcy4IAPN1zmqXE9B+kozNbkr0DHYxWcBGByATgEfOrd64Db3r7aMDuJIeQqgh42lZYRzggGOs0+0/hlgElS7Fip3FcBpYkCUZhOSYg+UhLiV5vxPh72WbAYDowHNBx0nGf41LwbiZRdp9kHl889fhW51enlYncwchoVi4lA2RvG0RzbjAmcCazmp4Ku8LIRi0cw2rAE4gSZHf8a9HPcs9uV5DeM8TFxAsHlMg+m0gj+HyoZpLDXMorN1AgcuOuekCcmtInA0Ubru4iVmGyeaOVdskNGOvScUU0l/aEAW37SsObJ3ED7DDYZ6wv2fWr/JJ6h4UH4fw3aUNxgpBGEBdoIjDZGCCYGMnOaKpbtwzK6mHIY7+e4r9JUAbBu7dQT6VYc3tzIUJW4xLqv1YG47jzkZ5iRiTg4mmcTsFXe+VAQiIKM4T2Rl9qkMYPbGJrlbrawi+NlYJuJvIk8uwgAbicGQSVJEiek1HbZ7abcEOfEGwLb2LE7xvY+eQR69qpaBvDumEVBADIQ7AqQTuYBiI2CfabufOrVhxAa3cMQWZSyESBBBBIK7o3Bh13elFdd1KiGuSAxjdG5TugqQFMjoQVGMZqe3e2MVLoVdip8QHbymRBg7JJjrAnpim6O2AfCXIPNtH1ZY3IkbpKnpI9T5Gm2rhIUghTcG0yFYAE7oChtpDBT7H+8CAQKlEmldW32mS4FYkhHDGOjALCnBkzOYPwqpp/o8ouW3tugCnmQgK24yVPWGBjtVjTKVcIkta2FdwYoiNhcEFmmQuDAwT3plh3QZBVjhVZgFJDcwW4E2ieY7ZOcRVlqWDhcjDEA9xEV1R8O4mz21brI7qxMScEiAY6TA6UlZymI10FsGQvMYk7mBO3pOe0mu/QrX91b/dB/lS+L6UocUVMhEYUD5fyphaO1Rl/L8ajNzzqYHs+fZP8qaymuAHanAVdQ1U980w2alVjPp2qQsaEgL+jFLhfwkcOArHabjqOsqpwTRBOMW3D9LUEEjY/ibehChkK467RI5u1WlY+lTIoJg1LWoq2ri3RDXGuKrBd5tEy0x1RADuB2jPVflVvgqB9Y9sQwBba0oCwcbCq81tSOWSebvVu/w62W3bYaQdwJDSMgyPWorXD0A+ra7bkyYckE5mVaQQZM1NVx4v2N1CVKqHW4gQruhW8NzjycSMUzUXwYBS+XV1mCCQTc3AGWI8NmTBMBQwImRUlzRDcWFy4pJBIBhZEGQoELnOO9QPonZAhuAoGLCbcMHOQ0hhuIORMjtFVNQ6a14TW9r3grg7h4d1myGG5lxtIBVTmBGBmpNVahmC3TcZHTcRcRXV1IUttLKEQiMFT65NWr2nvuWLXLZZplthByoUGA4BIAj1Bpuo4QzlrrFg5IYm1K5UADkkqRyifOhpHuFRsZABdMLMhC0wTbuK23dCuSnIRGScV1uyBdZJUMl1mKO6s2y4pDAA+2rYPbBEE5NTfoDEQXBBbewewvMRuB3AxkhoJjsKq3OFnoGUrAU27iTbIBDKMNy7ckY79KGn6ZgtogWQJlQoljKtt2F+U7oyARuPXMVMt9NzuHBdOVvEYAlVABDEiSh5hJEyJBOaZa05tMzpbTw2ZWKeI20QDP2cn1Pb509bNxhDsowAQltRJDbpkgyT0PY586YalUg7Llu2eRGVgrpuQYTbglWO4SCYGIMTQ/WsGZjbuoHxyj2lZZJkxtVc7Qcoe0TVptIRui9fG9w5gqOYdCIX8OlQ2n1Fu4Lg234+zdADiAfZYADqSZic9aGqeo3ErtuWlZfsEm1AYCVllC7DDNAHYRM1Rv6e2x8Muu4rM2wW5iQpFwkLsB2gZWRntFErersBBvm3tQp4V0EbQOoD7WiZw3ePjVpdI7oATdJRA9tlUw6kKx3ycmVcdIPlmqBes0oVFR4dUnMspzgc2wEAxAMFcYJrrTFSkWgXZFLC5dAt7u3UxJAjBHaRmrmptm3c8QObYbmk2w53ud0PknbtIE5jNQm5yRctNstMOQ3NylGUSDzbYaNwPSfXFUOZlCldjIxYHaedYUYt3QvssyFgD1OCetNvadbklLjJcTcu5g9uQBFud8qdp3ALiffUxtQ6PbZ2XbsUqxAGDG11bJhRIZTkEU1bQZAHtncwAJgMtzavaCpJO5cZjaJ86gZbwoL85LEM6h1YuoBUOBlcAkEiMA5EipGv2xutm/uAAJ+2rHIZTAC2yyhSCIO49YJqxf0/hkkDa/I23nO4iUwWG5Y5QQCRJHaqd4EAXHb6tl5lBUEWyYEmd25YjvPTvSIkFwndtd2KqRteRvQiVV1NsFW6wSYJiD0FU9KQ4YJtdOpH1gcbirZbbAgmQxWI71PpLZQKni7kVDtLDejquWVeVZPKGGZDTSm/9WNtpnDdBvPNE7m9oDmUgAR0nFUSM9sEh7DM32mFgNJ96XNpPu+OZpaG667f3t4dm3s+zuI3RHRv94dD611DRwGPdSPcA7jNcjEEEHPnSbf/AHU0RXgzCAVEHrGT6GlS31984EAegz0qTaBUqKD6VQiCnY+PuMfPpS2k9/zp722xtAPnJj+FQJbbyirFv3/Gks2dozJaM5kfCnNgTBjzgx8+lTRKrj0+VPkelUM5lioWSZGRHp1K565qkNYiSLjkuw3IVkqAJndMETjyIqArAOcgZ6gj8DmnrZEgHlnp3npHQeoxQwcQU7fq7TIQB9Y20kzA9lSduT7XWapa/WrZtLNkgO07gwYykxG2ASFgHEGenSrh9tAdMAzKQd6wCsGYb2SPMGPh3iqN7WIFdkty9s5DbgpQkqGXll8joP5VXucTuiWeyzLeUeF4RJCsWCzuxtfuR194qxxHVqFFhd+0ndc2xutsGU8p6bj1gT1MdaBeD6n9ItPAHiIoJCAhyv2iu4RuA9M4q1a4lZlpc7QdpuiDbkAROeWRBJ6STFUdDqbrW7iC8zOOa0ynbcAVlkXQwmSvYA4mk4dqUcbWKMwtDkX+ye0CS0IRPiAbsDrQwVva6ygUvdCKWdQT0BSJn5gio7pt7Vc3URLh5WELuaPtbu/TqBFUtBxSzvc2bgNsruCqRyBTkm2wGYmVU5E96dpOGgcoNs3NrFVhgpRTJABuEDdtiIxg9quAgtsN7LBvdkyOvv6/jUN+zB6NB9SBjrB6D4UJt64bLdy7bYrsBaG5SAIMADcWgKSDEESCKm0+pW3bt3bTE2wevgsYttuiVBO5QdoLYOR1oYJeC0QD8esfAmT8aQK/3Z6y2IHlH+dDm1V5lW8q27h9rYEI3bmgQ2IK4mQOnWitjUh3CwULL9oyQ69VEYM83X7hqCNSYIO73EYz69MVUPCF+w120RMFHMCSCRtYkQSAYEdKINe2khpkdzAEeYPdc9e1KGnPyg/zBg0SA9yxqkLf2d8Egje21oAEiAAuYEmc0MOla3vA01wK0LtDrsK7pkkEFXGDOela2ZqEpJ91NNZrUtuMeHqrSgALttbtvXmLAc5HQnuGqiuvtvutlwWTbcTx1M4VgbYBUHd1IkwZUVr7yDz6d6gct2arpoBf4grJyXEUgsCCDzAkEjw93SBgCMrANQW+J2gI2W7fiKUMFQwJaAVDEcu0ElXOMEGtPJPUzUV2xgjaCPI5HyNNUCQ2yTbRVbn9h74CAiUY2wrE5B3A59qIMVBcvbiLlvwmIKKY5gGXAkEE5HLgAEx5wD1zQK0bkQlciVH4UzUaJXB8RFb4ZA9CM1dShjXtUpIF/SqJJ2sSGEkmCGEjr37V1TNw5Puz25kVjgRknJrqvoXYpwBpy2j5R5/5U8KOsZ8+9YU0JUifhTXBpQDGaCTxSsEQfQjdP4j+NdbusBmT6mAfdHYDtVTUakKu4gkTGB38vfUGj1TXLdxXVUG0neyKY3CV2ywJJ9Jq4goVuOr7FClRB8QkNkdgM95oVpr3h23takO1uSLhBIRTIgEtEzEiM0MPDrsPcSWdV3Em+WOIHSACcT3Iiq+u1LXo3xeZQQwIC21I6AMSJEdczNXFErmuRgjiwRzhUCnBRSTgEbhj7XcLUnFNKRb8a2LhtGSrMdyoWEZx5/PAx1oToblwEeGls3p5tx5j0nw9wgIOnXtWg0ty/Ztul4sUuAquwC4MgkqYyrHMHpSzKBFzhjm0zW7VxdrEzcB3OdgCxB5e5gwBAzV76KqhZka66ASwR0QqCRk3BnrAxIIFAdJrCHuJd/SVQvtXOxl3AZuMVknPf8ado9ILeoRRc0/tGSzFxvAEONyg7PSTmriCml1zHJtP4bXGZfAunwkK4ImIUjJz96pNTrNVqADZG7xLY3Eqq3AytyjxJAIwTIzUL6YXNZcuak3LYkeIqcts4A3BohpAnAzihVqylu4os6o7XZioZGN9IaFDqOuOhwIHSkwGtcbltdO+qRg6yBcVhJDHG5kb2liQTg5Helv6qWXxmsPki1eO625YODCsBy569QJpzaZmsw2otX28S3cVfYRkDMCFLGVaVyeuPWprbMNRcKXGQQRdtXQpPiMehIIVkblG7JysyKzVJfuXrTm6u29bMr4ThfERQCzq7YGG3c0jtFWEtMNMSbxZ0b6oOuVDELtD78kzEgwY7ULs3dTYe62nG1WQsqlFuI5gKynwuVTOZIH4mn/RrUfpBbTNplhUS2xgKyuh3khWxu6DGSAKvs1a0t++lotZvLfS4wDB1hSrd27rcxEEQZETVcWwtxrthii7BdnxCWAZdrW3QGQm4A7wuMdqs8JvFjcW5p2tc2w3UY4YkbeUsw9oL6edR39IL1kW7bXjdQnF87QhZSMMEB2mRy9DJkdKn+CXTPde3bNxlB8UhfCAcQbZ8jzoRBYRPTr0qYa5CAt8kW7wEOLe1SQF5g07laTnr1noaAcNW1d8Kzcfw3ttIurykNMEMDB2GOuCMeUUTt2jYuNbW83hqm5FRlKyzMnMHEsvKARMCfKtYDF3UugCi5abUSWUO0q4QRysFCi4eURP2s03Q3ndHQW3tNG4CZsjbO7wnHScd8T5Cg2m1N3T2ltvqFsuXgK1ol0xykNuAIMAyDEgdas2Ldzxg7P4iFyylDAVngMhQt1IEiCZgx5VjDFxddtVW8YG0zFfrPayJguuQykkHHQAiRMF7lgjJOJgN2PxoTd1sqSpGwozKW2lkCGPYYhmA6EhjMZFVtPpnQgW2CbINxUM2LttutwKfZZepiSPxpDBrwpFRvazUK63O1gbbxKhz7a/eUwAw6Z9asH1FXDDCufTt2pGFLMkEER3wZPuzinioKbE00v2nr6VbNqajCx0qCsR/qK6rUeh+VdQRL0pCp7UoNcWFU0hNU+IXmA5Sg895IEfCpdReCjJj/MxVa94S3gLj2WUDn39pjG09+8+opIILF03rJNpDvVwHuKpZSFkHoRLfiwNU7xf6y7pxpgyhVxu8QfZlUIhDIjEwauPw6yL5C3UuC6Sw2XfDFgdVhRhj8OtR67SKbl5VKg2+ddnNeYlACXYHOZ5fdWpUofw/VgN4i3biknnXbPpzERDSCYIpNcIckgqrtB+qg46EoObcep6UxGcIRZSEdRcmdp3KepkyZzk/Cqes4gz3WuNc5CqLuBgE5XvloA7VvPaF1iqiNcQfWD2o3GRPaZPrUDcY1HJaIdUJ39CGMCB17SabbsJLbLtwEhihQTceMFSOirIma0/Drd9bbQboXb9YjqLjC2RBNokklvMEe6rcih3ErvjPb5btu/KhiU3NtVQFZI/tBg4HeDUX0geLj23Vb11lQDUMNptiWMRgowzjJq/9HeMslpbrOWCblXAC5MKpborHBj8qEanV3Sge5dUXrTnasFyS0ISreXl7qzPsrWcO162zbL3HfTXV8PKbWFzJYEDmAjII9aktXLh+stkRaunw3vLufapJXmUFjbZSQSZgifcF4Robt1R4epuILe9uZcm4PIyCMAjPnVfgOpuJfNm94rkttZLZIbeCTD7erdSQDGZrOEUeLXLlu+bTNvcRuVeihyGAtAe0DumOvnRjXmxetXYtahLq7fFYsC4CAZNskHaV7gYwaq6/RWmvlPGZVtqXQkAXOYYXe2cFWEkdIqzw5dSiC/tT6tSxFzazsGUKDuM7twBG0+XarbKf2r8H4gujKAXQ1pyXDDDFsiCJ8jkd9vpTeJvas3JR2sKGMNsYlmAwHB285kMDPs1eu6Nv0s3bYCi7zDbt8NZIACEECSJn1HTNXNRxhCmpmLxDW2SbYFwEbVYkEEYllnt1pv4tBSWDsAt1muurLea25Uvh2BA5TEHselFuGLcuPLK9hrikBWlbF8k/YJHKGA8xB6eVJp+HrdtOLWpuBg6sqvBg7oABHRuYjd5dqH2NYBZa27O96zfDLauMVU7iUIjEleucdTT7QU1+lL2Aws8rXCbhCqQrB/7wMNgywMkxtFR3U01nUg7n0z7QDncptzykdVIcesTJim3dVbvbtPdsmy6keIEYputwZKheV+x6ZjvUOkS41u4toG8qjaC5lGSShRkPQg8wwPfmoq2ODDw1W6L12zlRdDSLRkFbiicLDZBEDafOk0HDLi7ouOo2/2gUhgVKsMDcG6encYmqdi7fW1bR2vbhuW6u3YyLBPi2x9oAAz1Gal0erextvBnuadOYXYwFYKSHVTPUeVMNELSDwbd47Lrlj/Z2t6nlJbcgEpuAE4wYMVd4bpxCm258NUYssCBcVdvNj7Q849mg+n3szPp3vhrim4kPCiGLFSpEwZER2iuXiWmW8twlVY5dgo2XQzdcHlYZ6ietTFGLd8KLStcSbalSlyTuTcMBhgwR16jyqEX9rNKsSWSdrTt3KBME9DEyCZmotSuxxf05DWLrqTZ3Qq7mAZlIPUMZx97yxVxGUXLtpthkKbYbGYyR94A+s4MdqIl3BYE9T6n51Ih6xJjJgSQPMgdvWqmnvlli4Abq9WQwrARBnorHBg9Qam6FWUlWHQglTB6iR1GBj0qImVvKoi+TAB/D/3UalmGQQT1nvntFPFz8qKermupPEpKCAiar6hwpjMxPQx8+gp5eqHEbDOMXGX0AEH396sRBqdTp2Oy+zJI5GVCTPaD392aTxrN2w/iLN0uVtMU2sHxs3ESJ9mQT0qrc0902ylw2nCkFGuLuKZkhRgCenxpOG2V8NV8W5LczeGGlCuCfukEiMzHatYLDadWZBqUY3pP1qdGC4AhCDt3fH+FRakJctNdtbbNzKCXkYbIgLkyCQSxolqJC2btt/FS0rLJgMrSCTIj2h3xGygWp4VZum5duXbisSSMqAHyT0wQTHY4pFpL9rUWYUNaFp1hnDbgNoGXxJbPYVXtalLaDxrZLFT4V1VzA6kScLPmMzRLg+kAtBrRd74IDAkFWU9QAYA7ke4daotolukiz4yLci2TcYECCZENzTgiPOtSs1GeI2WbxQhV2UqHUkSWIz5SIjFE9Fr7dm1ysLbONiseaGEc2MyBJoR9K+EGybKpcDrc9ieq7IBEeYxV21b0ZsOt0kXFHI68zlp6CcAHuOlLJSU269xFFuxf/SNO7AXdyoiF5BAy3Sck+nek1er1N4mwmnfxLYhYZVghwScNDDAhfkK7X6OzbNgObbpqFw4ENbZCCzFZK7oYCaJ6ywjMLi6m4Lisu1jsaZKqMKASQD+FNxQe7r2tWfDS/v3jaSBsZWGOY5CicZirNvWLeNu4hSxdXcAVBY3nnrcYGcwc5wT2qXSajTC8yXLr6hbbxbLbrbknaXHJkkNuInGO1Db2jC7yh2FWLPbbF0KhjbbYA7224Md56zSfg0Os4ubWsI1DpcAWQVT2VfBVpJ3KcEg9/KrH0gZ9PaYhLVq27qbUQWKyD4ZaOWVLdSVgkTWI1GguzcuW1bZf9k3SZheUjcfaMk4rR+A9tjp0YXVbS5SHue0GWApJgzncIA8qdcyEV9VYu+Kl1dPdto2yVtqDzMrSVKSEmFwe89KbouEWwoFu74moJO6zcItgTlw2NykH4VHrdNbQWBadrNxt5K8xUsgwSsyp6r+MUR1Fp3W1ev2oG9fFNwG3lkW3uVl5m6CRnMHtUAjR6MMH0xXw76kO29jK7ZZlUZBJU47HzqXimkQfpDaiWuIBdsOW2lkkYwYMqIPqKmv8VTT3LljUaZLzWyAX27mKkDad8TlSv8KS1qVZbpOnu20UlBddXY2bb5ZWBOUg9D94VfpXLq3cEIi+E2x/D3Q1rYVO8O3s2zBEgmAR8Luq1S3Wu3Le9Et/29tDvPLJci4CVIJAJEyYPWqOq4DqLSrdtqLyAxuVs20+4wJllYH8YNNX6TOdUL24WkNtSwQBpABUkjoO2D2FLNTR7h3ENQ+mcOqXba5k3tly2sETnpIMRJGapro12q1u7Ytk2tzBXK27s48Mg4Dyp8gZGMUK4G9tHtuty4wO5WtltgIwVZCsMqn7uYgVNxC5c09/UtbHi6ctN1XCkc4DEMoyVyIYDzqZ7UW1PEmJsePbdDYJlm27ecDb3JEleoBHlUXFHteJqStu3cVkR2G0MwdiBiDOD5djmqVnVD9FeRaXa+5BcuSQoJIVVIMkAgZ67R5UT1iiLGotLbBfChxCSxWUBiBBG8A9mMVBPo7169pmCW4TwzcRkCgKyQV2jzkR2kE0+9qS7p4rC3c2IOVgbkuTIg8rJEY6jPWh/BiyO9xblsXLZIuWPZG0yoCHofl3qe1asanT2i6OdohbjSuQYgt59YPQz2NSwX+H6S2U3bYaIZIZUMYnaY9RPw9Ks6XCLAEARymR8Kr6GyqLCSfMzJnHX3x5VZN3zrJqRLk9QflUinFQXCRnIHqcUgvnzqBHtEmRcYegC/zFdUo1A9a6gGePPcEiu8QmkAA6AfAR/CuJrSGsuKBai7etNvs+J3kKNoz5ic0fpria1LgA6fj9y60XbaSogMVEheygHBzme1QcX0u9bu2xdm0qBGWFQuRuOBgmCAYH2TVjiXDSsXLZJYEHaehzUd+9da0ysqKzPvLIIbv8vh2rUn4i5wbh2RbJe3caGVycbSJO0NG44qHiHBLjXjatXlKoBcgsFuySSY7EnrJ+9QfRk7063AkvcG0g+oJ+0AK1H6tF9zqtOEUIJe2cK8Bu3Y+yMwDFL6qz3AHQO+qtlWusFJMMwBdp7dMD+Jqra0fisyMoF0SlkqYAYYUkmBE4zUjaxEDFNNct7yXUGYh+m0RC1peKJ+k3tOXsOq+EBbK3IAK5fcexGMVbcTALW6WdO1rwQLll4LZJUEQ5YiQBIGemKJ6ELb/Rv0Up/aQxY7bkjO4sZO0yRHr0qDSWW02quJqgQmoQmQxh0cFZJxzAHOBFRcR4HatPA1Hh7XGx2lma3cGQwwoKke0OtTZ9KL3uGbNUzNa0jPsa6cljdLlhABGGG2JxMihFl2S2tpLwMXF2rctsl1V2mWRSZPVh64zS3tKpsm/YR7t205F64GY8id1AMEdcAd6pa/iaX7NpXuHdZZirDLFXAhZ8t3akgM6zhYstcsidRb8HxIc7XDEN7IJxckTy5iKErxZ7Ny2dhtBFDAA7pg80kSYiBmiK3SdKEvIgcnbaviCQ4AhWIhswRBwZ9K7jml8DwdzB2a0VZREFHVt2zao6GOvnUn5RX4426+2p5tzxtuIT4abljaxiFYxJz9qiHAOJ+Iht3U3qbbQntF3nBGeVoODVW9aDW7l2zctLYv8A1Zs3QViEBEkT12HbjBqHQcNvwFS7Z3IXTarSVtoS2DA3mcATVuYibijPp0sm8rm3dCghn3NvEjarW2mDg7fd5Yi1+nvh7qac3vrllluq0qptiSzxlAcT+VXdfwzVlbdu1eDJdXem9dqFgfZmTFyRI9KF8P4oywpa4GJ2SRLIzEiGPp5SJ20n0q5wnXXRbu6a8ux7g2ruMKziPZYTOBgjEkedRabVWdHefYyoXVmUQZRsgW7qNAgntHfFEuHcbu23bTX9jqm8DxI8NynVVb1EkTUF25eQm+LcwCLlu9BYqLgXBjnXaV69cZNSKqcOuXdHcm2qTfY7OYbQOuwsfZAn40R0OuuG8xXS2rZFsWmmZLWyd3QEnrHqPOh+t0Ntrjo4dDpwW5Z8AiZ5lJ3CQVB2nEdxUvGOH7YuqsEhGYWG9SHIVl5TO2TMdTS4hdDeuW3Nh9PbuQ7B7dtA6AzuIGJAgiD6+YqLVcRQB7elVvCuMVaywLOuwbgyqcqQYEZIqXUaBt+4MVR4DXSpMnszFTBYk7TB6jpmn8SS84QeLFwsQomIuIIgg825hENMe6KejBDhGsW5Y+tFm4yiLhOLltZ7mJYKY5hlSO4mouHcba3YvoxUhYBxuth1ywwO6qxEdflQTUM6surDzciXUsN25EAbAEGVKmDkwaLWYuXPGtL4LEyWUAq/KPaByGmZqWAnZKsFcANyyrLMERmCQD8IqRpJB/nVbS6UKSCpgwSQZEx3B/kKt+GR06fj/lWapdx7mR/r50gII9PdikaY6T6VH1yJBqIeSfKupAPU0tMNQU2lrqsDW6inV1dVVE9Vrg5X91dXVrlis4bpF1QCQGZQQDggtkHzFX/pdfZNfqgrMojoCQP7L0rq6r01yG2rrNbuliTzjqZ7VY4fqH3DnbC4yfOurqnf0Qe+nuUQnJG2D3ElZjymprnONEX5ouXI3ZiEEda6uqc/UWJNMxXid8KYG7oMD2UrL69B4+rWBG9RHaAsxHlNLXVrkqpYc7rIkx4nTt0NHvpOJdSeq6dtp7g7z08q6upPuM36QfQ4y1sHI5TnOdrVY/8A9DUW7z+GNk2VJ28skyCcd470ldU6+1gtw5j+qrhk8sFfQymR5HJz60NvsTauE53aW2x9WD4Y+betdXVJ/a/2qcPG65qd2cOc5zC59/rRS8d+mt7+aHAG7OCrGM9pAPwFdXUome2Dp9MxALeKwkiTG0YnywPlV+1p0FkEKsgqAYEgenlSV1QoJ9K2Kau8qHaovWSAuBJtseg9QPlRv6SoP0DVXIHiB0If7YMJ0bqKSuqjObyxsySYtIc5z9YJ98Yo5aUbh6xNJXUqLF8xtjzqX8q6urFCCqWoMFYxLiYpa6oLDda6urq0r//Z"
            alt="HRITIK TRADERS team"
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="absolute bottom-6 left-6 text-white font-bold text-xl drop-shadow-lg"
          >
            Passion • Precision • Potatoes
          </motion.p>
        </motion.div>
      </section>

    </main>
  );
};

export default AboutPage;