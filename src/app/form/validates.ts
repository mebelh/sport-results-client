import { TValidateFn } from 'app/form/interfaces';

export const isEmail: TValidateFn<string> = (value, errorText) => () =>
  !value
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) &&
  (errorText || 'Некорректный Email');

export const isUrl: TValidateFn<string> = (value, errorText) => () =>
  !value
    .toLowerCase()
    .match(
      /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
    ) &&
  (errorText || 'Некорректный URL');

export const isNumber: TValidateFn<number> = (value, errorText) => () =>
  !Number.isInteger(value) && (errorText || 'Некорректное число');

export const isTruthy: TValidateFn<boolean> = (value, errorText) => () =>
  value && (errorText || 'Обязательно');

export const isLover: TValidateFn<number, true> =
  (errorText, comparison) => (value) =>
    value !== undefined &&
    value < comparison &&
    (errorText || `Число должно быть меньше ${comparison}`);

export const isOver: TValidateFn<number, true> =
  (errorText, comparison) => (value) =>
    value !== undefined &&
    value > comparison &&
    (errorText || `число должно быть больше ${comparison}`);
