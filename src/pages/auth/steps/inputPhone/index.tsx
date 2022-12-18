import Button from 'components/button';
import Input from 'components/input';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StepsForm } from '../../style';

const InputPhoneStep: React.FC = () => {
  const { inputPhoneForm, isLoading } = rootStore.authStore;
  return (
    <StepsForm onSubmit={inputPhoneForm.onSubmit}>
      <Input
        title="Номер телефона"
        {...inputPhoneForm.fields.phone.inputProps}
        type="number"
        placeholder="89** *** ** **"
        isAutoFocused
      />
      <Button type="primary" text="Отправить код" isDisabled={isLoading} />
    </StepsForm>
  );
};

export default observer(InputPhoneStep);
