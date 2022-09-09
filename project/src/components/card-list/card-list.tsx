import Card from 'components/card/card';
import { useAppDispatch } from 'hooks';
import { format } from 'path';
import { useEffect, useState } from 'react';
import { updateWeatherCards } from 'store/data-process/data-process';
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

  const [cardList, setCardList] = useState<WeatherCard[]>([]);

  useEffect(() => {
    setCardList(weatherCards.map((item) => (item)));
  }, [weatherCards]);

  console.log('cardList', cardList);

  const sortCards = (a: WeatherCard, b: WeatherCard) => (a.order - b.order);

  const handleCardMove = (dragIndex: number, hoverIndex: number) => {
    console.log('dragIndex', dragIndex);
    console.log('hoverIndex', hoverIndex);
    console.log(cardList.map((item) => {
      if (item.order === hoverIndex) {
        return ({...item, order: dragIndex});
      }
      if (item.order === dragIndex) {
        return ({...item, order: hoverIndex});
      }
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

