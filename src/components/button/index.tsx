import React, { memo } from 'react';
import Typography from 'components/typography';
import { IProps } from './interfaces';
import { ButtonWrapper } from './style';

const Button: React.FC<IProps> = ({
  type = 'primary',
  onClick,
  icon,
  text,
  iconPosition = 'left',
  isDisabled,
}) => (
  <ButtonWrapper
    buttonType={type}
    type="submit"
    onClick={isDisabled ? undefined : onClick}
    isDisabled={isDisabled}
  >
    {iconPosition === 'left' && icon}
    {text && <Typography.Text3>{text}</Typography.Text3>}
    {iconPosition === 'right' && icon}
  </ButtonWrapper>
);

export default memo(Button);
