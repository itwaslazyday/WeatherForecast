import BigCardFull from 'components/big-card-full/big-card-full';
import ConditionIcon from 'components/condition-icon/condition-icon';
import { useMemo, useState } from 'react';
import { WeatherCard } from 'types/card';
import { convertToCelsius, getWindDirection } from '../../utils/big-card';
import dayjs from 'dayjs';
import { adaptConditionToClient } from 'utils/api';
import { getFutureDaysTemps } from 'utils/mocks';

import UTC from 'dayjs/plugin/utc';
dayjs.extend(UTC);

type BigCardProps = {
  weatherCard: WeatherCard;
  isActive: number | null
  isFull: number | null
  setActive: (id: number | null) => void
  setFull: (id: number | null) => void
}

export default function BigCard({ weatherCard, isActive, isFull, setActive, setFull }: BigCardProps): JSX.Element {
  const { city, list } = weatherCard;
  const { timezone } = city;
  const { wind, main, weather } = adaptConditionToClient(list[1]);
  const futureDaysTemps = useMemo(() => getFutureDaysTemps(weatherCard), [weatherCard]);
  const cardLocalTime = dayjs().utc().utcOffset(timezone / 60);
  const cardLocalTimeHours = Number(cardLocalTime.format('HH'));
  const cardsBackgroundPrefix = cardLocalTimeHours >= 20 || cardLocalTimeHours < 6 ? 'n' : 'd';

  return (
    <div
<<<<<<< HEAD
      className={`big-card ${isFull && 'big-card--full'}`}
      style={{background: `url(/img/${weather[0].main}-${cardsBackgroundPrefix}.jpeg) center no-repeat`, backgroundSize: 'cover'}}
      onClick={() => setFull((prev) => !prev)}
=======
      className={`big-card ${isFull === city.id ? 'big-card--full' : ''} ${isActive === city.id ? 'big-card--active' : ''}`}
      onClick={() => isFull === city.id ? setFull(null) : setFull(city.id)}
      onMouseOver={() => setActive(city.id)}
      onMouseLeave={() => setActive(null)}
>>>>>>> 13d3c9c (Настроит двухстороннюю связь между картой и карточками/1)
    >
      <div className="big-card__header">
        <span className="icon icon--strips-big"></span>
        <span className="big-card__city">{city.name}</span>
        <span className="big-card__time">{`${cardLocalTime.format('HH[:]mm')}`}</span>
      </div>
      <div className="big-card__content">
        <div className="big-card__content-wrapper">
          <div className="big-card__weather-conditions">
            {
              isFull === city.id ?
                <BigCardFull weatherCard={weatherCard} futureDaysTemps={futureDaysTemps} /> :
                weather.map((condition) => <ConditionIcon key={condition.id} iconName={condition.icon} />)
            }
          </div>
          {
            isFull === null &&
            <div className="big-card__wind">
              <span className="icon icon--wind"></span>
              <span className="big-card__wind-info">Ветер {getWindDirection(wind.deg)}, {wind.speed} м/с</span>
            </div>
          }

        </div>
        {
          isFull === null && <span className="big-card__temperature">{convertToCelsius(main.temp)}</span>
        }
      </div>
    </div>
  );
}

