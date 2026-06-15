import { Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain, CloudDrizzle, Snowflake, CloudLightning, CloudFog } from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay: boolean;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function WeatherIcon({ code, isDay, size = 24, className = '', animate = false }: WeatherIconProps) {
  const animClass = animate ? 'animate-float' : '';

  if (code === 0 || code === 1) {
    return isDay
      ? <Sun size={size} className={`text-amber-400 ${animClass} ${className}`} />
      : <Moon size={size} className={`text-blue-300 ${animClass} ${className}`} />;
  }
  if (code === 2) {
    return isDay
      ? <CloudSun size={size} className={`text-amber-300 ${animClass} ${className}`} />
      : <CloudMoon size={size} className={`text-blue-300 ${animClass} ${className}`} />;
  }
  if (code === 3) {
    return <Cloud size={size} className={`text-gray-400 ${animClass} ${className}`} />;
  }
  if (code === 45 || code === 48) {
    return <CloudFog size={size} className={`text-gray-300 ${animClass} ${className}`} />;
  }
  if (code >= 51 && code <= 57) {
    return <CloudDrizzle size={size} className={`text-blue-300 ${animClass} ${className}`} />;
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return <CloudRain size={size} className={`text-blue-400 ${animClass} ${className}`} />;
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return <Snowflake size={size} className={`text-cyan-300 ${animClass} ${className}`} />;
  }
  if (code >= 95) {
    return <CloudLightning size={size} className={`text-yellow-400 ${animClass} ${className}`} />;
  }
  return <Cloud size={size} className={`text-gray-400 ${animClass} ${className}`} />;
}
