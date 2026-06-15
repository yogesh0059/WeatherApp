import type { WeatherData, TemperatureUnit, GeoLocation } from '../types/weather';

const P = 'skypulse_';
const CACHE_TTL = 15 * 60 * 1000;

export function getCachedWeather(key: string): WeatherData | null {
  try {
    const raw = localStorage.getItem(`${P}weather_${key}`);
    if (!raw) return null;
    const data: WeatherData = JSON.parse(raw);
    if (Date.now() - data.fetchedAt > CACHE_TTL) {
      localStorage.removeItem(`${P}weather_${key}`);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function setCachedWeather(key: string, data: WeatherData): void {
  try {
    localStorage.setItem(`${P}weather_${key}`, JSON.stringify(data));
  } catch {
    // silently fail
  }
}

export function getUnitPreference(): TemperatureUnit {
  try {
    return (localStorage.getItem(`${P}unit`) as TemperatureUnit) ?? 'celsius';
  } catch {
    return 'celsius';
  }
}

export function setUnitPreference(unit: TemperatureUnit): void {
  try { localStorage.setItem(`${P}unit`, unit); } catch { /* */ }
}

export function getSavedLocations(): GeoLocation[] {
  try {
    const raw = localStorage.getItem(`${P}locations`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocation(loc: GeoLocation): GeoLocation[] {
  try {
    const current = getSavedLocations();
    const exists = current.some(l => Math.abs(l.latitude - loc.latitude) < 0.01 && Math.abs(l.longitude - loc.longitude) < 0.01);
    if (exists) return current;
    const updated = [...current, loc];
    localStorage.setItem(`${P}locations`, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function removeLocation(index: number): GeoLocation[] {
  try {
    const current = getSavedLocations();
    const updated = current.filter((_, i) => i !== index);
    localStorage.setItem(`${P}locations`, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function convertTemp(celsius: number, unit: TemperatureUnit): number {
  return unit === 'fahrenheit' ? (celsius * 9) / 5 + 32 : celsius;
}

export function tempSymbol(unit: TemperatureUnit): string {
  return unit === 'celsius' ? '°C' : '°F';
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  return `${Math.round(convertTemp(celsius, unit))}${tempSymbol(unit)}`;
}
