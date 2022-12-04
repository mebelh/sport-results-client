import { TValue } from 'app/form/interfaces';

export interface IProps {
  values: TValue[];
  onChange: (index: number, value: TValue) => void;
}
