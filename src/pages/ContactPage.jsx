// src/pages/ContactPage.jsx
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Locate, Phone, Mail, Clock, MessageCircle, CheckCircle,
  TrendingUp, Users, ArrowRight, Send, MapPin
} from 'lucide-react';
import { CONTACT_INFO } from '../data/config';
import WhatsAppButton from '../components/WhatsAppButton';
import CardHover3D from '../components/CardHover3D';

// Animated Counter Hook
const useCountUp = (end, suffix = '', duration = 2000) => {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (!isInView) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * end);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return [count, ref]; // Return count directly
};

// Contact Form
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^\+?\d{10,15}$/)) e.phone = 'Valid phone required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {[
        { type: 'text', placeholder: 'Your Name', field: 'name' },
        { type: 'email', placeholder: 'Email Address', field: 'email' },
        { type: 'tel', placeholder: 'Phone (with country code)', field: 'phone' },
      ].map((inp, i) => (
        <div key={i}>
          <input
            type={inp.type}
            placeholder={inp.placeholder}
            value={form[inp.field]}
            onChange={e => setForm({ ...form, [inp.field]: e.target.value })}
            className={`w-full p-4 rounded-xl border ${
              errors[inp.field] ? 'border-red-500' : 'border-gray-300'
            } focus:border-green-600 focus:outline-none transition`}
          />
          {errors[inp.field] && <p className="text-red-500 text-sm mt-1">{errors[inp.field]}</p>}
        </div>
      ))}

      <div>
        <textarea
          rows={5}
          placeholder="Your Message (min 500 kg order)"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className={`w-full p-4 rounded-xl border ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } focus:border-green-600 focus:outline-none transition resize-none`}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
      >
        {submitted ? (
          <>Sent! <CheckCircle className="w-5 h-5 ml-1" /></>
        ) : (
          <>Send Message <Send className="w-5 h-5 ml-1" /></>
        )}
      </motion.button>

      {submitted && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-center font-semibold">
          Thank you! We’ll reply within 2 hours.
        </motion.p>
      )}
    </motion.form>
  );
};

// Main ContactPage
const ContactPage = () => {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);

  // Parallax
  const yBg = useTransform(scrollY, [0, 600], [0, 180]);
  const scaleBg = useTransform(scrollY, [0, 600], [1, 1.18]);

  // Counters - Fixed!
  const [responseTime, timeRef] = useCountUp(2);
  const [happyClients, clientsRef] = useCountUp(180);
  const [exportTons, tonsRef] = useCountUp(20);

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 overflow-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative rounded-3xl overflow-hidden mb-20">
        <motion.div
          style={{ y: yBg, scale: scaleBg }}
          className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-yellow-600"
        />
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center p-10 lg:p-20 text-white">
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Get In <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="mt-6 text-lg max-w-lg">
              Ready to ship export‑grade potatoes? Minimum order: <strong>500 kg</strong>. Response within <strong>2 hours</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <WhatsAppButton />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-4 px-8 rounded-full shadow-xl flex items-center justify-center gap-2"
              >
                Send Inquiry <ArrowRight className="w-5 h-5" />
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8HMFBTgr9IC4AQmEzVP4BsY-taJieyY4YpA&s"
              alt="Contact us"
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-8 border-white/30"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO + MAP */}
      <section className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          {[
            { Icon: Locate, title: 'Address', text: CONTACT_INFO.address },
            { Icon: Phone, title: 'Phone', text: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
            { Icon: Mail, title: 'Email', text: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
            { Icon: Clock, title: 'Hours', text: CONTACT_INFO.hours },
          ].map((item, i) => (
            <CardHover3D key={i}>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center flex-shrink-0">
                  <item.Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green-800">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-green-600 hover:underline">{item.text}</a>
                  ) : (
                    <p className="text-gray-700">{item.text}</p>
                  )}
                </div>
              </motion.div>
            </CardHover3D>
          ))}
          <div className="mt-8"><WhatsAppButton /></div>
          <p className="text-sm text-gray-500">Minimum order: <span className="font-bold text-green-700">500 kg</span></p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-full"
        >
          <iframe
            title="HRITIK TRADERS Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.567240553074!2d79.579162!3d27.399374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399e2d4b8c7e8b8f%3A0x8f8e8f8e8f8e8f8e!2sFarrukhabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Farrukhabad, UP</span>
          </div>
        </motion.div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center text-green-800 mb-12"
        >
          Send Us a Message
        </motion.h2>
        <div className="max-w-3xl mx-auto bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-gray-100">
          <ContactForm />
        </div>
      </section>

      {/* STATS - NOW WORKING */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 rounded-3xl p-10 mb-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: responseTime, suffix: ' hrs', label: 'Response Time', icon: Clock, ref: timeRef },
            { value: happyClients, suffix: '+', label: 'Happy Clients', icon: Users, ref: clientsRef },
            { value: exportTons, suffix: 'k+', label: 'Tons Exported/Year', icon: TrendingUp, ref: tonsRef },
          ].map((s, i) => (
            <div key={i} ref={s.ref}>
              <s.icon className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-5xl font-extrabold text-yellow-300"
              >
                {s.value}{s.suffix}
              </motion.p>
              <p className="mt-2 text-green-100">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ContactPage;