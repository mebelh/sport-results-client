export function checkActiveTab(tab: string): string {
  switch (true) {
    case tab.includes('user'):
      return 'user';
    case tab.includes('settings'):
      return 'settings';
    default:
      return 'user';
  }
}
