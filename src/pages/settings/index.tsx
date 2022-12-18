import { observer } from 'mobx-react-lite';
import Button from 'components/button';
import { rootStore } from 'dal/root-store';
import React from 'react';

function SettingsPage() {
  return (
    <>
      <Button
        type="danger"
        text="Выйти"
        onClick={rootStore.dalAuthStore.logout}
        mt={50}
      />
      <Button
        type="primary"
        text="Тема"
        onClick={rootStore.dalUIStore.toggleTheme}
        mt={20}
      />
    </>
  );
}

export default observer(SettingsPage);
