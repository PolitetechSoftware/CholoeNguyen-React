export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  sys: {
    country: string;
  };
}

export interface City {
  id: number;
  name: string;
  temperature: number;
  weather: string;
  icon: string;
  country: string;
}

export type TemperatureFilterType = 'all' | 'hot' | 'moderate' | 'cold';