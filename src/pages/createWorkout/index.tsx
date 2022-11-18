import React, { useEffect } from 'react';
import { rootStore } from 'dal/root-store';
import NavigationBar from 'components/navigationBar';
import Typography from 'components/typography';
import { observer } from 'mobx-react-lite';
import Button from 'components/button';
import Input from 'components/input';
import { MultiSelect } from 'components/select';

const CreateWorkoutPage: React.FC = () => {
  const {
    createWorkoutStore: { init, form, exercises },
  } = rootStore;

  useEffect(init, []);

  return (
    <div>
      <NavigationBar
        title={<Typography.Text3>Создать тренировку</Typography.Text3>}
      />

      <form onSubmit={form.onSubmit}>
        <Input
          {...form.fields.name.inputProps}
          type="string"
          title="Название"
        />

        <MultiSelect
          {...form.fields.exercises.inputProps}
          elements={exercises}
          title="Упражнения"
        />
        <Button type="accent" text="Создать" isDisabled={form.canSubmit} />
      </form>
    </div>
  );
};

export default observer(CreateWorkoutPage);
