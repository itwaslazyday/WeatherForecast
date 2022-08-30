import dayjs from 'dayjs';
import { datatype, address } from 'faker';
import { Condition, Weather, WeatherCard } from 'types/card';
import { getRandomInteger } from './common';

const FakeCityType = {
  1: 'Москва',
  2: 'Лондон',
  3: 'Чикаго'
};

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

const makeFakeUnixDates = () => {
  const unixArray = [];
  const currentDate = dayjs().unix();
  let currentResult = currentDate - 10800;

  unixArray.push(currentResult);

  for (let i = 0; i <= 40; i++) {
    currentResult += 10800;
    unixArray.push(currentResult);
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
      tempMax: datatype.number({ min: 310, max: 330, precision: 2 }),
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
    dtTxt: dayjs().format('YYYY[-]MM[-]DD hh[:]mm[:]ss').toString()
  }
);


const makeFakeWeatherCard = (cityName: string): WeatherCard => (
  {
    cod: 200,
    message: 0,
    cnt: 40,
    list: makeFakeUnixDates().map((item) => makeFakeCondition(item)),
    city: {
      id: getRandomInteger(0, 1000),
      name: cityName,
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

export { makeFakeWeatherCard, FakeCityType };
