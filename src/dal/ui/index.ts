import { RootStore } from 'dal/root-store';
import { makeAutoObservable } from 'mobx';
import { cache, IS_SHOW_MENU_KEY, THEME_KEY } from 'utils/cache';
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
    this.setTheme(cache.get<ETheme>(THEME_KEY) || ETheme.light);
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
    this.theme = theme;
    if (this.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    cache.set(THEME_KEY, theme);
  };

  toggleTheme = () => {
    const theme = this.isDark ? ETheme.light : ETheme.dark;
    this.setTheme(theme);
  };
}
