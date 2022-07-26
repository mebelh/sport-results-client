import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';
import { ETheme } from './interfaces';

export const root = document.getElementById('root') as HTMLElement;

export class DalUIStore {
  private rootStore: RootStore;

  theme: ETheme = ETheme.light;

  get isDark() {
    return this.theme === ETheme.dark;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.setTheme(ETheme.light);
    makeAutoObservable(this);
  }

  private setTheme = (theme: ETheme) => {
    if (this.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    this.theme = theme;
  };

  toggleTheme = () => {
    this.setTheme(this.isDark ? ETheme.light : ETheme.dark);
  };
}
