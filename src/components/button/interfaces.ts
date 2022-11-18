import React from 'react';

export type TButtonType = 'primary' | 'danger' | 'accent';
export type TIconPosition = 'left' | 'right';

export interface IProps {
  type: TButtonType;
  icon?: React.ReactNode;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  iconPosition?: TIconPosition;
  isDisabled?: boolean;
}

export type TButtonWrapperProps = Pick<IProps, 'isDisabled'> & {
  buttonType: IProps['type'];
};
