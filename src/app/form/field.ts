import {
  IInitFieldParams,
  TFormMode,
  TValidate,
  TValue,
} from 'app/form/interfaces';
import { makeAutoObservable } from 'mobx';
import { IInputProps } from 'components/input/interfaces';

export class Field<
  Name extends string | number | symbol,
  Value extends TValue | TValue[]
> {
  value: Value;

  initialValue: Value;

  validateFns: Array<TValidate<Value>>;

  isSubmitted: boolean;

  errorText: string;

  name: Name;

  isDirty: boolean;

  mode: TFormMode;

  constructor(props: IInitFieldParams<Name, Value>) {
    this.isSubmitted = false;
    this.isDirty = false;
    this.value = props.initialValue;
    this.initialValue = props.initialValue;
    this.validateFns = [];
    this.errorText = props.errorText || '';
    this.validateFns = props.validate || [];
    this.name = props.name;
    this.mode = props.mode || 'onSubmit';

    makeAutoObservable(this);
  }

  get errorMessage() {
    let msg: string | boolean = '';

    this.validateFns.find((fn) => {
      try {
        fn(this.value);

        return false;
      } catch (e) {
        msg = e as string;

        return true;
      }
    });

    return msg;
  }

  get error() {
    if ((this.mode === 'onSubmit' || !this.isDirty) && !this.isSubmitted) {
      return false;
    }

    return this.errorMessage;
  }

  get isError(): boolean {
    return Boolean(this.errorMessage);
  }

  get isErrorNotDirty(): boolean {
    if (!this.isDirty) {
      return false;
    }
    return this.isError;
  }

  get inputProps(): IInputProps<Value> {
    return {
      value: this.value,
      error: this.error,
      onChange: this.onChange,
    };
  }

  setValue(value: typeof this['value']) {
    this.isDirty = true;
    this.value = value;
  }

  onChange = (newValue: Value): void => {
    this.setValue(newValue);
  };

  submit() {
    this.isSubmitted = true;
  }

  reset() {
    this.isDirty = false;
    this.isSubmitted = false;
    this.value = this.initialValue;
  }
}
