import React from 'react';
import Chatbot from './Chatbot';
import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ScrollToTop = () => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return show ? (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 left-4 z-[999] w-12 h-12 bg-green-700 hover:bg-green-800 text-white rounded-full shadow-2xl flex items-center justify-center"
    >
      <ChevronUp className="w-6 h-6" />
    </motion.button>
  ) : null;
};

const FloatingActions = () => (
  <>
    <ScrollToTop />
    <div className="fixed bottom-24 right-4 z-[998]">
      <Chatbot />
    </div>
  </>
);

export default FloatingActions;