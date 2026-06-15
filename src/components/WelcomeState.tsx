import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';

interface WelcomeStateProps {
  onOpenSearch: () => void;
}

export default function WelcomeState({ onOpenSearch }: WelcomeStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-5 text-center px-4">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white/40 text-sm leading-relaxed max-w-xs"
      >
        Add a city to see real-time weather conditions and a 7-day forecast
      </motion.p>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        onClick={onOpenSearch}
        className="flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 border border-white/25 rounded-full text-white text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add a city
      </motion.button>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-1.5 text-white/20 text-xs"
      >
        <Search className="w-3 h-3" />
        Tap the search icon above
      </motion.p>
    </div>
  );
}
