import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-5">
      <motion.div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-t-white/60 border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-4 rounded-full bg-white/10"
          animate={{ scale: [1, 0.85, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.div>
      <p className="text-white/40 text-sm tracking-wide">Fetching weather...</p>
    </div>
  );
}
