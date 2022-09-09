import FullCard from 'components/card-full/full-card';
import ConditionIcon from 'components/condition-icon/condition-icon';
import {useEffect, useMemo, useRef} from 'react';
import {WeatherCard} from 'types/card';
import {convertToCelsius, getWindDirection} from '../../utils/card';
import dayjs from 'dayjs';
import {adaptConditionToClient} from 'utils/api';
import {getFutureDaysTemps} from 'utils/mocks';
import {useDrag, useDrop} from 'react-dnd';

import UTC from 'dayjs/plugin/utc';
dayjs.extend(UTC);

type CardProps = {
  weatherCard: WeatherCard;
  index: number;
  activeCard: number | null;
  fullCard: number | null;
  scrollCard: number | null;
  setActiveCard: (id: number | null) => void;
  setFullCard: (id: number | null) => void;
  handleCardMove: (dragIndex: number, hoverIndex: number) => void;
}

export default function Card ({weatherCard, activeCard, fullCard, scrollCard, setActiveCard, setFullCard, handleCardMove, index}: CardProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const {city, list} = weatherCard;
  const {timezone} = city;
  const {wind, main, weather} = adaptConditionToClient(list[1]);
  const futureDaysTemps = useMemo(() => getFutureDaysTemps(weatherCard), [weatherCard]);
  const cardLocalTime = dayjs().utc().utcOffset(timezone / 60);
  const cardLocalTimeHours = Number(cardLocalTime.format('HH'));
  const cardsBackgroundPrefix = cardLocalTimeHours >= 20 || cardLocalTimeHours < 6 ? 'n' : 'd';

  const [, drag] = useDrag(() =>({
    type: 'weatherCard',
    item: weatherCard,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const [, drop] = useDrop(() =>({
    accept: 'weatherCard',
    hover(item: WeatherCard, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.order;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      // const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // const clientOffset = monitor.getClientOffset() as any;
      // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }

      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return;
      // }

      handleCardMove(dragIndex, hoverIndex);
      // item.order = hoverIndex;
    },
  }));

  useEffect(() => {
    if (scrollCard === city.id) {
      ref.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [city.id, scrollCard]);

  // const refHanlder = (el: HTMLDivElement | null) => {
  //   cardContainer.current = el;
  //   dragRef = el;
  // };

  drag(drop(ref));

  return (
    <div
      className={`card ${fullCard === city.id ? 'card--full' : ''} ${activeCard === city.id ? 'card--active' : `card--${(weather[0].main).toLowerCase()}-${cardsBackgroundPrefix}`}`}
      // ref={cardContainer}
      // ref={(el) => refHanlder(el)}
      ref={ref}
      onClick={() => fullCard === city.id ? setFullCard(null) : setFullCard(city.id)}
      onMouseOver={() => setActiveCard(city.id)}
      onMouseLeave={() => setActiveCard(null)}
      draggable
    >
      <div className="card__header">
        <span className="icon icon--strips-big"></span>
        <span className="card__city">{city.name}</span>
        <span className="card__time">{`${cardLocalTime.format('HH[:]mm')}`}</span>
      </div>
      <div className="card__content">
        <div className="card__content-wrapper">
          <div className="card__weather-conditions">
            {
              fullCard === city.id ?
                <FullCard weatherCard={weatherCard} futureDaysTemps={futureDaysTemps} /> :
                weather.map((condition) => <ConditionIcon key={condition.id} iconName={condition.icon} />)
            }
          </div>
          {
            fullCard === null &&
            <div className="card__wind">
              <span className="icon icon--wind"></span>
              <span className="card__wind-info">Ветер {getWindDirection(wind.deg)}, {wind.speed} м/с</span>
            </div>
          }

        </div>
        {
          fullCard === null && <span className="card__temperature">{convertToCelsius(main.temp)}</span>
        }
      </div>
    </div>
  );
}

