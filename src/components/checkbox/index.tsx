import React, { useState } from 'react';
import { IProps } from './interfaces';
import { Value, Container, Title, ContainerValue } from './style';

const Checkbox: React.FC<IProps> = ({ title, value, onChange }) => {
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
      <ContainerValue>
        <Value value={value ?? state} />
      </ContainerValue>
      {title && <Title>{title}</Title>}
    </Container>
  );
};

export default Checkbox;
