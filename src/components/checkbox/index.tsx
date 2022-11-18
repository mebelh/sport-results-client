import React, { useState } from 'react';
import { IProps } from './interfaces';
import { Value, Container, Title, ContainerValue, Error } from './style';

const Checkbox: React.FC<IProps> = ({ title, value, onChange, error }) => {
  const [state, setState] = useState<boolean>(value || false);

  const handleChange = (): void => {
    if (value !== undefined) {
      onChange?.(!value);
      return;
    }

    setState((oldState) => !oldState);
  };

  return (
    <Container onClick={handleChange}>
      <ContainerValue error={error}>
        <Value value={value ?? state} />
      </ContainerValue>
      {title && <Title>{title}</Title>}
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Checkbox;
