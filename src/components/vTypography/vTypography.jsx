import React from 'react';
import styled from 'styled-components/native';

export const VTypography = ({fontSize, fontWeight, color, children}) => {
  const Typography = styled.Text`
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    color: ${color};
  `;

  return <Typography>{children}</Typography>; // Usar children aquí
};
