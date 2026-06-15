import { motion } from 'framer-motion';
import type { TemperatureUnit } from '../types/weather';

interface Props {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export default function UnitToggle({ unit, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-1 w-[4.5rem] h-8 hover:bg-white/15 transition-colors"
      aria-label="Toggle unit"
    >
      <motion.div
        className="absolute top-1 h-6 w-8 rounded-full bg-white/20"
        animate={{ x: unit === 'celsius' ? 2 : 34 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <span className={`relative z-10 flex-1 text-center text-[11px] font-semibold transition-colors ${unit === 'celsius' ? 'text-white' : 'text-white/40'}`}>°C</span>
      <span className={`relative z-10 flex-1 text-center text-[11px] font-semibold transition-colors ${unit === 'fahrenheit' ? 'text-white' : 'text-white/40'}`}>°F</span>
    </button>
  );
}
