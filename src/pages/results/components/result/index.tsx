import Typography from 'components/typography';
import { IResult } from 'dal/results/interfaces';
import React from 'react';
import { formatDateTimeToFull } from 'utils/parseDate';
import { ApproachesListWrapper, ResultWrapper } from './style';

const Result: React.FC<IResult> = ({ date, approaches, workout }) => (
  <ResultWrapper>
    <Typography.Text4>
      {formatDateTimeToFull(date)} {workout?.name}
    </Typography.Text4>

    {!approaches.length && <Typography.Text4>Бездельничал</Typography.Text4>}

    {!!approaches.length && (
      <ApproachesListWrapper>
        {approaches.map((approach) => (
          <div key={approach.id}>
            <Typography.Text3>{approach.exercise.name}</Typography.Text3>
            <Typography.Text4>Вес: {approach.weight}</Typography.Text4>
            <Typography.Text4>
              Повторений: {approach.repetitionsNumber}
            </Typography.Text4>
          </div>
        ))}
      </ApproachesListWrapper>
    )}
  </ResultWrapper>
);

export default Result;
