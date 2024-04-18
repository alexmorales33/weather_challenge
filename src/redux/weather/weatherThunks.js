import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchForecastCordData,
  fetchForecastData,
  fetchWeatherCordData,
  fetchWeatherData,
} from '../../services';

export const getWeatherInfo = createAsyncThunk(
  'weather/getWeatherInfo',
  async ({city}, {rejectWithValue}) => {
    try {
      const weather = await fetchWeatherData(city);
      const forecast = await fetchForecastData(city);
      return {weather: weather.data, forecast: forecast.data};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getWeatherCordInfo = createAsyncThunk(
  'weather/getWeatherCordInfo',
  async ({lat, lon}, {rejectWithValue}) => {
    try {
      const weather = await fetchWeatherCordData(lat, lon);
      const forecast = await fetchForecastCordData(lat, lon);
      return {weather: weather.data, forecast: forecast.data};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
