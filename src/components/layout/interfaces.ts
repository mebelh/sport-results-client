import React from 'react';

export interface IProps {
  children: React.ReactNode;
}

export interface IWrapperProps {
  isShowMenu: boolean;
}

export interface IMenuItemWrapperProps {
  isActive?: boolean;
}
