import React from 'react';

export enum ETrainingSteps {
  SelectTraining = 'SelectTraining',
  BeforeStart = 'BeforeStart',
  Training = 'Training',
  AddApproach = 'AddApproach',
}

export type TTrainingSteps = {
  [key in ETrainingSteps]: React.FC;
};
