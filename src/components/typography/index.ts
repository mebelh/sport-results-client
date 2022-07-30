import { StyledComponent } from 'styled-components';
import { TColorVariant } from 'utils/getColor';
import { Text1, Text3, Text2, Text4, Text5 } from './style';

type TTypographyVariants = 'Text1' | 'Text2' | 'Text3' | 'Text4' | 'Text5';

const Typography: {
  [key in TTypographyVariants]: StyledComponent<
    'p',
    {
      variant?: TColorVariant;
    },
    {
      variant?: TColorVariant;
    }
  >;
} = {
  Text1,
  Text2,
  Text3,
  Text4,
  Text5,
};

export default Typography;
