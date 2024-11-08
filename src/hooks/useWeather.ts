import { useState } from 'react';
import { WeatherData, City, TemperatureFilter } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function useWeather() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    if (!API_KEY) {
      setError('API key is not configured');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data: WeatherData = await response.json();

      const newCity: City = {
        id: Date.now(),
        name: data.name,
        temperature: data.main.temp,
        weather: data.weather[0].main,
        icon: data.weather[0].icon,
        country: data.sys.country,
      };

      setCities((prev) => {
        const exists = prev.some((city) => city.name === newCity.name);
        if (exists) return prev;
        return [...prev, newCity];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const filterCities = (cities: City[], filter: TemperatureFilter) => {
    switch (filter) {
      case 'cold':
        return cities.filter((city) => city.temperature < 10);
      case 'moderate':
        return cities.filter((city) => city.temperature >= 10 && city.temperature <= 25);
      case 'hot':
        return cities.filter((city) => city.temperature > 25);
      default:
        return cities;
    }
  };

  return {
    cities,
    loading,
    error,
    fetchWeather,
    filterCities,
  };
}