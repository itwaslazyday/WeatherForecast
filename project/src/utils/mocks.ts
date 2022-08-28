import { datatype, address } from 'faker';
import { Weather } from 'types/card';

const weatherConditions: Weather[] = [
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Clear',
    description: 'clear sky',
    icon: '01d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Clouds',
    description: 'few clouds',
    icon: '02d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Clouds',
    description: 'scattered clouds',
    icon: '03d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Clouds',
    description: 'broken clouds',
    icon: '04d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Rain',
    description: 'shower rain',
    icon: '09d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Rain',
    description: 'rain',
    icon: '10d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Thunderstorm',
    description: 'thunderstorm',
    icon: '11d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Snow',
    description: 'snow',
    icon: '13d'
  },
  {
    id: datatype.number({ min: 200, max: 804 }), //Weather condition id
    main: 'Drizzle',
    description: 'mist',
    icon: '50d'
  },
];


const makeFakeWeatherCard = () => (
  {
    coord: {
      lon: +address.longitude(...Array(2), 2),
      lat: +address.latitude(...Array(2), 2)
    },
    weather: [
      weatherConditions[2],
      weatherConditions[0],
    ],
    base: 'stations',
    main: {
      temp: datatype.number({ min: 273.15, max: 320, precision: 2 }), //Temperature. Unit Default: Kelvin
      feelsLike: datatype.number({ min: 273.15, max: 320, precision: 2 }),
      tempMin: datatype.number({ min: 273.15, max: 310, precision: 2 }),
      tempMax: datatype.number({ min: 310, max: 330, precision: 2 }),
      pressure: 1023, //used as default
      humidity: datatype.number({ min: 20, max: 100 })
    },
    visibility: datatype.number({ min: 0, max: 10000 }),
    wind: {
      speed: datatype.number({ min: 0, max: 25, precision: 1 }),
      deg: datatype.number({ min: 0, max: 360 }) //Wind direction, degrees (meteorological)
    },
    clouds: {
      all: datatype.number({ min: 1, max: 100 }) //cloudness, %
    },
    dt: datatype.number({ min: 1650, max: 1700 }), //Time of data calculation, unix, UTC
    sys: {
      type: 1,
      id: 5122,
      message: 0.0139,
      country: address.countryCode(),
      sunrise: datatype.number({ min: 1650, max: 1700 }),
      sunset: datatype.number({ min: 1650, max: 1700 })
    },
    timezone: datatype.number({ min: -30000, max: 30000 }), // Shift in seconds from UTC
    id: datatype.number({ max: 1000000000 }), //City ID
    name: address.cityName(),
    cod: 200
  }
);

const makeFakeWeatherCards = () => new Array(10).fill(null).map(() => makeFakeWeatherCard());

export { makeFakeWeatherCard, makeFakeWeatherCards };
