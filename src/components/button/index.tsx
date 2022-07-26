import React from 'react';
import { IProps } from './interfaces';
import { ButtonWrapper } from './style';

const Button: React.FC<IProps> = ({
  type = 'primary',
  onClick,
  icon,
  text,
}) => (
  <ButtonWrapper type={type} onClick={onClick}>
    {icon}
    {text}
  </ButtonWrapper>
);

export default Button;
