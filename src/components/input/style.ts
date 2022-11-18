import styled from 'styled-components';
import getColor from 'utils/getColor';
import Typography from 'components/typography';
import { IInputProps } from 'components/input/interfaces';

export const Wrapper = styled.div`
  position: relative;
  padding: 0 0 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  border: 1px solid
    ${({ error }: Pick<IInputProps<string>, 'error'>) =>
      error
        ? getColor('background', 'danger')
        : getColor('lightGray', 'primary')};
  border-radius: 4px;
  height: 42px;
  margin-top: 3px;
  color: ${getColor('text', 'primary')};
`;

export const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const Error = styled(Typography.Text4)`
  position: absolute;
  left: calc(3px);
  color: ${getColor('text', 'error')};
`;

export const Title = styled(Typography.Text4)`
  margin-left: 10px;
`;
