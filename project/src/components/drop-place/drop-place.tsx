import './drop-place.css';
import {useDrop} from 'react-dnd';
import { WeatherCard } from 'types/card';
import {useAppDispatch} from 'hooks';
import { removeWeatherCard} from 'store/data-process/data-process';

export default function DropPlace(): JSX.Element {
  const dispatch = useAppDispatch();

  const extractDroppedCard = (order: number) => {
    dispatch(removeWeatherCard(order));
  };


  const [{isOver}, dropRef] = useDrop(() =>({
    accept: 'weatherCard',
    drop: (item: WeatherCard) => extractDroppedCard(item.order),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const opacity = isOver ? 1 : 0;

  return (
    <div className='drop-place' ref={dropRef} style={{opacity}}></div>
  );
}
