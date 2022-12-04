import Button from 'components/button';
import Input from 'components/input';
import { Select } from 'components/select';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

const AddApproachStep: React.FC = () => {
  const { workout, addApproachForm, resetApproachForm } =
    rootStore.trainingStore;

  useEffect(() => resetApproachForm, []);

  if (!workout) {
    return <>Error!</>;
  }

  return (
    <form onSubmit={addApproachForm.onSubmit}>
      <Select
        title="Упражнение"
        elements={workout?.exercises.map((exercise) => ({
          value: exercise.id,
          label: exercise.name,
        }))}
        {...addApproachForm.fields.exercise.inputProps}
      />
      <Input
        type="number"
        title="Вес"
        {...addApproachForm.fields.weight.inputProps}
      />
      <Input
        type="number"
        title="Количество повторений"
        {...addApproachForm.fields.repetitionsNumber.inputProps}
      />

      <Button type="accent" text="Создать" />
    </form>
  );
};

export default observer(AddApproachStep);
