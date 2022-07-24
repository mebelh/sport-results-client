import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  @media (max-width: 400px) {
    padding: 10px;
  }
`;
