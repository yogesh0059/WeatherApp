import { motion } from 'framer-motion';
import type { HourlyForecast as HT, TemperatureUnit } from '../types/weather';
import { formatTemp } from '../utils/cache';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  hours: HT[];
  unit: TemperatureUnit;
}

export default function HourlyForecast({ hours, unit }: HourlyForecastProps) {
  const now = new Date();
  const idx = hours.findIndex(h => new Date(h.time) >= now);
  const start = Math.max(0, idx > 0 ? idx - 1 : 0);
  const visible = hours.slice(start, start + 24);

  return (
    <div>
      <p className="text-white/40 text-xs font-semibold tracking-widest uppercase px-1 mb-3">Hourly</p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {visible.map((h, i) => {
          const time = new Date(h.time);
          const isNow = i === 0 && idx <= 1;
          const label = isNow ? 'Now' : time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
          return (
            <motion.div
              key={h.time}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.025 }}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 py-3 px-3 rounded-2xl min-w-[3.8rem] ${
                isNow
                  ? 'bg-white/15 border border-white/20'
                  : 'hover:bg-white/8 transition-colors'
              }`}
            >
              <span className={`text-xs font-medium ${isNow ? 'text-white' : 'text-white/45'}`}>{label}</span>
              <WeatherIcon code={h.weatherCode} isDay={h.isDay} size={20} />
              <span className="text-white text-xs font-semibold">{formatTemp(h.temperature, unit)}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
