
export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather?: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    wind_speed_10m: number[];
  };
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  apparentTemperature: number;
  timestamp: string;
}

export interface ChartDataPoint {
  time: string;
  temperatura: number;
  humedad: number;
  viento: number;
  sensacion: number;
}
