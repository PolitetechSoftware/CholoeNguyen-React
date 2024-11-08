import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { TemperatureFilter } from './components/TemperatureFilter';
import { useWeather } from './hooks/useWeather';
import { TemperatureFilter as TempFilterType } from './types/weather';
import { CloudSun } from 'lucide-react';

function App() {
  const { cities, loading, error, fetchWeather, filterCities } = useWeather();
  const [tempFilter, setTempFilter] = useState<TempFilterType>('all');

  const filteredCities = filterCities(cities, tempFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudSun className="w-10 h-10 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Weather App</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Search for a city to check its current weather conditions
          </p>
          <SearchBar onSearch={fetchWeather} />
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>

        <div className="mb-6">
          <TemperatureFilter currentFilter={tempFilter} onFilterChange={setTempFilter} />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <WeatherCard key={city.id} city={city} />
            ))}
          </div>
        )}

        {!loading && filteredCities.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            {cities.length === 0
              ? 'Search for a city to see weather information'
              : 'No cities match the selected temperature filter'}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;