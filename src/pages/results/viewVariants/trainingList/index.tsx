import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import Result from 'pages/results/components/result';
import { ResultsListWrapper } from 'pages/results/style';
import React from 'react';

const ResultsTrainingList: React.FC = () => {
  const { results } = rootStore.dalResultsStore;

  return (
    <div>
      <ResultsListWrapper>
        {results.map((result) => (
          <Result {...result} key={result.id} />
        ))}
      </ResultsListWrapper>
    </div>
  );
};

export default observer(ResultsTrainingList);
