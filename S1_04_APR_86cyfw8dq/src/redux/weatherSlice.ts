import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "41c3c373d04e93a653d2ebb4f7b46c70";

// Type for current weather
export interface CurrentWeather {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

// Type for each forecast item (3-hour intervals)
export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

// Forecast data contains a list of forecast items
export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
  };
}

// Unified structure for weather data
export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastData;
}

interface WeatherState {
  data: WeatherData | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  status: "idle",
  error: null,
};

// Async thunk: fetch weather by city name or lat/lon
export const fetchWeather = createAsyncThunk<
  WeatherData,
  { city?: string; lat?: number; lon?: number },
  { rejectValue: string }
>(
  "weather/fetchWeather",
  async ({ city, lat, lon }, { rejectWithValue }) => {
    try {
      let currentEndpoint = "";
      let forecastEndpoint = "";

      if (city) {
        const encodedCity = encodeURIComponent(city);
        currentEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`;
        forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&appid=${API_KEY}&units=metric`;
      } else if (
        typeof lat === "number" &&
        typeof lon === "number" &&
        !isNaN(lat) &&
        !isNaN(lon)
      ) {
        console.log("📍 Using coordinates:", { lat, lon });

        currentEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      } else {
        throw new Error("City or valid coordinates must be provided.");
      }

      const [currentRes, forecastRes] = await Promise.all([
        axios.get<CurrentWeather>(currentEndpoint),
        axios.get<ForecastData>(forecastEndpoint),
      ]);

      return {
        current: currentRes.data,
        forecast: forecastRes.data,
      };
    } catch (error: any) {
      console.error("❌ Weather fetch error:", error);
      return rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch weather data";
      });
  },
});

export default weatherSlice.reducer;
