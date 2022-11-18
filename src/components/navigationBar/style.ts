import styled from 'styled-components';
import getColor from 'utils/getColor';

export const Wrapper = styled.div`
  height: 46px;
  display: flex;
  position: relative;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  height: min-content;
  color: ${getColor('text', 'primary')};
`;

export const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: ${getColor('text', 'primary')};
  font-weight: 500;
`;
