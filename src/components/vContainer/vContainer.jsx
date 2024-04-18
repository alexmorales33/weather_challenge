import styled from 'styled-components/native';

export const VContainer = styled.View`
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '100%'};
  flex: ${({flex}) => flex || 1};
  flex-direction: ${({flexDirection}) => flexDirection || 'column'};
  justify-content: ${({justifyContent}) => justifyContent || 'center'};
  align-items: ${({alignItems}) => alignItems || 'center'};
`;
