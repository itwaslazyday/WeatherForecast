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
}

export default function BigCard({weatherCard}: BigCardProps): JSX.Element {
  const [isFull, setFull] = useState<boolean>(false);
  const { city, list } = weatherCard;
  const { country, timezone } = city;
  const { wind, main, weather } = adaptConditionToClient(list[1]);
  const futureDaysTemps = useMemo(() => getFutureDaysTemps(weatherCard), [weatherCard]);

  return (
    <div
      className={`big-card ${isFull && 'big-card--full'}`}
      onClick={() => setFull((prev) => !prev)}
    >
      <div className="big-card__header">
        <span className="icon icon--strips-big"></span>
        <span className="big-card__city">{city.name}</span>
        <span className="big-card__time">{`${dayjs().utc().utcOffset(timezone / 60).format('HH[:]mm')}`}</span>
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

