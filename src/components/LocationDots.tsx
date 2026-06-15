import { motion } from 'framer-motion';
import type { GeoLocation } from '../types/weather';

interface LocationDotsProps {
  locations: GeoLocation[];
  activeIndex: number;
  onSwitch: (i: number) => void;
}

export default function LocationDots({ locations, activeIndex, onSwitch }: LocationDotsProps) {
  if (locations.length <= 1) return null;
  return (
    <div className="flex items-center gap-1.5">
      {locations.map((_, i) => (
        <button key={i} onClick={() => onSwitch(i)} className="flex items-center justify-center w-5 h-5">
          <motion.div
            animate={{ scale: i === activeIndex ? 1 : 0.7, opacity: i === activeIndex ? 1 : 0.4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`rounded-full ${i === activeIndex ? 'w-5 h-2 bg-white' : 'w-1.5 h-1.5 bg-white/60'}`}
          />
        </button>
      ))}
    </div>
  );
}
