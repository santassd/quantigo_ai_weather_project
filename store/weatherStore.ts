import { create } from "zustand";

interface DailyForecast {
  day: string;
  tempHigh: string;
  tempLow: string;
  icon: string; 
}

interface HourlyForecast {
  time: string;
  temp: string;
  icon: string;
}

interface WeatherStats {
  feelsLike: string;
  humidity: string;
  wind: string;
  precipitation: string;
}

interface CurrentWeather {
  location: string;
  country: string;
  date: string;
  temperature: string;
  condition: string;
  icon: string;
  stats: WeatherStats;
  dailyForecast: DailyForecast[];
  hourlyForecast: HourlyForecast[];
}

interface WeatherStore {
  city: string;
  setCity: (city: string) => void;

  currentWeather: CurrentWeather;
  setCurrentWeather: (weather: CurrentWeather) => void;

  error: string;
  setError: (error: string) => void;

  clearWeather: () => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  city: "",
  setCity: (city) => set({ city }),

  error: "",
  setError: (error) => set({ error }),

  currentWeather: {
    location: "",
    country: "",
    date: "",
    temperature: "",
    condition: "",
    icon: "",
    stats: {
      feelsLike: "",
      humidity: "",
      wind: "",
      precipitation: "",
    },
    dailyForecast: Array(7).fill({
      day: "",
      tempHigh: "",
      tempLow: "",
      icon: "",
    }),
    hourlyForecast: Array(8).fill({
      time: "",
      temp: "",
      icon: "",
    }),
  },
  setCurrentWeather: (weather) => set({ currentWeather: weather }),

  clearWeather: () =>
    set({
      currentWeather: {
        location: "",
        country: "",
        date: "",
        temperature: "",
        condition: "",
        icon: "",
        stats: {
          feelsLike: "",
          humidity: "",
          wind: "",
          precipitation: "",
        },
        dailyForecast: Array(7).fill({
          day: "",
          tempHigh: "",
          tempLow: "",
          icon: "",
        }),
        hourlyForecast: Array(8).fill({
          time: "",
          temp: "",
          icon: "",
        }),
      },
      error: "",
    }),
}));
