import { motion } from 'framer-motion';

const CardHover3D = ({ children, className = '' }) => (
  <motion.div
    whileHover={{ y: -16, rotateX: 8, rotateY: -8, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={`group relative ${className}`}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-green-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl -z-10 transition-opacity duration-500" />
    {children}
  </motion.div>
);

export default CardHover3D;