import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ floating = false }) => {
  const phone = '+91 8299789304';
  const msg = encodeURIComponent(`Hello HRITIK TRADERS!\nI want to place an order (min 50 kg)`);
  const url = `https://wa.me/${phone}?text=${msg}`;
  const base = 'flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold rounded-full shadow-2xl transition-all duration-300';

  if (floating) {
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.15 }}
        className={`${base} fixed bottom-6 right-6 z-50 p-4 animate-bounce-slow`}
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
    );
  }

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${base} px-8 py-4 text-lg shadow-xl`}
    >
      <MessageCircle className="w-6 h-6" /> Order on WhatsApp (min 50 kg)
    </motion.a>
  );
};

export default WhatsAppButton;