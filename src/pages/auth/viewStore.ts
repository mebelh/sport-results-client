import { Form } from 'app/form';
import { isPhone, isTruthy } from 'app/form/validates';
import { snakeBarEmitter } from 'app/snakeBar/snakeBarEmitter';
import { RootStore } from 'dal/root-store';
import { makeAutoObservable } from 'mobx';
import { EAuthStep } from './interfaces';

export class AuthStore {
  rootStore: RootStore;

  step: EAuthStep = EAuthStep.inputPhone;

  phone: number;

  inputPhoneForm = new Form<{
    phone: number;
  }>(
    {
      phone: {
        initialValue: 8,
        validate: [isTruthy(), isPhone()],
      },
    },
    {},
    {
      onSuccess: async ({ phone }) => {
        await this.rootStore.dalAuthStore.sendVerifyCode(phone);
        this.phone = phone;
        this.goToVerifyCode();
      },
    }
  );

  verifyCodeForm = new Form<{
    code: string;
  }>(
    {
      code: {
        validate: [isTruthy()],
        initialValue: '',
      },
    },
    {},
    {
      onSuccess: async ({ code }) => {
        try {
          await this.rootStore.dalAuthStore.login(this.phone, code);
        } catch (e) {
          snakeBarEmitter.emitError({
            title: 'Неверный код',
          });
        }
      },
    }
  );

  private goToVerifyCode() {
    this.step = EAuthStep.verifyCode;
    this.rootStore.routing.push(`/auth/${EAuthStep.verifyCode}`);
  }

  private goToInputPhone() {
    this.step = EAuthStep.inputPhone;
    this.rootStore.routing.push(`/auth/${EAuthStep.inputPhone}`);
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.phone = 8;

    makeAutoObservable(this);
  }

  init = () => {
    this.goToInputPhone();
    console.log('asd');

    return () => {
      this.phone = 8;
      this.goToInputPhone();
    };
  };
}
