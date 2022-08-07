import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Input from 'components/input';
import Typography from 'components/typography';
import Button from 'components/button';
import { ListWrapper, EquipmentWrapper, NewEquipmentWrapper } from './style';

const EquipmentPage: React.FC = () => {
  const { syncEquipmentList, equipment, isLoading, createEquipment } =
    rootStore.dalEquipmentStore;
  useEffect(() => {
    syncEquipmentList();
  }, []);
  const [newEquipment, setNewEquipment] = useState('');
  const createEquipmentHandler = () => {
    createEquipment({
      name: newEquipment,
      tags: [],
    });
    setNewEquipment('');
  };

  return (
    <div>
      <NewEquipmentWrapper>
        <Typography.Text2>Новый реквизит</Typography.Text2>
        <Input
          title="Название"
          value={newEquipment}
          onChange={setNewEquipment}
        />
        <Button
          type="primary"
          text="Создать"
          onClick={createEquipmentHandler}
        />
      </NewEquipmentWrapper>

      <ListWrapper>
        {equipment.map((e, index) => (
          <EquipmentWrapper key={e.name}>
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
