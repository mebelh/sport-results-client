import { Field } from 'app/form/field';
import { makeAutoObservable } from 'mobx';
import { TValue, TMultiFields, TInitMultiFieldsParams } from './interfaces';

export class MultiFieldsForm<
  MultiFields extends {
    [key: string]: TValue | TValue[];
  }
> {
  fields: TMultiFields<MultiFields>;

  constructor(initMultiFieldsParams: TInitMultiFieldsParams<MultiFields>) {
    this.fields = getMultiFields(initMultiFieldsParams);
    makeAutoObservable(this);
  }
}

const getMultiFields = <
  Fields extends {
    [key: string]: TValue | TValue[];
  }
>(
  initMultiFieldsParams: TInitMultiFieldsParams<Fields>
): MultiFieldsForm<Fields>['fields'] =>
  Object.keys(initMultiFieldsParams).reduce(
    (acc, key) => ({
      ...acc,
      [key]: new Field(initMultiFieldsParams[key]),
    }),
    {} as TMultiFields<Fields>
  );
