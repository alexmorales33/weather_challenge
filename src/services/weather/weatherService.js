import axios from 'axios';

export const fetchForecastData = async search => {
  try {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=7e6b7ca265bbed59840cc1937a259fd4`;

    const forecastResponse = await axios.get(forecastUrl);
    return forecastResponse;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

export const fetchWeatherData = async search => {
  try {
    console.log('hasta aca llega');
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=7e6b7ca265bbed59840cc1937a259fd4`;
    console.log(weatherUrl);
    const weatherResponse = await axios.get(weatherUrl);
    console.log('fetchWeatherData');
    console.log(weatherResponse.data);
    return weatherResponse;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

export const fetchForecastCordData = async (lat, lon) => {
  try {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7e6b7ca265bbed59840cc1937a259fd4`;

    const forecastResponse = await axios.get(forecastUrl);
    return forecastResponse;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

export const fetchWeatherCordData = async (lat, lon) => {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=7e6b7ca265bbed59840cc1937a259fd4`;

    const weatherResponse = await axios.get(weatherUrl);
    return weatherResponse;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};
