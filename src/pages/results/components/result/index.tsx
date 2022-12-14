import Typography from 'components/typography';
import { IResult } from 'dal/results/interfaces';
import React from 'react';
import { formatDateTimeToFull } from 'utils/parseDate';
import { ApproachesListWrapper } from './style';

const Result: React.FC<IResult> = ({ date, approaches }) => (
  <div>
    <Typography.Text4>{formatDateTimeToFull(date)}</Typography.Text4>

    {!approaches.length && <Typography.Text4>Бездельничал</Typography.Text4>}

    {!!approaches.length && (
      <ApproachesListWrapper>
        {approaches.map((approach) => (
          <Typography.Text3 key={approach.id}>
            <div>{approach.exercise.name}</div>
            <div>Вес: {approach.weight}</div>
            <div>Повторений: {approach.repetitionsNumber}</div>
          </Typography.Text3>
        ))}
      </ApproachesListWrapper>
    )}
  </div>
);

export default Result;
