import BigCardIcon from 'components/big-card-icon/big-card-icon';
import { Card, Weather } from 'types/card';
import { convertToCelsius, getWindDirection } from 'utils/big-card';
import { convertToUpperCase, getRandomInteger, humanizeTime } from 'utils/common';

type FullInfoProps = {
  weatherCard: Card
}

export default function FullInfo({ weatherCard }: FullInfoProps): JSX.Element {
  const { main, weather, visibility, clouds, wind, dt } = weatherCard;

  const makeFullCondition = (condition: Weather) => (
    <div className="big-card__full-condition big-card__full-condition--position">
      <BigCardIcon key={condition.id} iconName={condition.icon} />
      <span>{convertToUpperCase(condition.description)}</span>
    </div>
  );

  const weatherProperties = {
    'Ощущается как': {id: 0, value:convertToCelsius(main.feelsLike), unit: ''},
    'Давление': {id: 1, value: main.pressure, unit: 'мм рт.ст'},
    'Влажность': {id: 2, value: main.humidity, unit: '%'},
    'Ветер': {id: 3, value: wind.speed, unit: 'м/с'},
    'Видимость': {id: 4, value: visibility, unit: 'м'},
    'Облачность': {id: 5, value: clouds.all, unit: '%'}
  };

  const makeCardProperties = () => (
    Object.entries(weatherProperties).map((property) =>
    {
      const {id, value, unit} = property[1];
      return (
        <div className="big-card__property-wrapper" key={id}>
          <span className="big-card__property-header">{property[0]}</span>
          <span className="big-card__property">{value} <small>{unit}</small></span>
        </div>);
    })
  );

  const makeFutureForecast = () => (
    new Array(3).fill(weatherCard).map((day) =>
    {
      const {tempMin, tempMax} = day.main;
      const {icon} = day.weather[0];
      const {id} = day.sys;
      return (
        <div className="big-card__future-wrapper" key={id + getRandomInteger(0, 100)}>
          <span className="big-card__future-day big-card__future-property">Вт</span>
          <span className="big-card__future-icon big-card__future-property">
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} width='50' height='50' alt="" />
          </span>
          <span className="big-card__future-temp big-card__future-property">{convertToCelsius(tempMin)} ... {convertToCelsius(tempMax)}</span>
        </div>);
    })
  );

  return (
    <div className="big-card__full-item">
      <span className="big-card__full-date">{humanizeTime(dt)}</span>
      <span className="big-card__temperature big-card__temperature--font">
        {`${convertToCelsius(main.tempMin)}... ${convertToCelsius(main.tempMax)}`}
      </span>
      {weather.map((condition) => makeFullCondition(condition))}
      <div className="big-card__future">
        <span className="big-card__future-header">Прогноз на три дня</span>
        {makeFutureForecast()}
      </div>
      <div className="big-card__properties">
        {makeCardProperties()}
      </div>
    </div>
  );
}
