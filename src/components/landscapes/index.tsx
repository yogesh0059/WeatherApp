import { AnimatePresence, motion } from 'framer-motion';
import SunnyDay from './SunnyDay';
import NightClear from './NightClear';
import Cloudy from './Cloudy';
import Rainy from './Rainy';
import Snowy from './Snowy';
import Thunderstorm from './Thunderstorm';

function getLandscape(code: number, isDay: boolean): React.ReactNode {
  if (code >= 95) return <Thunderstorm />;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <Snowy />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <Rainy />;
  if (code === 3 || (code >= 45 && code <= 48)) return <Cloudy />;
  if (code === 2) return isDay ? <SunnyDay /> : <NightClear />;
  if (!isDay) return <NightClear />;
  return <SunnyDay />;
}

interface WeatherLandscapeProps {
  weatherCode: number;
  isDay: boolean;
}

export default function WeatherLandscape({ weatherCode, isDay }: WeatherLandscapeProps) {
  const key = `${weatherCode >= 95 ? 'storm' : weatherCode >= 85 ? 'snow' : weatherCode >= 71 ? 'snow' : weatherCode >= 51 ? 'rain' : weatherCode >= 45 ? 'fog' : weatherCode >= 3 ? 'cloud' : isDay ? 'day' : 'night'}`;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {getLandscape(weatherCode, isDay)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
