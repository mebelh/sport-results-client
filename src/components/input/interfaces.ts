import { ReactNode } from 'react';
import { TValue } from 'app/form/interfaces';

export interface IInputProps<Type extends TValue | TValue[]> {
  onChange?: (newValue: Type, oldValue?: Type) => void;
  value?: Type;
  icon?: ReactNode;
  title?: string;
  error?: string | boolean;
  type?: 'string' | 'number';
  placeholder?: string;
}

type TOnChange<Type extends TValue | TValue[]> = (
  newValue: Type,
  oldValue?: Type
) => void;

type TInputPropsString = Omit<IInputProps<string>, 'onChange' | 'type'> & {
  type?: 'string';
  onChange?: TOnChange<string>;
};

type TInputPropsNumber = Omit<IInputProps<number>, 'onChange' | 'type'> & {
  type?: 'number';
  onChange?: TOnChange<number>;
};

export type TInputProps = TInputPropsNumber | TInputPropsString;
