import React from 'react';
import ReactDOM from 'react-dom';
import { root } from 'main';

const Portal: React.FC<{
  children: React.ReactNode;
  open?: boolean;
}> = ({ children, open }) =>
  ReactDOM.createPortal(
    <div
      style={{
        display: open === false ? 'none' : 'block',
      }}
    >
      {children}
    </div>,
    root
  );

export default Portal;
