import styled from 'styled-components';
import getColor from 'utils/getColor';

export const EquipmentWrapper = styled.div`
  padding: 4px;
  border-radius: 4px;
  background-color: ${getColor('background', 'accent')};
`;

export const ExerciseWrapper = styled.div`
  padding: 5px 6px;
  border-radius: 4px;
  background-color: ${getColor('background', 'primary')};
`;
