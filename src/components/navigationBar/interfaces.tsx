import { ReactNode } from 'react';

export interface IProps {
  title?: ReactNode;
  goBackHandler?: () => void;
}
