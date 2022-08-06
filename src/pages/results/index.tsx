import React from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Typography from 'components/typography';

const ResultsPage: React.FC = () => {
  const { userInfo } = rootStore.dalUserStore;

  return (
    <Typography.Text3>
      Привет {userInfo?.firstName || userInfo?.login}
    </Typography.Text3>
  );
};

export default observer(ResultsPage);
