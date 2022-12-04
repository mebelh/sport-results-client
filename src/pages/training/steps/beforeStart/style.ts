import styled from 'styled-components';
import getColor from 'utils/getColor';

export const StartButton = styled.button`
  width: 60vw;
  height: 60vw;
  background-color: ${getColor('background', 'accent')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor('text', 'primary')};
  margin: 40px auto;
  border-radius: 50%;
`;
