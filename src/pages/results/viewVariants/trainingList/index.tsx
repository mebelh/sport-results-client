import Checkbox from 'components/checkbox';
import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import Result from 'pages/results/components/result';
import { ResultsListWrapper } from 'pages/results/style';
import React from 'react';

const ResultsTrainingList: React.FC = () => {
  const {
    resultsStore: {
      results,
      onlyNoEmptyResults,
      onlyNoEmptyResultsFilter,
      toggleOnlyNoEmptyResults,
    },
    dalResultsStore: {
      results: { length: allResultsLength },
    },
  } = rootStore;

  return (
    <div>
      <Checkbox
        value={onlyNoEmptyResultsFilter}
        onChange={toggleOnlyNoEmptyResults}
        title="Только тренировки с подходами"
        mt={20}
      />

      <Typography.Text3>Всего тренировок: {allResultsLength}</Typography.Text3>
      <Typography.Text3>
        Из них вы занимались: {onlyNoEmptyResults.length}
      </Typography.Text3>

      <Typography.Text3 mt={20} centered>
        Последние тренировки
      </Typography.Text3>

      <ResultsListWrapper>
        {results.map((result) => (
          <Result {...result} key={result.id} />
        ))}
      </ResultsListWrapper>
    </div>
  );
};

export default observer(ResultsTrainingList);
