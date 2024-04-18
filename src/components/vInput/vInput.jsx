import React from 'react';
import styled from 'styled-components/native';
import MapSvg from '../../../assets/svgs/MapSvg';
import {TouchableOpacity} from 'react-native';
import SearchSvg from '../../../assets/svgs/SearchSvg';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: 'rgba(0, 0, 0, 0.1)';
  border-radius: 10px;
`;

const StyledInput = styled.TextInput`
  flex: 0.6;
  color: white;
`;

export const VInput = ({
  placeholder,
  value,
  onChangeText,
  onSubmit,
  ...rest
}) => {
  return (
    <Container>
      <MapSvg />
      <StyledInput
        placeholder={placeholder}
        placeholderTextColor="white"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      <TouchableOpacity onPress={onSubmit}>
        <SearchSvg />
      </TouchableOpacity>
    </Container>
  );
};
