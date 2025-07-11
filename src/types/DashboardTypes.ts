// src/types/DashboardTypes.ts
export interface OpenMeteoResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    relativehumidity_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    apparent_temperature: number[];
    wind_speed_10m: number[];
  };
  // …otros campos que tengas en tu JSON…
}
