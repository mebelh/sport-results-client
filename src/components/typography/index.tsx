import React from 'react';
import { StyledComponent } from 'styled-components';
import { Text1, Text3, Text2, Text4, Text5 } from './style';

type TTypographyVariants = 'Text1' | 'Text2' | 'Text3' | 'Text4' | 'Text5';

const Typography: {
  [key in TTypographyVariants]: StyledComponent<'text', any>;
} = {
  Text1,
  Text2,
  Text3,
  Text4,
  Text5,
};

export default Typography;
