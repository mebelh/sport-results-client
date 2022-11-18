import { Field } from 'app/form/field';

export type TValue = string | number | boolean;

export type TKey = string | number | symbol;

export type TFormMode = 'onChange' | 'onSubmit';

export type TValidate<T extends TValue | TValue[] = string> = (
  value?: T
) => true | string;

export type TValidateFn<
  Type extends TValue | TValue[] = string,
  E extends true | false = false
> = E extends true
  ? (compression: number, errorText?: string) => TValidate<Type>
  : (errorText?: string) => TValidate<Type>;

export interface IInitFieldParams<
  Name extends TKey,
  Type extends TValue | TValue[]
> {
  validate: Array<TValidate<Type>>;
  initialValue: Type;
  errorText?: string;
  name: Name;
  mode?: TFormMode;
}

export type IFields<
  Fields extends {
    [key: string]: TValue | TValue[];
  }
> = {
  [key in keyof Fields]: Field<key, Fields[key]>;
};

type TOnSuccess<
  Fields extends {
    [key: string]: TValue | TValue[];
  }
> = (fields: {
  [key in keyof Fields]: Fields[key];
}) => void | Promise<void>;

type TOnError<
  Fields extends {
    [key: string]: TValue | TValue[];
  }
> = (fields: {
  [key in keyof Fields]?: string;
}) => void | Promise<void>;

export interface IInitFieldsHooks<
  Fields extends {
    [key: string]: TValue | TValue[];
  }
> {
  onSuccess?: TOnSuccess<Fields>;
  onError?: TOnError<Fields>;
}

export type TInitFieldsParams<
  Fields extends {
    [key: string]: TValue | TValue[];
  }
> = {
  [key in keyof Fields]: Omit<IInitFieldParams<key, Fields[key]>, 'name'>;
};
