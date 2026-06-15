import type { GeoLocation, WeatherData, CurrentWeather, DailyForecast, HourlyForecast } from '../types/weather';

const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function searchCities(query: string): Promise<GeoLocation[]> {
  if (!query.trim()) return [];
  const params = new URLSearchParams({
    name: query,
    count: '8',
    language: 'en',
    format: 'json',
  });
  const res = await fetch(`${GEO_BASE}?${params}`);
  if (!res.ok) throw new Error('Geocoding request failed');
  const data = await res.json();
  if (!data.results) return [];
  return data.results.map((r: Record<string, unknown>, i: number) => ({
    id: i,
    name: r.name as string,
    country: r.country as string,
    admin1: r.admin1 as string | undefined,
    latitude: r.latitude as number,
    longitude: r.longitude as number,
  }));
}

export async function fetchWeather(location: GeoLocation): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,precipitation,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset,uv_index_max',
    hourly: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,is_day',
    timezone: 'auto',
    forecast_days: '7',
  });
  const res = await fetch(`${WEATHER_BASE}?${params}`);
  if (!res.ok) throw new Error('Weather request failed');
  const data = await res.json();

  const current: CurrentWeather = {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    weatherCode: data.current.weather_code,
    isDay: data.current.is_day === 1,
    pressure: data.current.pressure_msl,
    uvIndex: data.daily?.uv_index_max?.[0] ?? 0,
    visibility: 10,
    cloudCover: data.current.cloud_cover,
    precipitation: data.current.precipitation,
  };

  const daily: DailyForecast[] = data.daily.time.map((date: string, i: number) => ({
    date,
    weatherCode: data.daily.weather_code[i],
    tempMax: data.daily.temperature_2m_max[i],
    tempMin: data.daily.temperature_2m_min[i],
    precipitationSum: data.daily.precipitation_sum[i],
    precipitationProbability: data.daily.precipitation_probability_max[i],
    windSpeedMax: data.daily.wind_speed_10m_max[i],
    sunrise: data.daily.sunrise[i],
    sunset: data.daily.sunset[i],
    uvIndexMax: data.daily.uv_index_max[i],
  }));

  const hourly: HourlyForecast[] = data.hourly.time.map((time: string, i: number) => ({
    time,
    temperature: data.hourly.temperature_2m[i],
    humidity: data.hourly.relative_humidity_2m[i],
    weatherCode: data.hourly.weather_code[i],
    windSpeed: data.hourly.wind_speed_10m[i],
    precipitation: data.hourly.precipitation[i],
    isDay: data.hourly.is_day[i] === 1,
  }));

  return { location, current, daily, hourly, fetchedAt: Date.now() };
}

const WEATHER_CODE_MAP: Record<number, { label: string; icon: string }> = {
  0: { label: 'Clear sky', icon: 'sun' },
  1: { label: 'Mainly clear', icon: 'sun' },
  2: { label: 'Partly cloudy', icon: 'cloud-sun' },
  3: { label: 'Overcast', icon: 'cloud' },
  45: { label: 'Foggy', icon: 'cloud-fog' },
  48: { label: 'Rime fog', icon: 'cloud-fog' },
  51: { label: 'Light drizzle', icon: 'cloud-drizzle' },
  53: { label: 'Moderate drizzle', icon: 'cloud-drizzle' },
  55: { label: 'Dense drizzle', icon: 'cloud-drizzle' },
  56: { label: 'Freezing drizzle', icon: 'cloud-drizzle' },
  57: { label: 'Heavy freezing drizzle', icon: 'cloud-drizzle' },
  61: { label: 'Slight rain', icon: 'cloud-rain' },
  63: { label: 'Moderate rain', icon: 'cloud-rain' },
  65: { label: 'Heavy rain', icon: 'cloud-rain' },
  66: { label: 'Freezing rain', icon: 'cloud-rain' },
  67: { label: 'Heavy freezing rain', icon: 'cloud-rain' },
  71: { label: 'Slight snowfall', icon: 'snowflake' },
  73: { label: 'Moderate snowfall', icon: 'snowflake' },
  75: { label: 'Heavy snowfall', icon: 'snowflake' },
  77: { label: 'Snow grains', icon: 'snowflake' },
  80: { label: 'Slight rain showers', icon: 'cloud-rain' },
  81: { label: 'Moderate rain showers', icon: 'cloud-rain' },
  82: { label: 'Violent rain showers', icon: 'cloud-rain' },
  85: { label: 'Slight snow showers', icon: 'snowflake' },
  86: { label: 'Heavy snow showers', icon: 'snowflake' },
  95: { label: 'Thunderstorm', icon: 'cloud-lightning' },
  96: { label: 'Thunderstorm with hail', icon: 'cloud-lightning' },
  99: { label: 'Thunderstorm with heavy hail', icon: 'cloud-lightning' },
};

export function getWeatherInfo(code: number): { label: string; icon: string } {
  return WEATHER_CODE_MAP[code] ?? { label: 'Unknown', icon: 'cloud' };
}

export function getWindDirection(degrees: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(degrees / 22.5) % 16];
}
