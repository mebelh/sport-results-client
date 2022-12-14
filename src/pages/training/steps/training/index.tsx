import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const TrainingStep: React.FC = () => {
  const { initTrainingStep } = rootStore.trainingStore;

  useEffect(initTrainingStep, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default observer(TrainingStep);
