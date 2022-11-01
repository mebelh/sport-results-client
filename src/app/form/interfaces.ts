import { Field } from 'app/form/field';

export type TValue = string | number | boolean;

export type TValidate<T extends TValue = string> = (
  value?: T
) => boolean | string;

export type TValidateFn<
  T extends TValue = string,
  E extends boolean = false
> = (
  errorText: string,
  compression: E extends true ? number : undefined
) => TValidate<T>;

export interface IInitFieldParams<
  Name extends string | number | symbol,
  InitValue extends string | number = string,
  E extends true | false = false
> {
  validate: Field<InitValue, InitValue, E>['validateFns'];
  initialValue?: InitValue;
  name: Name;
  errorText?: string;
}

export type IFields<Args extends Array<string | number | symbol>> = {
  [key in Args[number]]: Field<key, any, any>;
};

type TOnSuccess = <Args extends Array<string>>(
  fields: IFields<Args>
) => void | Promise<void>;
type TOnError = <Args extends Array<string>>(
  fields: IFields<Args>
) => void | Promise<void>;

export interface IInitFieldsHooks {
  onSuccess?: TOnSuccess;
  onError?: TOnError;
}

export type TInitFieldsParams<Args extends Array<string | number | symbol>> =
  Array<IInitFieldParams<keyof Args[number]>>;
