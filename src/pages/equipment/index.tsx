import React, { useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Input from 'components/input';
import Typography from 'components/typography';
import Button from 'components/button';
import NavigationBar from 'components/navigationBar';
import { ListWrapper, EquipmentWrapper, NewEquipmentWrapper } from './style';

const EquipmentPage: React.FC = () => {
  const { init, form } = rootStore.equipmentStore;
  const { equipment, isLoading } = rootStore.dalEquipmentStore;

  useLayoutEffect(init, []);

  return (
    <div>
      <NavigationBar title={<Typography.Text3>Реквизит</Typography.Text3>} />
      <NewEquipmentWrapper onSubmit={form.onSubmit}>
        <Input
          title="Название"
          {...form.fields.name.inputProps}
          type="string"
        />
        <Button type="primary" text="Создать" isDisabled={form.canSubmit} />
      </NewEquipmentWrapper>

      <ListWrapper>
        {equipment.map((e, index) => (
          <EquipmentWrapper key={e.id}>
            <Typography.Text3>
              {index + 1}. {e.name}
            </Typography.Text3>
          </EquipmentWrapper>
        ))}
      </ListWrapper>

      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default observer(EquipmentPage);
