import React, { useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Input from 'components/input';
import Typography from 'components/typography';
import Button from 'components/button';
import { ListWrapper, EquipmentWrapper, NewEquipmentWrapper } from './style';

const EquipmentPage: React.FC = () => {
  const { createEquipment, inputProps, init } = rootStore.equipmentStore;
  const { equipment, isLoading } = rootStore.dalEquipmentStore;

  useLayoutEffect(init, []);

  return (
    <div>
      <NewEquipmentWrapper>
        <Typography.Text2>Новый реквизит</Typography.Text2>
        <Input title="Название" {...inputProps} />
        <Button type="primary" text="Создать" onClick={createEquipment} />
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
