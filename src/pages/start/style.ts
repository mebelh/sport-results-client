import styled from 'styled-components';

export const NavigationLinksWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  & > :first-child {
    grid-column: 1/3;
    height: 150px;
  }

  & > a {
    height: 70px;
  }
`;
