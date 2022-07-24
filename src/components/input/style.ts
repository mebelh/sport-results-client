import styled from 'styled-components';
import getColor from 'utils/getColor';
import Typography from 'components/typography';

export const Wrapper = styled.div`
  position: relative;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  border: 1px solid ${getColor('lightGray', 'primary')};
  border-radius: 4px;
  height: 36px;
  margin-top: 3px;
`;

export const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const Error = styled(Typography.Text4)`
  position: absolute;
  top: calc(100% + 3px);
  left: calc(3px);
  color: ${getColor('text', 'error')};
`;

export const Title = styled(Typography.Text4)`
  margin-left: 10px;
`;
