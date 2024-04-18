export const kelvinToCelsius = kelvin => {
  return Math.round(kelvin - 273.15);
};

export const getTemperatureInCelsius = (weatherData, key) => {
  return weatherData && weatherData.main && weatherData.main[key]
    ? kelvinToCelsius(weatherData.main[key])
    : 'Loading...';
};

export const getNextThreeHourForecast = forecastData => {
  return forecastData.list.slice(0, 4);
};

export const getNextThreeDaysForecast = forecastData => {
  const dailyData = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        conditions: item.weather[0].description,
        icon: item.weather[0].icon,
      };
    } else {
      dailyData[date].minTemp = Math.min(
        dailyData[date].minTemp,
        item.main.temp_min,
      );
      dailyData[date].maxTemp = Math.max(
        dailyData[date].maxTemp,
        item.main.temp_max,
      );
    }
  });
  return Object.entries(dailyData)
    .map(([date, data]) => ({date, ...data}))
    .slice(0, 3);
};
