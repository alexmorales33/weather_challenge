import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {VContainer, VImage, VInput, VTypography} from '../../components';
import RainSvg from '../../../assets/svgs/RainSvg';
import Geolocation from '@react-native-community/geolocation';
import {
  getNextThreeDaysForecast,
  getNextThreeHourForecast,
  getTemperatureInCelsius,
  kelvinToCelsius,
  requestLocationPermission,
} from '../../utils';
import {styles} from './vHome.styled';
import {
  getWeatherCordInfo,
  getWeatherInfo,
} from '../../redux/weather/weatherThunks';
import CalendarSvg from '../../../assets/svgs/CalendarSvg';

const VCardHourDetail = ({forecast, index}) => (
  <VContainer
    key={index}
    flex={0.25}
    height={'80%'}
    justifyContent={'space-around'}>
    <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
      {kelvinToCelsius(forecast.main.temp)}°C
    </VTypography>
    <RainSvg />
    <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
      {new Date(forecast.dt * 1000).toLocaleTimeString([], {
        hour: '2-digit',
      })}
    </VTypography>
  </VContainer>
);

const VCardDayDetail = ({date, minTemp, maxTemp}) => (
  <VContainer
    flex={1}
    flexDirection={'row'}
    justifyContent={'space-between'}
    style={{marginBottom: 10}}>
    <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
      {date}
    </VTypography>
    <RainSvg />
    <VContainer
      flex={0.4}
      flexDirection={'row'}
      justifyContent={'space-between'}>
      <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
        {kelvinToCelsius(maxTemp)}°C
      </VTypography>
      <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
        {kelvinToCelsius(minTemp)}°C
      </VTypography>
    </VContainer>
  </VContainer>
);

export function VHome() {
  const dispatch = useDispatch();
  const {weatherData, forecastData, loading, error} = useSelector(
    state => state.weather,
  );
  const [nextThreeHours, setNextThreeHours] = useState(null);
  const [nextThreeDays, setNextThreeDays] = useState([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    if (forecastData) {
      setNextThreeHours(getNextThreeHourForecast(forecastData));
      setNextThreeDays(getNextThreeDaysForecast(forecastData));
    }
  }, [forecastData]);

  useEffect(() => {
    requestLocationPermission().then(response => {
      Geolocation.getCurrentPosition(info => {
        dispatch(
          getWeatherCordInfo({
            lat: info.coords.latitude,
            lon: info.coords.longitude,
          }),
        );
      });
    });
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleSubmit = () => {
    const trimmedCity = city.replace(/\s+/g, '');
    dispatch(getWeatherInfo({city: trimmedCity}));
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.header}>
        <VInput
          placeholder="Search your City."
          value={city}
          onChangeText={setCity}
          onSubmit={handleSubmit}
        />
      </View>

      <View style={styles.section}>
        <VContainer flex={1} marginBottom={30}>
          <VImage
            width={150}
            height={150}
            source={require('../../../assets/images/sun.png')}
            resizeMode="cover"
          />
          <VTypography fontSize={64} fontWeight={600} color={'#fff'}>
            {getTemperatureInCelsius(weatherData, 'temp')}°C
          </VTypography>
          <VTypography fontSize={32} fontWeight={400} color={'#fff'}>
            {weatherData && weatherData.name && weatherData.name}
          </VTypography>
          <VTypography fontSize={14} fontWeight={300} color={'#fff'}>
            Precipitations
          </VTypography>
          <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
            Max.: {getTemperatureInCelsius(weatherData, 'temp_max')}°C | Min.:{' '}
            {getTemperatureInCelsius(weatherData, 'temp_min')}°C
          </VTypography>
        </VContainer>

        <VContainer flex={0.5} justifyContent={'center'}>
          <View style={styles.viewToday}>
            <VContainer width={'33%'}>
              <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
                {getTemperatureInCelsius(weatherData, 'feels_like')}
                °C
              </VTypography>
            </VContainer>
            <VContainer width={'33%'}>
              <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
                {weatherData && weatherData.main && weatherData.main.humidity}%
              </VTypography>
            </VContainer>
            <VContainer width={'33%'}>
              <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
                {weatherData && weatherData.main && weatherData.wind.speed} km/h
              </VTypography>
            </VContainer>
          </View>

          <View style={styles.detailToday}>
            <View style={styles.topDetailToday}>
              <VTypography fontSize={18} fontWeight={600} color={'#fff'}>
                Today
              </VTypography>
              <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
                Mar, 10
              </VTypography>
            </View>
            <View style={styles.bottomDetailToday}>
              {nextThreeHours &&
                nextThreeHours.map((forecast, index) => (
                  <VCardHourDetail
                    key={index}
                    forecast={forecast}
                    index={index}
                  />
                ))}
            </View>
          </View>

          <View style={styles.detailTomorrow}>
            <View style={styles.topDetailTomorrow}>
              <VTypography fontSize={18} fontWeight={600} color={'#fff'}>
                Next Forecast
              </VTypography>
              <CalendarSvg />
            </View>
            <View style={styles.bottomDetailTomorrow}>
              {nextThreeDays.map((day, index) => (
                <VCardDayDetail
                  key={index}
                  date={new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                  minTemp={day.minTemp}
                  maxTemp={day.maxTemp}
                  conditions={day.conditions}
                />
              ))}
            </View>
          </View>
        </VContainer>
      </View>
    </ScrollView>
  );
}
