import React from 'react';
import Typography from 'components/typography';
import { IProps } from './interfaces';
import { ButtonWrapper } from './style';

const Button: React.FC<IProps> = ({
  type = 'primary',
  onClick,
  icon,
  text,
  iconPosition = 'left',
}) => (
  <ButtonWrapper type={type} onClick={onClick}>
    {iconPosition === 'left' && icon}
    <Typography.Text3>{text}</Typography.Text3>
    {iconPosition === 'right' && icon}
  </ButtonWrapper>
);

export default Button;
