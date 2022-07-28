import React from 'react';
import Typography from 'components/typography';
import { IProps } from './interfaces';
import { Wrapper } from './style';

const LogoLoader: React.FC<IProps> = ({ fullscreen }) => (
  <Wrapper fullscreen={fullscreen}>
    <Typography.Text1>SR</Typography.Text1>
  </Wrapper>
);

export default LogoLoader;
