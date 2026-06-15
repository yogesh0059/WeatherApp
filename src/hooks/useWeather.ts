import { useState, useEffect, useCallback, useRef } from 'react';
import type { GeoLocation, WeatherData, TemperatureUnit } from '../types/weather';
import { searchCities, fetchWeather } from '../services/weather';
import {
  getCachedWeather, setCachedWeather, getUnitPreference, setUnitPreference,
  getSavedLocations, saveLocation, removeLocation,
} from '../utils/cache';

export function useWeather() {
  const [savedLocations, setSavedLocations] = useState<GeoLocation[]>(getSavedLocations);
  const [activeIndex, setActiveIndex] = useState(0);
  const [weatherMap, setWeatherMap] = useState<Record<string, WeatherData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>(getUnitPreference);

  const locationKey = (loc: GeoLocation) => `${loc.latitude.toFixed(3)}_${loc.longitude.toFixed(3)}`;

  const loadWeather = useCallback(async (location: GeoLocation, silent = false) => {
    const key = locationKey(location);
    const cached = getCachedWeather(key);
    if (cached) {
      setWeatherMap(prev => ({ ...prev, [key]: cached }));
      setError(null);
      return;
    }
    if (!silent) setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(location);
      setCachedWeather(key, data);
      setWeatherMap(prev => ({ ...prev, [key]: data }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  const addLocation = useCallback(async (loc: GeoLocation) => {
    const updated = saveLocation(loc);
    setSavedLocations(updated);
    const newIndex = updated.findIndex(l => Math.abs(l.latitude - loc.latitude) < 0.01);
    setActiveIndex(newIndex >= 0 ? newIndex : updated.length - 1);
    await loadWeather(loc);
  }, [loadWeather]);

  const deleteLocation = useCallback((index: number) => {
    const updated = removeLocation(index);
    setSavedLocations(updated);
    setActiveIndex(i => Math.min(i, Math.max(0, updated.length - 1)));
  }, []);

  const switchLocation = useCallback((index: number) => {
    setActiveIndex(index);
    const loc = savedLocations[index];
    if (loc) loadWeather(loc, true);
  }, [savedLocations, loadWeather]);

  const retry = useCallback(() => {
    const loc = savedLocations[activeIndex];
    if (loc) loadWeather(loc);
  }, [savedLocations, activeIndex, loadWeather]);

  const toggleUnit = useCallback(() => {
    setUnit(prev => {
      const next = prev === 'celsius' ? 'fahrenheit' : 'celsius';
      setUnitPreference(next);
      return next;
    });
  }, []);

  // Load weather for active location on mount/change
  useEffect(() => {
    const loc = savedLocations[activeIndex];
    if (loc) loadWeather(loc, true);
  }, [activeIndex, savedLocations, loadWeather]);

  const activeLocation = savedLocations[activeIndex] ?? null;
  const activeWeather = activeLocation ? weatherMap[locationKey(activeLocation)] ?? null : null;

  return {
    savedLocations, activeIndex, activeWeather, loading, error, unit,
    toggleUnit, addLocation, deleteLocation, switchLocation, retry,
  };
}

export function useCitySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [searching, setSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback((q: string) => {
    setQuery(q);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!q.trim() || q.length < 2) { setResults([]); return; }
    setSearching(true);
    timerRef.current = setTimeout(async () => {
      try {
        const cities = await searchCities(q);
        setResults(cities);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
  }, []);

  const clearResults = useCallback(() => setResults([]), []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return { query, results, searching, search, clearResults, setQuery };
}
