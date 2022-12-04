import { makeAutoObservable } from 'mobx';
import { redirect, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

let navigation: ReturnType<typeof useNavigate> | null = null;

export const useSyncNavigation = () => {
  const nav = useNavigate();

  useEffect(() => {
    navigation = nav;
  }, []);
};

export class RoutingStore {
  private redirect = redirect;

  constructor() {
    makeAutoObservable(this);
  }

  // eslint-disable-next-line class-methods-use-this
  private check() {
    if (!navigation) {
      throw new Error('History is not defined');
    }
  }

  goBack = () => {
    this.check();
    navigation?.(-1);
  };

  push = (url: string) => {
    this.check();
    this.redirect(url);
  };
}
