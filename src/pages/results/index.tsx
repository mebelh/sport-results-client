import NavigationBar from 'components/navigationBar';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Typography from 'components/typography';

const ResultsPage: React.FC = () => {
  const {
    dalResultsStore,
    resultsStore: { init },
  } = rootStore;

  useEffect(init, []);

  return (
    <>
      <NavigationBar title={<Typography.Text3>Результаты</Typography.Text3>} />
      {dalResultsStore.results.map((result) => (
        <Typography.Text4 key={result.id}>
          {result.approaches.length}
        </Typography.Text4>
      ))}
      {dalResultsStore.isLoading && (
        <Typography.Text4>Loading....</Typography.Text4>
      )}
    </>
  );
};

export default observer(ResultsPage);
