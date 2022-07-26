import React from 'react';

export type TButtonType = 'primary' | 'danger' | 'accent';

export interface IProps {
  type: TButtonType;
  icon?: React.ReactNode;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
