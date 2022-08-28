import BigCardFull from 'components/big-card-full/big-card-full';
import BigCardIcon from 'components/big-card-icon/big-card-icon';
import { useState } from 'react';
import { Card } from 'types/card';
import { convertToCelsius, getWindDirection } from '../../utils/big-card';

type BigCardProps = {
  weatherCard: Card
}

export default function BigCard({ weatherCard }: BigCardProps): JSX.Element {
  const [isFull, setFull] = useState<boolean>(false);
  const { name, main, weather, wind } = weatherCard;

  return (
    <div
      className={`big-card ${isFull && 'big-card--full'}`}
      onClick={() => setFull((prev) => !prev)}
    >
      <div className="big-card__header">
        <span className="icon icon--strips-big"></span>
        <span className="big-card__city">{name}</span>
        <span className="big-card__time">22:40</span>
      </div>
      <div className="big-card__content">
        <div className="big-card__content-wrapper">
          <div className="big-card__weather-conditions">
            {
              isFull ?
                <BigCardFull weatherCard={weatherCard} /> :
                weather.map((condition) => <BigCardIcon key={condition.id} iconName={condition.icon} />)
            }
          </div>
          {
            !isFull &&
            <div className="big-card__wind">
              <span className="icon icon--wind"></span>
              <span className="big-card__wind-info">Ветер {getWindDirection(wind.deg)}, {wind.speed} м/с</span>
            </div>
          }

        </div>
        {
          !isFull && <span className="big-card__temperature">{convertToCelsius(main.temp)}</span>
        }
      </div>
    </div>
  );
}
