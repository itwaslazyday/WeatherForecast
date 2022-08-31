import dayjs from 'dayjs';
import { datatype, address } from 'faker';
import { Condition, Weather, WeatherCard } from 'types/card';
import { getRandomInteger } from './common';

const weatherConditions: Weather[] = [
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Clear',
    description: 'Ясно',
    icon: '01d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Clouds',
    description: 'малооблачно',
    icon: '02d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Clouds',
    description: 'облачно',
    icon: '03d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Clouds',
    description: 'облачно с прояснениями',
    icon: '04d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Rain',
    description: 'ливень',
    icon: '09d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Rain',
    description: 'дождь',
    icon: '10d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Thunderstorm',
    description: 'гроза',
    icon: '11d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Snow',
    description: 'снег',
    icon: '13d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Drizzle',
    description: 'туман',
    icon: '50d'
  },
];

const getPrevHour = (hour: number) => Math.floor(hour / 3) * 3;

let currentDate = new Date();

const makeFakeUnixDates = () => {
  const unixArray = [];
  const prevHour = getPrevHour(currentDate.getHours() - 3);
  const prevDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    prevHour
  );

  let prevResult = new Date(prevDate).getTime();

  unixArray.push(prevResult);

  for (let i = 0; i <= 40; i++) {
    prevResult += 10800000;
    unixArray.push(prevResult);
  }

  return unixArray;
};

const makeFakeCondition = (unixDate: number): Condition => (
  {
    dt: unixDate,
    main: {
      temp: datatype.number({ min: 273.15, max: 320, precision: 2 }),
      feelsLike: datatype.number({ min: 273.15, max: 320, precision: 2 }),
      tempMin: datatype.number({ min: 273.15, max: 310, precision: 2 }),
      tempMax: datatype.number({ min: 290, max: 310, precision: 2 }),
      pressure: getRandomInteger(500, 1200),
      humidity: datatype.number({ min: 20, max: 100 }),
      seaLevel: getRandomInteger(1010, 1020),
      grndLevel: getRandomInteger(980, 990),
      tempKf: datatype.number({ min: 0, max: 5, precision: 2 }),
    },
    weather: [weatherConditions[getRandomInteger(0, 6)]],
    clouds: {
      all: datatype.number({ min: 1, max: 100 })
    },
    wind: {
      speed: datatype.number({ min: 0, max: 25, precision: 2 }),
      deg: datatype.number({ min: 0, max: 360 }),
      gust: datatype.number({ min: 0, max: 5, precision: 2 })
    },
    visibility: datatype.number({ min: 0, max: 10000 }),
    pop: 0,
    sys: {
      pod: 'n'
    },
    dtTxt: dayjs(unixDate).format('YYYY[-]MM[-]DD HH[:]mm[:]ss').toString()
  }
);


const makeFakeWeatherCard = (): WeatherCard => (
  {
    cod: 200,
    message: 0,
    cnt: 40,
    list: makeFakeUnixDates().map((date) => makeFakeCondition(date)),
    city: {
      id: getRandomInteger(0, 1000),
      name: address.cityName(),
      coord: {
        lat: +address.longitude(...Array(2), 2),
        lon: +address.latitude(...Array(2), 2)
      },
      country: address.countryCode(),
      population: getRandomInteger(1000, 1000000),
      timezone: datatype.number({ min: -30000, max: 30000 }),
      sunrise: datatype.number({ min: 1650, max: 1700 }),
      sunset: datatype.number({ min: 1650, max: 1700 })
    }
  }
);

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const getDayOfWeek = (count: number) => {
  currentDate = new Date();
  const dayOfWeek = weekDays[(new Date(currentDate.setDate(currentDate.getDate() + count)).getDay()) - 1];
  return dayOfWeek;
};

const getDayList = (count: number, card: WeatherCard) => {
  currentDate = new Date();
  const date = new Date(currentDate.setDate(currentDate.getDate() + count)).getDate();
  const dayList = card.list.filter((item) => new Date(item.dt).getDate() === date);
  return dayList;
};

const getDayMinMax = (count: number, card: WeatherCard) => {
  const dayList = getDayList(count, card);
  const dayMax = Math.max.apply(null, dayList.map((item) => item.main.tempMax));
  const dayMin = Math.min.apply(null, dayList.map((item) => item.main.tempMin));
  return {tempMin: dayMin, tempMax: dayMax};
};

const getMostFrequentDayIcon = (count: number, card: WeatherCard) => {
  const dayList = getDayList(count, card);
  const dayIcons = dayList.map((item) => item.weather[0].icon);
  const dayIconsRepeats: {[key: string]: number} = {};
  dayIcons.forEach((icon: string) => (dayIconsRepeats[icon] = (dayIconsRepeats[icon] || 0) + 1));
  const maxRepeat = Math.max.apply(null, Object.values(dayIconsRepeats));
  const mostFrequentDayIcon = Object.keys(dayIconsRepeats).find((key) => dayIconsRepeats[key] === maxRepeat);
  return mostFrequentDayIcon as string;
};

const getFutureDaysTemps = (card: WeatherCard) => {
  const futureDaysTemps: {[key: string]: {temps: {tempMin: number, tempMax: number}, icon: string}} = {};

  for (let i = 1; i <= 3; i++) {
    futureDaysTemps[`${getDayOfWeek(i)}`] = {temps: getDayMinMax(i, card), icon: getMostFrequentDayIcon(i, card)};
  }
  return futureDaysTemps;
};

export {makeFakeWeatherCard, getFutureDaysTemps};
