import React from 'react';
import { City } from '../types/weather';
import { CloudSun } from 'lucide-react';

interface WeatherCardProps {
  city: City;
}

export function WeatherCard({ city }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {city.name}, {city.country}
            </h3>
            <p className="text-gray-500 mt-1">{city.weather}</p>
          </div>
          {city.icon ? (
            <img
              src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
              alt={city.weather}
              className="w-16 h-16"
            />
          ) : (
            <CloudSun className="w-16 h-16 text-gray-400" />
          )}
        </div>
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-gray-900">
            {Math.round(city.temperature)}°C
          </div>
        </div>
      </div>
    </div>
  );
}