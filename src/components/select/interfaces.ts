import { IInputProps } from 'components/input/interfaces';
import { TValue } from 'app/form/interfaces';

export interface ISelectElement {
  value: string;
  label: string;
}

export type TSelectElementProps = Omit<
  ISelectElement,
  'value' | 'placeholder'
> & {
  onSelect: () => void;
  isSelected: boolean;
};

type TSelectPropsType<Type extends TValue> = Omit<IInputProps<Type>, 'type'> & {
  elements: ISelectElement[];
  value?: TValue;
};

type TSelectPropsString = TSelectPropsType<string> & {
  type?: 'string';
};
type TSelectPropsNumber = TSelectPropsType<number> & {
  type?: 'number';
};

export type TSelectProps = TSelectPropsString | TSelectPropsNumber;

export type TMultiSelectProps = Omit<
  IInputProps<TValue[]>,
  'type' | 'value'
> & {
  elements: ISelectElement[];
  value?: TValue[];
  // onChange?: (value: TValue, newValues: TValue[], oldValues: TValue[]) => void;
};

export interface IPosition {
  x: number;
  y: number;
  width: number;
}
