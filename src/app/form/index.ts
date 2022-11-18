import { Field } from 'app/form/field';
import { FormEventHandler } from 'react';
import { makeAutoObservable } from 'mobx';
import {
  IFields,
  TInitFieldsParams,
  IInitFieldsHooks,
  TValue,
} from './interfaces';

export class Form<
  Fields extends {
    [key: string]: TValue | TValue[];
  }
> {
  fields: IFields<Fields>;

  private readonly hooks: IInitFieldsHooks<Fields>;

  isDirty: boolean;

  constructor(fields: TInitFieldsParams<Fields>, hooks: Form<Fields>['hooks']) {
    this.isDirty = false;
    this.fields = getFields<Fields>(fields);
    this.hooks = hooks;

    makeAutoObservable(this);
  }

  get fieldsList(): Field<keyof Fields, Fields[keyof Fields]>[] {
    return Object.values(this.fields);
  }

  get isError(): boolean {
    return !!this.fieldsList.find((field) => field.isError);
  }

  get isErrorNotDirty(): boolean {
    if (!this.isDirty) {
      return false;
    }
    return this.isError;
  }

  get values(): Fields {
    return this.fieldsList.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.value,
      }),
      {} as Fields
    );
  }

  setValue = (key: keyof Fields, value: Fields[keyof Fields]) => {
    this.fields[key].setValue(value);
  };

  onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    this.isDirty = true;

    this.fieldsList.forEach((field) => {
      field.submit();
    });

    if (this.isError) {
      this.hooks.onError?.(
        this.fieldsList.reduce(
          (acc, field) => ({
            ...acc,
            ...(field.errorMessage ? { [field.name]: field.errorMessage } : {}),
          }),
          {}
        )
      );
      return;
    }
    this.hooks.onSuccess?.(this.values);
  };

  reset() {
    this.isDirty = false;
    this.fieldsList.forEach((field) => {
      field.reset();
    });
  }

  get canSubmit(): boolean {
    return this.isDirty && this.isError;
  }
}

const getFields = <
  Fields extends {
    [key: string]: TValue | TValue[];
  }
>(
  initFieldsParams: TInitFieldsParams<Fields>
): Form<Fields>['fields'] =>
  Object.keys(initFieldsParams).reduce(
    (acc, name) => ({
      ...acc,
      [name]: new Field<keyof Fields, Fields[keyof Fields]>({
        ...initFieldsParams[name as keyof typeof initFieldsParams],
        name,
      }),
    }),
    {}
  ) as Form<Fields>['fields'];
