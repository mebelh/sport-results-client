import Input from 'components/input';
import React from 'react';
import { IProps } from './interfaces';

const MultiInput: React.FC<IProps> = ({ onChange, values }) => (
  <div>
    {values.map((value, index) => (
      <Input
        value={value}
        type="string"
        onChange={(newValue) => {
          onChange(index, newValue);
        }}
      />
    ))}
  </div>
);

export default MultiInput;
