export const IS_SHOW_MENU_KEY = 'IS_SHOW_MENU';
export const AUTH_KEY = 'AUTH';

class Cache {
  localCache: { [key: string]: any };

  constructor(initialCache: { [key: string]: any }) {
    this.localCache = initialCache;
  }

  private addToLocalCache<T>(key: string, value: T): T {
    this.localCache[key] = value;

    return value;
  }

  get<T>(key: string): T | null {
    if (this.localCache[key]) {
      return this.localCache[key];
    }

    const stringObj = localStorage.getItem(key);

    if (!stringObj) {
      return null;
    }

    const obj = JSON.parse(stringObj);

    return this.addToLocalCache(key, obj);
  }

  set<T>(key: string, value: T): T {
    const stringObj = JSON.stringify(value);

    this.addToLocalCache(key, value);

    localStorage.setItem(key, stringObj);

    return value;
  }
}

export const cache = new Cache({});
