import { motion } from 'framer-motion';
import { Droplets, Sunrise, Sunset } from 'lucide-react';
import type { DailyForecast as DT, TemperatureUnit } from '../types/weather';
import { formatTemp } from '../utils/cache';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  days: DT[];
  unit: TemperatureUnit;
}

export default function Forecast({ days, unit }: ForecastProps) {
  const allTemps = days.flatMap(d => [d.tempMax, d.tempMin]);
  const gMin = Math.min(...allTemps);
  const gMax = Math.max(...allTemps);
  const range = gMax - gMin || 1;

  return (
    <div>
      <p className="text-white/40 text-xs font-semibold tracking-widest uppercase px-1 mb-3">7-Day Forecast</p>
      <div className="space-y-0.5">
        {days.map((day, i) => {
          const date = new Date(day.date + 'T12:00:00');
          const name = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
          const minPct = ((day.tempMin - gMin) / range) * 100;
          const maxPct = ((day.tempMax - gMin) / range) * 100;

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 py-2 px-1 rounded-xl hover:bg-white/5 transition-colors"
            >
              <span className="text-white/65 text-sm w-12 flex-shrink-0">{name}</span>
              <WeatherIcon code={day.weatherCode} isDay size={18} />
              {day.precipitationProbability > 10 ? (
                <span className="flex items-center gap-0.5 text-blue-300/70 text-xs w-9 flex-shrink-0">
                  <Droplets className="w-2.5 h-2.5" />{day.precipitationProbability}%
                </span>
              ) : <span className="w-9 flex-shrink-0" />}
              <span className="text-white/45 text-xs w-12 text-right flex-shrink-0">{formatTemp(day.tempMin, unit)}</span>
              <div className="flex-1 h-1 bg-white/10 rounded-full relative mx-1.5">
                <motion.div
                  initial={{ width: 0, left: `${minPct}%` }}
                  animate={{ width: `${maxPct - minPct}%`, left: `${minPct}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                  className="absolute top-0 h-full rounded-full bg-gradient-to-r from-sky-400 to-amber-400"
                />
              </div>
              <span className="text-white text-xs font-semibold w-12 text-right flex-shrink-0">{formatTemp(day.tempMax, unit)}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Sunrise/Sunset */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/8">
        <div className="flex items-center gap-2 text-white/45 text-xs">
          <Sunrise className="w-4 h-4 text-amber-400/80" />
          <span>{new Date(days[0].sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center gap-2 text-white/45 text-xs">
          <Sunset className="w-4 h-4 text-orange-400/80" />
          <span>{new Date(days[0].sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="ml-auto flex items-center gap-1 text-white/35 text-xs">
          <span>UV {days[0].uvIndexMax}</span>
        </div>
      </div>
    </div>
  );
}
