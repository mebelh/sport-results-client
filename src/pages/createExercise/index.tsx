import React, { useEffect } from 'react';
import Input from 'components/input';
import { observer } from 'mobx-react-lite';
import Button from 'components/button';
import { MultiSelect } from 'components/select';
import NavigationBar from 'components/navigationBar';
import { rootStore } from 'dal/root-store';
import Typography from 'components/typography';
import { snakeBar } from 'app/snakeBar/store';
import { FormWrapper } from './style';

const CreateExercisePage: React.FC = () => {
  const {
    exercisesStore: { form, equipmentIds, init },
  } = rootStore;

  useEffect(init, []);

  return (
    <div>
      <NavigationBar
        title={<Typography.Text3>Создать упражнение</Typography.Text3>}
      />
      <FormWrapper onSubmit={form.onSubmit}>
        <Input
          {...form.fields.name.inputProps}
          type="string"
          title="Название"
        />

        <MultiSelect
          {...form.fields.equipment.inputProps}
          placeholder="Выберите"
          elements={equipmentIds}
          title="Реквизит"
        />
        <Button
          type="accent"
          text="Ок"
          isDisabled={form.isError && form.isDirty}
        />
      </FormWrapper>
    </div>
  );
};

export default observer(CreateExercisePage);
