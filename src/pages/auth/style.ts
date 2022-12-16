import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
  margin-top: 80px;
`;

export const StepsForm = styled.form`
  width: 80%;
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 20px auto;

  & > * {
    width: 100%;
  }
`;
