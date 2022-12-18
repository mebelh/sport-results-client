import { Form } from 'app/form';
import { isPhone, isTruthy } from 'app/form/validates';
import { snakeBarEmitter } from 'app/snakeBar/snakeBarEmitter';
import { RootStore } from 'dal/root-store';
import { makeAutoObservable } from 'mobx';
import { EAuthStep } from './interfaces';

const RESENT_CODE_TIMEOUT = 30;

export class AuthStore {
  private rootStore: RootStore;

  private step: EAuthStep = EAuthStep.inputPhone;

  isLoading = false;

  private phone: number;

  public resendCodeTimeout = RESENT_CODE_TIMEOUT;

  canResendCode = false;

  private resentCodeInterval: ReturnType<typeof setInterval> | null = null;

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
        this.isLoading = true;
        await this.rootStore.dalAuthStore.sendVerifyCode(phone);
        this.isLoading = false;
        this.phone = phone;
        this.goToVerifyCode();

        this.inputPhoneForm.reset();
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
        this.isLoading = true;
        try {
          await this.rootStore.dalAuthStore.login(this.phone, code);
        } catch (e) {
          snakeBarEmitter.emitError({
            title: 'Неверный код',
          });
          this.verifyCodeForm.reset();
        }
        this.isLoading = false;
      },
    }
  );

  public resendCode = async () => {
    await this.rootStore.dalAuthStore.sendVerifyCode(this.phone);
    this.startResentCodeTimer();
  };

  private goToVerifyCode() {
    this.step = EAuthStep.verifyCode;
    this.rootStore.routing.push(`/auth/${EAuthStep.verifyCode}`);
    this.startResentCodeTimer();
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

  private startResentCodeTimer() {
    this.canResendCode = false;
    this.resendCodeTimeout = RESENT_CODE_TIMEOUT;

    if (this.resentCodeInterval) {
      clearInterval(this.resentCodeInterval);
    }

    this.resentCodeInterval = setInterval(() => {
      if (this.resendCodeTimeout < 2 && this.resentCodeInterval) {
        clearInterval(this.resentCodeInterval);
        this.resentCodeInterval = null;
        this.canResendCode = true;
        return;
      }
      this.resendCodeTimeout--;
    }, 1000);
  }

  init = () => () => {
    this.phone = 8;
    this.verifyCodeForm.reset();
    this.inputPhoneForm.reset();
  };
}
