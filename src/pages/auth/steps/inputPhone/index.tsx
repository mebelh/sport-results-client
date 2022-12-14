import Button from 'components/button';
import Input from 'components/input';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React from 'react';

const InputPhoneStep: React.FC = () => {
  const { inputPhoneForm } = rootStore.authStore;
  return (
    <form onSubmit={inputPhoneForm.onSubmit}>
      <Input
        title="Номер телефона"
        {...inputPhoneForm.fields.phone.inputProps}
        type="number"
        placeholder="89** *** ** **"
      />
      <Button type="primary" text="Отправить код" />
    </form>
  );
};

export default observer(InputPhoneStep);
