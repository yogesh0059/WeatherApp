import { useState, useRef } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { Search, Plus, Trash2, X, Settings } from 'lucide-react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HourlyForecast from './components/HourlyForecast';
import UnitToggle from './components/UnitToggle';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import WelcomeState from './components/WelcomeState';
import LocationDots from './components/LocationDots';
import WeatherLandscape from './components/landscapes/index';
import { useWeather, useCitySearch } from './hooks/useWeather';

export default function App() {
  const {
    savedLocations, activeIndex, activeWeather, loading, error, unit,
    toggleUnit, addLocation, deleteLocation, switchLocation, retry,
  } = useWeather();

  const { query, results, searching, search, clearResults } = useCitySearch();

  const [searchOpen, setSearchOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);

  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-80, 0, 80], [-1, 0, 1]);
  const isDragging = useRef(false);

  const bgCode = activeWeather?.current.weatherCode ?? 0;
  const isDay = activeWeather?.current.isDay ?? true;

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > 55) {
      if (info.offset.x < 0 && activeIndex < savedLocations.length - 1) {
        switchLocation(activeIndex + 1);
      } else if (info.offset.x > 0 && activeIndex > 0) {
        switchLocation(activeIndex - 1);
      }
    }
    dragX.set(0);
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-gray-950 font-sans select-none">
      {/* Landscape background */}
      <WeatherLandscape weatherCode={bgCode} isDay={isDay} />

      {/* Dark vignette gradient - bottom half */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      {/* Top header darkening overlay */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />

      {/* Top header */}
      <div className="absolute top-0 left-0 right-0 z-30 px-5 pt-safe-area-inset-top">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={() => setManageOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Settings className="w-4 h-4 text-white/70" />
          </button>

          {/* Location name + dots */}
          <div className="flex flex-col items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWeather?.location.name ?? 'empty'}
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15 shadow-lg shadow-black/20"
              >
                <span className="text-white font-semibold text-sm tracking-wide" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
                  {activeWeather?.location.name ?? savedLocations[activeIndex]?.name ?? 'SkyPulse'}
                </span>
                {activeWeather && (
                  <span className="text-white/55 text-xs font-medium">{activeWeather.location.country}</span>
                )}
              </motion.div>
            </AnimatePresence>
            <LocationDots
              locations={savedLocations}
              activeIndex={activeIndex}
              onSwitch={switchLocation}
            />
          </div>

          <div className="flex items-center gap-2">
            <UnitToggle unit={unit} onToggle={toggleUnit} />
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Search className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <SearchBar
              query={query}
              results={results}
              searching={searching}
              onSearch={search}
              onAdd={(loc) => { addLocation(loc); search(''); clearResults(); }}
              onClear={clearResults}
              onClose={() => { setSearchOpen(false); search(''); clearResults(); }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Weather hero area - swipeable */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-center items-center"
        style={{ x: dragX, paddingTop: '20%' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={handleDragEnd}
        onPointerUp={() => { isDragging.current = false; }}
      >
        <AnimatePresence mode="wait">
          {loading && !activeWeather ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingState />
            </motion.div>
          ) : error && !activeWeather ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ErrorState message={error} onRetry={retry} />
            </motion.div>
          ) : savedLocations.length === 0 ? (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <WelcomeState onOpenSearch={() => setSearchOpen(true)} />
            </motion.div>
          ) : activeWeather ? (
            <motion.div
              key={`${activeWeather.location.name}-${unit}`}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <CurrentWeather
                current={activeWeather.current}
                today={activeWeather.daily[0]}
                unit={unit}
              />
            </motion.div>
          ) : (
            <motion.div key="loading-loc" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <LoadingState />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swipe hint when multiple locations */}
        {savedLocations.length > 1 && (
          <motion.div
            style={{ opacity: useTransform(dragProgress, [-1, 0, 1], [0.8, 0, 0.8]) }}
            className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
          >
            <div className="flex items-center gap-2 text-white/40 text-xs">
              {activeIndex > 0 && <span>← {savedLocations[activeIndex - 1]?.name}</span>}
              {activeIndex < savedLocations.length - 1 && <span>{savedLocations[activeIndex + 1]?.name} →</span>}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom frosted glass sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30, delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="bg-black/35 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl px-5 pt-4 pb-6 max-h-[55dvh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* Drag handle */}
          <div className="flex justify-center mb-4">
            <div className="w-8 h-1 bg-white/20 rounded-full" />
          </div>

          {activeWeather ? (
            <div className="space-y-6">
              <HourlyForecast hours={activeWeather.hourly} unit={unit} />
              <Forecast days={activeWeather.daily} unit={unit} />
            </div>
          ) : savedLocations.length > 0 ? (
            <LoadingState />
          ) : (
            <div className="text-center py-4 text-white/25 text-xs">Search for a city to get started</div>
          )}
        </div>
      </motion.div>

      {/* Manage Locations Modal */}
      <AnimatePresence>
        {manageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end justify-center"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setManageOpen(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full bg-gray-900/95 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl px-5 pt-4 pb-8 max-h-[70dvh] overflow-y-auto"
            >
              <div className="flex justify-center mb-5">
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold text-lg">My Locations</h2>
                <button onClick={() => setManageOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white/50" />
                </button>
              </div>

              {savedLocations.length === 0 ? (
                <div className="text-center py-8 text-white/30 text-sm">No saved locations yet</div>
              ) : (
                <div className="space-y-2">
                  {savedLocations.map((loc, i) => (
                    <motion.div
                      key={`${loc.latitude}-${loc.longitude}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-colors ${
                        i === activeIndex
                          ? 'bg-white/15 border border-white/20'
                          : 'bg-white/5 hover:bg-white/10 border border-white/5'
                      }`}
                      onClick={() => { switchLocation(i); setManageOpen(false); }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${i === activeIndex ? 'bg-blue-400' : 'bg-white/20'}`} />
                        <div>
                          <p className="text-white text-sm font-medium">{loc.name}</p>
                          <p className="text-white/40 text-xs">{loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteLocation(i); }}
                        className="p-1.5 rounded-full hover:bg-red-500/20 transition-colors group"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white/25 group-hover:text-red-400 transition-colors" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              <button
                onClick={() => { setManageOpen(false); setSearchOpen(true); }}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-white/8 hover:bg-white/15 border border-white/10 rounded-2xl text-white/60 text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add location
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
