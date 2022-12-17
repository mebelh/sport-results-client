import NavigationBar from 'components/navigationBar';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Typography from 'components/typography';
import { Outlet } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const {
    dalResultsStore: { isLoading },
    resultsStore: { init },
  } = rootStore;

  useEffect(init, []);

  return (
    <>
      <NavigationBar title={<Typography.Text3>Результаты</Typography.Text3>} />

      <Outlet />

      {isLoading && <Typography.Text4>Loading....</Typography.Text4>}
    </>
  );
};

export default observer(ResultsPage);
