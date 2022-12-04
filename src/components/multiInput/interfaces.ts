import { TValue } from 'app/form/interfaces';

export interface IProps {
  values: string[];
  onChange: (index: number, value: TValue) => void;
}
