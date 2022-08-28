import BigCardIcon from 'components/big-card-icon/big-card-icon';
import { Card, Weather } from 'types/card';
import { convertToCelsius } from 'utils/big-card';

type BigCardFullProps = {
  weatherCard: Card
}

export default function BigCardFull({ weatherCard }: BigCardFullProps): JSX.Element {
  const { main, weather } = weatherCard;

  const makeFullCondition = (condition: Weather) => (
    <div className="big-card__full-item">
      <BigCardIcon key={condition.id} iconName={condition.icon} />
      <span>{condition.description}</span>
    </div>
  );

  return (
    <div className="big-card__full">
      <span className="big-card__temperature">
        {`${convertToCelsius(main.tempMin)}...${convertToCelsius(main.tempMax)}`}
      </span>
      <span className='big-card__feels'>Ощущается как {convertToCelsius(main.feelsLike)}</span>
      {weather.map((condition) => makeFullCondition(condition))}
    </div>
  );
}
