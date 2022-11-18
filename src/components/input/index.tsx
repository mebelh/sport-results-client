import React, { useCallback, useState } from 'react';
import {
  Error,
  Wrapper,
  Input as StyledInput,
  Title,
  InputWrapper,
} from './style';
import { TInputProps } from './interfaces';

const Input = ({
  value,
  type = 'string',
  onChange,
  error,
  title,
  icon,
}: TInputProps) => {
  const [localValue, setLocalValue] = useState(value || '');

  const inputValue = value ?? localValue;

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      ({ target: { value: newValue } }) => {
        if (type === 'string') {
          onChange?.(newValue, inputValue);
          setLocalValue(newValue);
          return;
        }

        if (newValue && !Number.isInteger(+newValue)) {
          return;
        }
        onChange?.(+newValue, inputValue);
        setLocalValue(+newValue);
      },
      [onChange, inputValue]
    );

  return (
    <Wrapper>
      <Title>{title}</Title>
      <InputWrapper error={error}>
        {icon && <div>{icon}</div>}
        <StyledInput
          type="text"
          onChange={onChangeHandler}
          value={value ?? localValue}
        />
      </InputWrapper>
      <Error>{error}</Error>
    </Wrapper>
  );
};

export default Input;
