import React from 'react';
import styled from 'styled-components/native';
import RainSvg from '../../../assets/svgs/RainSvg';
import {VTypography} from '../vTypography';
import {VContainer} from '../vContainer';

const Container = styled.View`
  flex: 0.25;
  height: 80%;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 5px;
`;

export const VCardHourDetail = ({forecast, index}) => (
  <VContainer
    key={index}
    flex={0.25}
    height={'80%'}
    justifyContent={'space-around'}>
    <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
      {forecast.main.temp}°C
    </VTypography>
    <RainSvg />
    <VTypography fontSize={14} fontWeight={400} color={'#fff'}>
      {new Date(forecast.dt * 1000).toLocaleTimeString([], {
        hour: '2-digit',
      })}
    </VTypography>
  </VContainer>
);
