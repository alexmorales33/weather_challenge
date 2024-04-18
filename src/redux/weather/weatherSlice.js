// src/redux/weather/weatherSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {getWeatherCordInfo, getWeatherInfo} from './weatherThunks';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: null,
    forecastData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWeatherInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherInfo.fulfilled, (state, action) => {
        state.weatherData = action.payload.weather;
        state.forecastData = action.payload.forecast;
        state.loading = false;
      })
      .addCase(getWeatherInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getWeatherCordInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherCordInfo.fulfilled, (state, action) => {
        state.weatherData = action.payload.weather;
        state.forecastData = action.payload.forecast;
        state.loading = false;
      })
      .addCase(getWeatherCordInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default weatherSlice.reducer;
