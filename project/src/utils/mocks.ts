import {datatype, address, random} from 'faker';
import {getRandomInteger} from './common';

const weatherConditions: string[] = [
  'Thunderstorm',
  'Drizzle',
  'Rain',
  'Snow',
  'Atmosphere',
  'Clear',
  'Clouds'
];

const makeFakeWeatherCard = () => (
  {
    coord: {
      lon: +address.longitude(...Array(2), 2),
      lat: +address.latitude(...Array(2), 2)
    },
    weather: [
      {
        id: datatype.number({min: 200, max: 804}), //Weather condition id
        main: weatherConditions[getRandomInteger(0, 6)],
        description: random.words(2),
        ico: random.alphaNumeric(3)
      }
    ],
    base: 'stations',
    main: {
      temp: datatype.number({min: 273.15, max: 320, precision: 2}), //Temperature. Unit Default: Kelvin
      feelsLike: datatype.number({min: 273.15, max: 320, precision: 2}),
      tempMin: datatype.number({min: 273.15, max: 310, precision: 2}),
      tempMax: datatype.number({min: 273.15, max: 330, precision: 2}),
      pressure: 1023, //used as default
      humidity: datatype.number({min: 20, max: 100})
    },
    visibility: datatype.number({min: 0, max: 10000}),
    wind: {
      speed: datatype.number({min: 0, max: 25, precision: 1}),
      deg: datatype.number({min: 0, max: 360}) //Wind direction, degrees (meteorological)
    },
    clouds: {
      all: datatype.number({min: 1, max: 100}) //cloudness, %
    },
    dt: new Date().getSeconds, //Time of data calculation, unix, UTC
    sys: {
      type: 1,
      id: 5122,
      message: 0.0139,
      country: address.countryCode(),
      sunrise: new Date().getSeconds,
      sunset: new Date().getSeconds
    },
    timezone: datatype.number({min: -30000, max: 30000}), // Shift in seconds from UTC
    id: datatype.number({max: 1000000000}), //City ID
    name: address.cityName(),
    cod: 200
  }
);

const makeFakeWeatherCards = () => new Array(4).fill(null).map(() => makeFakeWeatherCard());

export {makeFakeWeatherCard, makeFakeWeatherCards};
