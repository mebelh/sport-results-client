import React from 'react';

export type TButtonType = 'primary' | 'danger' | 'accent';
export type TIconPosition = 'left' | 'right';

export interface IProps {
  type: TButtonType;
  icon?: React.ReactNode;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  iconPosition?: TIconPosition;
}
