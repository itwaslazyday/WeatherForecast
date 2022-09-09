import Card from 'components/card/card';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import {updateWeatherCards} from 'store/data-process/data-process';
import { getCityRepeatId } from 'store/data-process/selector';
import { WeatherCard } from 'types/card';


type CardListProps = {
  weatherCards: WeatherCard[];
  activeCard: number | null
  fullCard: number | null
  scrollCard: number | null
  setActiveCard: (id: number | null) => void
  setFullCard: (id: number | null) => void
};

export default function CardList ({weatherCards, activeCard, fullCard, scrollCard, setActiveCard, setFullCard}: CardListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const existingCardId = useAppSelector(getCityRepeatId);

  const [cardList, setCardList] = useState<WeatherCard[]>([]);

  useEffect(() => {
    setCardList(weatherCards.map((item) => (item)));
  }, [weatherCards]);

  console.log('cardList1', cardList);

  const sortCards = (a: WeatherCard, b: WeatherCard) => (a.order - b.order);

  const handleCardMove = (dragIndex: number, hoverIndex: number) => {
    console.log('cardList2', cardList);
    console.log('dragIndex', dragIndex);
    console.log('hoverIndex', hoverIndex);
    const a = JSON.parse(JSON.stringify(cardList));
    console.log('a', a);
    console.log(a.map((item: any) => {
      if (item.order === hoverIndex) {
        // eslint-disable-next-line no-alert
        alert('1');
        return ({...item, order: dragIndex});
      }
      if (item.order === dragIndex) {
        // eslint-disable-next-line no-alert
        alert('2');
        return ({...item, order: hoverIndex});
      }
      // eslint-disable-next-line no-alert
      alert('3');
      return item;
    }));
    // dispatch(updateWeatherCards(cardList.map((item) => {
    //   if (item.order === hoverIndex) {
    //     return ({...item, order: dragIndex});
    //   }
    //   if (item.order === dragIndex) {
    //     return ({...item, order: hoverIndex});
    //   }
    //   return item;
    // })));
  };

  return (
    <div className="weather-content__big-cards">
      {
        weatherCards.length !== 0 ?
          weatherCards.slice().sort(sortCards).map((card) => (
            <Card
              key={card.city.id}
              weatherCard={card}
              existingCardId={existingCardId}
              index={card.order}
              activeCard={activeCard}
              fullCard={fullCard}
              scrollCard={scrollCard}
              setActiveCard={setActiveCard}
              setFullCard={setFullCard}
              handleCardMove={handleCardMove}
            />)) :
          <div className="weather-content__help">
            Карточки с погодой можно менять местами, а также удалять, перетягивая на область карты.
          </div>
      }
    </div>
  );
}

