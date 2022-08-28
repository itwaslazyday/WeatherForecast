import BigCardIcon from 'components/big-card-icon/big-card-icon';
import { Card, Weather } from 'types/card';
import { convertToCelsius, getWindDirection } from 'utils/big-card';
import { convertToUpperCase, humanizeTime } from 'utils/common';

type FullInfoProps = {
  weatherCard: Card
}

export default function FullInfo({ weatherCard }: FullInfoProps): JSX.Element {
  const { main, weather, visibility, wind, dt } = weatherCard;

  const makeFullCondition = (condition: Weather) => (
    <div className="big-card__full-condition">
      <BigCardIcon key={condition.id} iconName={condition.icon} />
      <span>{convertToUpperCase(condition.description)}</span>
    </div>
  );

  return (
    <div className="big-card__full-item">
      <span className="big-card__full-date">{humanizeTime(dt)}</span>
      <span className="big-card__temperature">
        {`${convertToCelsius(main.tempMin)}...${convertToCelsius(main.tempMax)}`}
      </span>
      {weather.map((condition) => makeFullCondition(condition))}
      <span className="big-card__full-feels">Ощущается как {convertToCelsius(main.feelsLike)}</span>
      <span className="big-card__full-pressure">Давление {main.pressure} мм рт.ст</span>
      <span className="big-card__full-humidity">Влажность {main.humidity}%</span>
      <span className="big-card__full-wind">Ветер {getWindDirection(wind.deg)}, {wind.speed} м/с</span>
      <span className="big-card__full-visibility">Видимость {visibility}м</span>
    </div>
  );
}
