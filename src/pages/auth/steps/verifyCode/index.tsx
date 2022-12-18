import Button from 'components/button';
import Input from 'components/input';
import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StepsForm } from '../../style';

const VerifyCodeStep = () => {
  const {
    verifyCodeForm,
    isLoading,
    resendCodeTimeout,
    canResendCode,
    resendCode,
  } = rootStore.authStore;

  const resendCodeVariant = (
    <Typography.Text4 variant="error" onClick={resendCode}>
      Повторный звонок
    </Typography.Text4>
  );

  const resendInterval = (
    <Typography.Text4 variant="primary">{resendCodeTimeout}</Typography.Text4>
  );

  const resend = canResendCode ? resendCodeVariant : resendInterval;

  return (
    <StepsForm onSubmit={verifyCodeForm.onSubmit}>
      <Typography.Text3>Сейчас вам поступит звонок</Typography.Text3>
      <Input
        title="Последние 4 цифры номера"
        placeholder="****"
        {...verifyCodeForm.fields.code.inputProps}
        type="string"
        mt={14}
        isAutoFocused
      />

      {resend}

      <Button type="accent" text="Отправить" isDisabled={isLoading} mt={14} />
    </StepsForm>
  );
};

export default observer(VerifyCodeStep);
