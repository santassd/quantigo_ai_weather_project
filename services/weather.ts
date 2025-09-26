export interface WeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
  wind_deg: number;
  city: string;
  country: string;
}

export interface ForecastData {
  dt_txt: string;
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  wind_speed: number;
  wind_deg: number;
}

const API_KEY = "9d729cfd40c256defac28e6a8266b774";

// Get current weather by city name
export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) throw new Error("Failed to fetch weather data");

  const data = await res.json();

  return {
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    wind_speed: data.wind.speed,
    wind_deg: data.wind.deg,
    city: data.name,
    country: data.sys.country,
  };
};


export const getGeoLocation = async (city: string) => {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch geo location");

  const data = await res.json();
  return data; 
};


export const getForecast = async (city: string): Promise<ForecastData[]> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) throw new Error("Failed to fetch forecast data");

  const data = await res.json();

  return data.list.map((item: any) => ({
    dt_txt: item.dt_txt,
    temp: item.main.temp,
    feels_like: item.main.feels_like,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    wind_speed: item.wind.speed,
    wind_deg: item.wind.deg,
  }));
};
