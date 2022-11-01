import { Field } from 'app/form/field';
import { FormEventHandler } from 'react';
import {
  IFields,
  TInitFieldsParams,
  IInitFieldsHooks,
  TValue,
} from './interfaces';

export class Form<Args extends Array<string | symbol | number> = []> {
  fields: IFields<Args>;

  hooks: IInitFieldsHooks;

  isDirty: boolean;

  constructor(fields: TInitFieldsParams<Args>, hooks: Form['hooks']) {
    this.isDirty = false;
    this.fields = getFields<Args>(fields);
    this.hooks = hooks;
  }

  get fieldsList(): Field<keyof Args[number]>[] {
    return Object.values(this.fields);
  }

  get isError(): boolean {
    if (!this.isDirty) {
      return false;
    }
    return !!this.fieldsList.find((field) => field.isError);
  }

  validate = () => {
    this.fieldsList.forEach((field) => {
      field.validate();
    });
  };

  setValue = (key: keyof Args[number], value: TValue) => {
    this.fields[key].setValue(value);
  };

  onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    return this.isError;
  };
}

const getFields = <Args extends Array<string | number | symbol>>(
  initFieldsParams: TInitFieldsParams<Args>
): Form<Args>['fields'] =>
  initFieldsParams.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: new Field(field),
    }),
    {}
  ) as Form<Args>['fields'];
