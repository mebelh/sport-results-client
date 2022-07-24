import React, { HTMLInputTypeAttribute } from 'react';

export interface IProps {
  onChange?: (newValue: string, oldValue?: string) => void;
  value?: string;
  icon?: React.ReactNode;
  title?: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
}
