import dayjs from 'dayjs';
require('dayjs/locale/ru');

const getRandomInteger = (min: number, max: number) => {
  const result = Math.floor(Math.random() * (max - min + 1) + min);
  return result;
};

const convertToUpperCase = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);


const humanizeTime = (unix: number) => dayjs(unix).locale('ru').format('DD MMMM');

export { getRandomInteger, convertToUpperCase, humanizeTime };
