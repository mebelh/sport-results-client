import dayjs from 'dayjs';

const DATE_TIME_FORMAT_FULL = 'DD.MM.YYYY hh:mm';
const DATE_TIME_FORMAT_SHORT = 'DD.MM hh:mm';
const DATE_FORMAT_FULL = 'DD.MM.YYYY';
const DATE_FORMAT_SHORT = 'DD.MM';

export const formatDateTimeToFull = (date: string) => {
  const parsedDate = dayjs(date);
  if (parsedDate.isAfter(dayjs().subtract(1, 'y'))) {
    return parsedDate.format(DATE_TIME_FORMAT_SHORT);
  }

  return parsedDate.format(DATE_TIME_FORMAT_FULL);
};
