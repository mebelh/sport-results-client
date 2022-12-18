import styled from 'styled-components';
import getColor from 'utils/getColor';

export const ApproachesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-top: 4px;
`;

export const ResultWrapper = styled.div`
  border-radius: 3px;
  padding: 4px;
  box-shadow: 0 0 3px 1px ${getColor('background', 'transparentAccent')};
`;
