import { motion } from 'framer-motion';
import { Wind, Droplets, Thermometer, Gauge } from 'lucide-react';
import type { CurrentWeather as CT, DailyForecast, TemperatureUnit } from '../types/weather';
import { getWeatherInfo, getWindDirection } from '../services/weather';
import { formatTemp, convertTemp } from '../utils/cache';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  current: CT;
  today: DailyForecast;
  unit: TemperatureUnit;
}

export default function CurrentWeather({ current, today, unit }: CurrentWeatherProps) {
  const info = getWeatherInfo(current.weatherCode);

  return (
    <div className="flex flex-col items-center">
      {/* Main temp display */}
      <motion.div
        key={`${current.temperature}-${unit}`}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="relative"
      >
        <span className="text-[88px] font-thin text-white leading-none tracking-tighter" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
          {Math.round(convertTemp(current.temperature, unit))}
        </span>
        <span className="absolute top-4 -right-8 text-3xl font-light text-white/80" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
          {unit === 'celsius' ? '°' : '°'}
        </span>
      </motion.div>

      {/* Condition */}
      <div className="flex items-center gap-2.5 mt-1">
        <WeatherIcon code={current.weatherCode} isDay={current.isDay} size={22} />
        <span className="text-white/90 text-lg font-light" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>{info.label}</span>
      </div>

      {/* H/L + feels like */}
      <div className="flex items-center gap-4 mt-2 text-white/70 text-sm font-light" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
        <span>H: {formatTemp(today.tempMax, unit)}</span>
        <span className="text-white/20">·</span>
        <span>L: {formatTemp(today.tempMin, unit)}</span>
        <span className="text-white/20">·</span>
        <span className="flex items-center gap-1">
          <Thermometer className="w-3.5 h-3.5" />
          Feels {formatTemp(current.feelsLike, unit)}
        </span>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-5 mt-4 px-6 py-3 bg-black/35 backdrop-blur-md rounded-2xl border border-white/15 shadow-lg shadow-black/20"
      >
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <Wind className="w-3.5 h-3.5 text-blue-300/70" />
          <span>{Math.round(current.windSpeed)} km/h {getWindDirection(current.windDirection)}</span>
        </div>
        <div className="w-px h-3 bg-white/15" />
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <Droplets className="w-3.5 h-3.5 text-blue-300/70" />
          <span>{current.humidity}%</span>
        </div>
        <div className="w-px h-3 bg-white/15" />
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <Gauge className="w-3.5 h-3.5 text-blue-300/70" />
          <span>{Math.round(current.pressure)} hPa</span>
        </div>
      </motion.div>
    </div>
  );
}
