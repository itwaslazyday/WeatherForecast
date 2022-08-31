import ConditionFullIcon from 'components/condition-full-icon/condition-full-icon';
import { Weather, WeatherCard } from 'types/card';
import { convertToCelsius } from 'utils/big-card';
import { getRandomInteger, humanizeTime } from 'utils/common';

type BigCardFullProps = {
  weatherCard: WeatherCard;
  futureDaysTemps: {[key: string]: number[]};

}

export default function BigCardFull({ weatherCard, futureDaysTemps }: BigCardFullProps): JSX.Element {
  const { list } = weatherCard;
  const currentDay = list[0]; //Здесь все же нужно брать не первый элемент массива, а сделать поиск по текущей дате.
  const { main, wind, visibility, clouds, dt, weather } = currentDay;
  const { feelsLike, pressure, humidity } = main;

  const weatherProperties = {
    'Ощущается как': { id: 0, value: convertToCelsius(feelsLike), unit: '' },
    'Давление': { id: 1, value: pressure, unit: 'мм рт.ст' },
    'Влажность': { id: 2, value: humidity, unit: '%' },
    'Ветер': { id: 3, value: wind.speed, unit: 'м/с' },
    'Видимость': { id: 4, value: visibility, unit: 'м' },
    'Облачность': { id: 5, value: clouds.all, unit: '%' }
  };

  const makeCardProperties = () => (
    Object.entries(weatherProperties).map((property) => {
      const { id, value, unit } = property[1];
      return (
        <div className="big-card__property-wrapper" key={id}>
          <span className="big-card__property-header">{property[0]}</span>
          <span className="big-card__property">{value} <small>{unit}</small></span>
        </div>);
    })
  );

  const makeFutureForecast = () => (
    Object.entries(futureDaysTemps).map((day, idx) => {
      const tempMin = day[1][0];
      const tempMax = day[1][1];
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div className="big-card__future-wrapper" key={idx + getRandomInteger(0, 100)}>
          <span className="big-card__future-day big-card__future-property">{day[0]}</span>
          <span className="big-card__future-icon big-card__future-property">
            <img src='http://openweathermap.org/img/wn/02d@2x.png' width='50' height='50' alt="" />
          </span>
          <span className="big-card__future-temp big-card__future-property">{convertToCelsius(tempMin)} ... {convertToCelsius(tempMax)}</span>
        </div>);
    })
  );

  return (
    <div className="big-card__full">
      <div className="big-card__full-item">
        <span className="big-card__full-date">{humanizeTime(dt)}</span>
        <span className="big-card__temperature big-card__temperature--font">
          {`${convertToCelsius(main.tempMin)}... ${convertToCelsius(main.tempMax)}`}
        </span>
        {weather.map((condition) => <ConditionFullIcon key={condition.id} weatherCondition={condition} />)}
        <div className="big-card__future">
          <span className="big-card__future-header">Прогноз на три дня</span>
          {makeFutureForecast()}
        </div>
        <div className="big-card__properties">
          {makeCardProperties()}
        </div>
      </div>
    </div>
  );
}
