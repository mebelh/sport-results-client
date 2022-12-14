import React from 'react';

export enum ETrainingSteps {
  SelectTraining = 'selectTraining',
  BeforeStart = 'beforeStart',
  ApproachesList = 'approaches',
  AddApproach = 'addApproach',
}

export type TTrainingSteps = {
  [key in ETrainingSteps]: React.FC;
};
