import Input from 'components/input';
import React from 'react';
import { IProps } from './interfaces';

const MULTI_INPUT = 'MULTI_INPUT';

const MultiInput: React.FC<IProps> = ({ onChange, values }) => (
  <div>
    {values.map((value, index) => (
      <Input
        value={value}
        type="string"
        /* eslint-disable-next-line react/no-array-index-key */
        key={`${MULTI_INPUT} ${index}`}
        onChange={(newValue) => {
          onChange(index, newValue);
        }}
      />
    ))}
  </div>
);

export default MultiInput;
