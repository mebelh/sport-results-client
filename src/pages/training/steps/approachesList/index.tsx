import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ApproachesListWrapper, Button } from './style';

const ApproachesList: React.FC = () => {
  const { workout, training, goToCreateApproach, initApproachesListStep } =
    rootStore.trainingStore;

  useEffect(initApproachesListStep, []);

  return (
    <div>
      <Typography.Text2 centered>{workout?.name}</Typography.Text2>

      <ApproachesListWrapper>
        {training?.approaches.map((approach) => (
          <div key={approach.id}>
            <Typography.Text3>{approach.exercise.name}</Typography.Text3>
            <Typography.Text3>Вес: {approach.weight}</Typography.Text3>
            <Typography.Text3>
              Количество повторений: {approach.repetitionsNumber}
            </Typography.Text3>
          </div>
        ))}
      </ApproachesListWrapper>

      <Button
        type="primary"
        text="Добавить подход"
        onClick={goToCreateApproach}
      />
    </div>
  );
};

export default observer(ApproachesList);
