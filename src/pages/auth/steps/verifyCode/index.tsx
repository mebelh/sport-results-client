import Button from 'components/button';
import Input from 'components/input';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React from 'react';

const VerifyCodeStep = () => {
  const { verifyCodeForm } = rootStore.authStore;
  return (
    <form onSubmit={verifyCodeForm.onSubmit}>
      <Input
        title="Код подтверждения"
        placeholder="****"
        {...verifyCodeForm.fields.code.inputProps}
        type="string"
      />
      <Button type="accent" text="Отправить" />
    </form>
  );
};

export default observer(VerifyCodeStep);
