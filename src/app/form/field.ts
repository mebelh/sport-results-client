import { IInitFieldParams, TValidate } from 'app/form/interfaces';

export class Field<
  Name extends string | number | symbol,
  Value extends string | number = string,
  NeedCondition extends true | false = false
> {
  value?: Value;

  validateFns: Array<TValidate<Value>>;

  isConfirmed: boolean;

  errorText: string;

  name: Name;

  constructor(props: IInitFieldParams<Name, Value, NeedCondition>) {
    this.isConfirmed = false;
    this.value = props.initialValue;
    this.errorText = props.errorText || '';
    this.validateFns = props.validate;
    this.name = props.name;
  }

  validate() {
    this.isConfirmed = true;
  }

  get isError(): boolean {
    return Boolean(this.validateFns.find((fn) => !fn(this.value)));
  }

  setValue(value: typeof this['value']) {
    this.value = value;
  }
}
