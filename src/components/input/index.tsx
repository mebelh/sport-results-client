import React, { useCallback, useState } from 'react';
import { IProps } from './interfaces';
import {
  Error,
  Wrapper,
  Input as StyledInput,
  Title,
  InputWrapper,
} from './style';

const Input: React.FC<IProps> = ({
  value,
  type,
  onChange,
  error,
  title,
  icon,
}) => {
  const [localValue, setLocalValue] = useState(value || '');

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target: { value: newValue } }) => {
      onChange?.(newValue, value ?? localValue);
      setLocalValue(newValue);
    }, []);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <InputWrapper>
        {icon && <div>{icon}</div>}
        <StyledInput
          type={type || 'text'}
          onChange={onChangeHandler}
          value={value ?? localValue}
        />
      </InputWrapper>
      <Error>{error}</Error>
    </Wrapper>
  );
};

export default Input;
