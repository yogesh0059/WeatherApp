import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Loader2, X, Plus } from 'lucide-react';
import type { GeoLocation } from '../types/weather';

interface SearchBarProps {
  query: string;
  results: GeoLocation[];
  searching: boolean;
  onSearch: (q: string) => void;
  onAdd: (location: GeoLocation) => void;
  onClear: () => void;
  onClose: () => void;
}

export default function SearchBar({ query, results, searching, onSearch, onAdd, onClear, onClose }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="w-full"
    >
      <div className="relative flex items-center bg-white/10 backdrop-blur-2xl border border-white/25 rounded-2xl shadow-2xl shadow-black/30">
        <Search className="ml-4 w-4.5 h-4.5 text-white/50 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search cities..."
          className="w-full bg-transparent text-white placeholder-white/35 px-3 py-3.5 outline-none text-sm"
        />
        {searching && <Loader2 className="w-4 h-4 text-white/50 animate-spin mr-2 flex-shrink-0" />}
        {query && !searching && (
          <button onClick={() => { onSearch(''); onClear(); }} className="mr-2 p-1 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-3.5 h-3.5 text-white/50" />
          </button>
        )}
        <button onClick={onClose} className="mr-3 p-1.5 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-4 h-4 text-white/60" />
        </button>
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 bg-black/50 backdrop-blur-2xl border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
          >
            {results.map((loc, i) => (
              <motion.button
                key={`${loc.latitude}-${loc.longitude}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => { onAdd(loc); onClear(); onClose(); }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/10 transition-colors text-left group border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-3.5 h-3.5 text-blue-300/70 flex-shrink-0" />
                  <div>
                    <span className="text-white text-sm font-medium">{loc.name}</span>
                    <span className="text-white/40 text-xs ml-2">{loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}</span>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
              </motion.button>
            ))}
            {!searching && results.length === 0 && query.length >= 2 && (
              <div className="px-4 py-3 text-white/35 text-sm">No cities found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
