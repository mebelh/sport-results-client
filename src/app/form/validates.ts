import { TValidateFn, TValue } from 'app/form/interfaces';

export const isEmail: TValidateFn = (errorText) => (value) => {
  if (
    value
      ?.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return true;

  throw errorText || 'Некорректный Email';
};

export const isUrl: TValidateFn = (errorText) => (value) => {
  if (
    !value
      ?.toLowerCase()
      .match(
        /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
      )
  )
    return true;
  throw errorText || 'Некорректный URL';
};

export const isNumber: TValidateFn<number> = (errorText) => (value) => {
  if (Number.isInteger(value)) return true;
  throw errorText || 'Некорректное число';
};

export const isTruthy: TValidateFn<TValue> = (errorText) => (value) => {
  if (value) return true;
  throw errorText || 'Обязательно';
};

export const isLover: TValidateFn<number, true> =
  (comparison, errorText) => (value) => {
    if (value !== undefined && value < comparison) return true;
    throw errorText || `Число должно быть меньше ${comparison}`;
  };

export const isOver: TValidateFn<number, true> =
  (comparison, errorText) => (value) => {
    if (value !== undefined && value > comparison) {
      return true;
    }
    throw errorText || `Число должно быть больше ${comparison}`;
  };

export const isLengthMoreThen: TValidateFn<string | TValue[], true> =
  (compression, errorText) => (value) => {
    if (value !== undefined && value.length > compression) {
      return true;
    }

    throw errorText || `Количество должно быть больше ${compression}`;
  };

export const isPhone: TValidateFn<number> = (errorText) => (value) => {
  console.log(value);
  if (!value?.toString().match(/(^89)((\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/)) {
    return true;
  }

  throw errorText || 'Неверный формат телефона';
};
