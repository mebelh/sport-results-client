import { observer } from 'mobx-react-lite';
import Layout from 'components/layout';
import Button from 'components/button';
import { rootStore } from 'dal/root-store';
import React from 'react';

function SettingsPage() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default observer(SettingsPage);
