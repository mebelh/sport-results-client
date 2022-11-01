import React, { HTMLInputTypeAttribute } from 'react';

export interface IInputProps {
  onChange?: (newValue: string, oldValue?: string) => void;
  value?: string;
  icon?: React.ReactNode;
  title?: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
}
