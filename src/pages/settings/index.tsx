import { observer } from 'mobx-react-lite';
import Button from 'components/button';
import { rootStore } from 'dal/root-store';
import React from 'react';

function SettingsPage() {
  return (
    <>
      <Button
        type="primary"
        text="Выйти"
        onClick={rootStore.dalAuthStore.logout}
      />
      <Button
        type="primary"
        text="Тема"
        onClick={rootStore.dalUIStore.toggleTheme}
      />
    </>
  );
}

export default observer(SettingsPage);
