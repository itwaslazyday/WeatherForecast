import BigCardFull from 'components/big-card-full/big-card-full';
import ConditionIcon from 'components/condition-icon/condition-icon';
import { DragEventHandler, useMemo, useState } from 'react';
import { WeatherCard } from 'types/card';
import { convertToCelsius, getWindDirection } from '../../utils/big-card';
import dayjs from 'dayjs';
import { adaptConditionToClient } from 'utils/api';
import { getFutureDaysTemps } from 'utils/mocks';

import UTC from 'dayjs/plugin/utc';
dayjs.extend(UTC);

type BigCardProps = {
  weatherCard: WeatherCard;
  onDragStart: (card: WeatherCard) => void;
  onDragEnd: (evt: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (evt: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (evt: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (evt: React.DragEvent<HTMLDivElement>, card: WeatherCard) => void;
}

export default function BigCard({weatherCard, onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop}: BigCardProps): JSX.Element {
  const [isFull, setFull] = useState<boolean>(false);
  const { city, list } = weatherCard;
  const {timezone} = city;
  const { wind, main, weather } = adaptConditionToClient(list[1]);
  const futureDaysTemps = useMemo(() => getFutureDaysTemps(weatherCard), [weatherCard]);
  const cardLocalTime = dayjs().utc().utcOffset(timezone / 60);
  const cardLocalTimeHours = Number(cardLocalTime.format('HH'));
  const cardsBackgroundPrefix = cardLocalTimeHours >= 20 || cardLocalTimeHours < 6 ? 'n' : 'd';

  return (
    <div
      className={`big-card ${isFull && 'big-card--full'}`}
      style={{background: `url(/img/${weather[0].main}-${cardsBackgroundPrefix}.jpeg) center no-repeat`, backgroundSize: 'cover'}}
      onClick={() => setFull((prev) => !prev)}
      draggable
      onDragStart={() => onDragStart(weatherCard)}
      onDragOver={(evt) => onDragOver(evt)}
      onDrop={(evt) => onDrop(evt, weatherCard)}
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
              isFull ?
                <BigCardFull weatherCard={weatherCard} futureDaysTemps={futureDaysTemps} /> :
                weather.map((condition) => <ConditionIcon key={condition.id} iconName={condition.icon} />)
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

