import ConditionFullIcon from 'components/condition-full-icon/condition-full-icon';
import { WeatherCard } from 'types/card';
import { adaptConditionToClient } from 'utils/api';
import { convertToCelsius } from 'utils/card';
import { humanizeTime } from 'utils/common';

type FullCardProps = {
  weatherCard: WeatherCard;
  futureDaysTemps: { [key: string]: { temps: { tempMin: number, tempMax: number }, icon: string } };
}

export default function FullCard({ weatherCard, futureDaysTemps }: FullCardProps): JSX.Element {
  const { list } = weatherCard;
  const currentDay = adaptConditionToClient(list[1]);
  const { main, wind, visibility, clouds, dt, weather } = currentDay;
  const { feelsLike, pressure, humidity } = main;

  const weatherProperties = {
    'Ощущается как': { id: 0, value: convertToCelsius(feelsLike as number), unit: '' },
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
        <div className="card__property-wrapper" key={id}>
          <span className="card__property-header">{property[0]}</span>
          <span className="card__property">{value} <small>{unit}</small></span>
        </div>);
    })
  );

  const makeFutureForecast = () => (
    Object.entries(futureDaysTemps).map((day, idx) => {
      const { tempMin, tempMax } = day[1].temps;
      const icon = day[1].icon;
      return (
        <div className="card__future-wrapper" key={day[0]}>
          <span className="card__future-day card__future-property">{day[0]}</span>
          <span className="card__future-icon card__future-property">
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} width='50' height='50' alt="" />
          </span>
          <span className="card__future-temp card__future-property">{convertToCelsius(tempMin)} ... {convertToCelsius(tempMax)}</span>
        </div>);
    })
  );

  return (
    <div className="card__full">
      <div className="card__full-item">
        <span className="card__full-date">{humanizeTime(dt)}</span>
        <span className="card__temperature card__temperature--font">
          {`${convertToCelsius(main.tempMin as number)}... ${convertToCelsius(main.tempMax as number)}`}
        </span>
        {weather.map((condition) => <ConditionFullIcon key={condition.id} weatherCondition={condition} />)}
        <div className="card__future">
          <span className="card__future-header">Прогноз на три дня</span>
          {makeFutureForecast()}
        </div>
        <div className="card__properties">
          {makeCardProperties()}
        </div>
      </div>
    </div>
  );
}
