import React from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Typography from 'components/typography';
import Layout from 'components/layout';

const ResultsPage: React.FC = () => {
  const { userInfo } = rootStore.dalUserStore;

  return (
    <Layout>
      <Typography.Text3>Привет {userInfo?.firstName}</Typography.Text3>
    </Layout>
  );
};

export default observer(ResultsPage);
