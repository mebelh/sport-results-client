import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';
import { cache, IS_SHOW_MENU_KEY } from 'utils/cache';
import { ETheme } from './interfaces';

export const root = document.getElementById('root') as HTMLElement;

export class DalUIStore {
  private rootStore: RootStore;

  theme: ETheme = ETheme.light;

  isShowMenu = true;

  get isDark() {
    return this.theme === ETheme.dark;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.setTheme(ETheme.light);
    this.isShowMenu = cache.get<boolean>(IS_SHOW_MENU_KEY) ?? true;
    makeAutoObservable(this);
  }

  toggleShowMenu = () => {
    this.setShowMenu(!this.isShowMenu);
  };

  private setShowMenu = (isShow: boolean) => {
    this.isShowMenu = isShow;
    cache.set(IS_SHOW_MENU_KEY, isShow);
  };

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
