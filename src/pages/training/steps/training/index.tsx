import Button from 'components/button';
import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

const TrainingStep: React.FC = () => {
  const { workout, training, clearTimeToStartInterval, goToCreateApproach } =
    rootStore.trainingStore;

  useEffect(() => clearTimeToStartInterval, []);

  return (
    <div>
      <Typography.Text2 centered>{workout?.name}</Typography.Text2>

      {training?.approaches.map((approach) => (
        <div key={approach.id}>
          <Typography.Text3>{approach.exercise.name}</Typography.Text3>
          <Typography.Text3>Вес: {approach.weight}</Typography.Text3>
          <Typography.Text3>
            Количество повторений: {approach.repetitionsNumber}
          </Typography.Text3>
        </div>
      ))}

      <Button
        type="primary"
        text="Добавить подход"
        onClick={goToCreateApproach}
      />
    </div>
  );
};

export default observer(TrainingStep);
